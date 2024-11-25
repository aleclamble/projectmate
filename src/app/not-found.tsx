import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-gray-600 mb-4">Could not find the requested page</p>
      <Link 
        href="/dashboard" 
        className="text-blue-500 hover:text-blue-700 underline"
      >
        Return to Dashboard
      </Link>
    </div>
  )
}
