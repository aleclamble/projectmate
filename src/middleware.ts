import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/api/webhooks/stripe(.*)'])

export default clerkMiddleware(async (auth, request) => {
    // Check if the route exists in your app
    try {
        if (!isPublicRoute(request)) {
            await auth.protect()
        }
    } catch (error: any) {
        if (error?.message === 'NEXT_NOT_FOUND') {
            // Return 404 response for non-existent routes
            return NextResponse.next({
                status: 404,
            })
        }
        throw error
    }
})

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
}