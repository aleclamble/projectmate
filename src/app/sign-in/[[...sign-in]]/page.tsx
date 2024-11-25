import { SignIn } from '@clerk/nextjs'

export default function Page() {
    return (
        <div className="grid h-[100vh] place-items-center">
            <SignIn />
        </div>
    )
}