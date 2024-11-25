import { api } from '@/trpc/react'
import { useLocalStorage } from 'usehooks-ts'
import React from 'react'
import { useRouter, usePathname } from 'next/navigation'

const useProject = () => {
    const { data: projects, isLoading } = api.project.getAll.useQuery()
    const [projectId, setProjectId] = useLocalStorage('d-projectId', '')
    const project = projects?.find(project => project.id === projectId)
    const router = useRouter()
    const pathname = usePathname()

    React.useEffect(() => {
        // Only redirect if we have loaded the projects and still can't find the selected project
        if (isLoading) return
        // Only redirect to create if we're on a page that requires a project and there are no projects
        const requiresProject = ['/dashboard', '/qa', '/meetings'].includes(pathname)
        if (requiresProject && projects && projects.length === 0) {
            router.push(`/create`)
        }
        // If there are projects but none selected, select the first one
        else if (requiresProject && projects && projects.length > 0 && !project) {
            setProjectId(projects[0].id)
        }
    }, [project, projects, isLoading, pathname])

    return {
        projects,
        projectId,
        isLoading,
        setProjectId,
        project,
    }
}

export default useProject