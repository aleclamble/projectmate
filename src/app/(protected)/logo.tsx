import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar'
import React from 'react'

const Logo = () => {
    const { open } = useSidebar()
    return (
        <div className="flex items-center gap-2">
            {open && (
                <span className="text-xl font-bold">
                    <span className="italic">
                        Project Mate
                    </span>
                </span>
            )}
            {open && (
                <SidebarTrigger className="text-stone-500 hover:text-stone-900 ml-auto" />
            )}
        </div>
    )
}

export default Logo