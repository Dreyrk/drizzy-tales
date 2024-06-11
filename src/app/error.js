"use client";

import Link from "next/link";

export default function Page() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-gray-100 px-4 dark:bg-gray-800">
      <div className="max-w-md mx-auto space-y-4 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 text-white bg-red-500 rounded-full">
          <TriangleAlertIcon className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold tracking-tighter text-gray-900 dark:text-gray-50">
          Oops, something went wrong
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          We&apos;re sorry, but there seems to be an issue on our end. Please try again later.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center h-10 px-6 text-sm font-medium transition-colors bg-gray-900 rounded-md shadow text-gray-50 hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300">
          Go back home
        </Link>
      </div>
    </div>
  );
}

function TriangleAlertIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}
