import { db } from "@/server/db";
import axios from "axios";
import { Octokit } from "octokit";
import { aiSummariseCommit } from "./gemini";

const octokit = new Octokit({
    auth: process.env.GITHUB_ACCESS_TOKEN
});

type response = {
    commitHash: string;
    commitMessage: string;
    commitAuthorName: string;
    commitAuthorAvatar: string;
    commitDate: string;
};

export const getCommitHashes = async (
    githubUrl: string,
): Promise<response[]> => {
    const [owner, repo] = githubUrl.split("/").slice(3, 5);
    if (!owner || !repo) {
        throw new Error("Invalid github url")
    }
    const { data } = await octokit.rest.repos.listCommits({
        owner,
        repo,
    })
    //   need commit author, commit message, commit hash and commit time
    const sortedCommits = data.sort(
        (a: any, b: any) =>
            new Date(b.commit.author.date).getTime() -
            new Date(a.commit.author.date).getTime(),
    ) as any[];

    return sortedCommits.slice(0, 15).map((commit: any) => ({
        commitHash: commit.sha as string,
        commitMessage: commit.commit.message ?? "",
        commitAuthorName: commit.commit?.author?.name ?? "",
        commitAuthorAvatar: commit.author?.avatar_url ?? "",
        commitDate: commit.commit?.author?.date ?? "",
    }));
};

export const pollRepo = async (projectId: string) => {
    const { project, githubUrl } = await fetchProjectGitHubUrl(projectId);
    const commitHases = await getCommitHashes(project?.githubUrl ?? "");
    const unprocessedCommits = await filterUnprocessedCommits(projectId, commitHases);
    
    // Process commits sequentially to avoid rate limits
    const commits = [];
    for (const commit of unprocessedCommits) {
        try {
            const summary = await summariseCommit(githubUrl, commit.commitHash);
            if (summary) {
                commits.push({
                    projectId: projectId,
                    commitHash: commit.commitHash,
                    summary: summary,
                    commitAuthorName: commit.commitAuthorName,
                    commitDate: new Date(commit.commitDate),
                    commitMessage: commit.commitMessage,
                    commitAuthorAvatar: commit.commitAuthorAvatar,
                });
            }
        } catch (error) {
            console.error(`Failed to process commit ${commit.commitHash}:`, error);
            // Continue with other commits even if one fails
            continue;
        }
    }

    if (commits.length > 0) {
        await db.commit.createMany({
            data: commits,
        });
    }
    
    return { processed: commits.length, total: unprocessedCommits.length };
};

async function fetchProjectGitHubUrl(projectId: string) {
    const project = await db.project.findUnique({
        where: {
            id: projectId
        }, select: {
            githubUrl: true
        }
    });
    const githubUrl = project?.githubUrl ?? "";
    return { project, githubUrl };
}

async function summariseCommit(githubUrl: string, commitHash: string) {
    try {
        const { data } = await axios.get(
            `${githubUrl}/commit/${commitHash}.diff`,
            {
                headers: {
                    Accept: "application/vnd.github.v3.diff",
                },
            }
        );
        return await aiSummariseCommit(data) || "";
    } catch (error) {
        console.error(`Failed to get diff for commit ${commitHash}:`, error);
        return "";
    }
}

async function filterUnprocessedCommits(projectId: string, commitHases: response[]) {
    const existingCommits = await db.commit.findMany({
        where: {
            projectId: projectId,
        },
        select: {
            commitHash: true,
        },
    });
    const existingHashes = new Set(existingCommits.map((c) => c.commitHash));
    return commitHases.filter((c) => !existingHashes.has(c.commitHash));
}