//Client-side modal

'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
 

export function Modal() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  return (
    <div className="z-max fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50 w-full h-full overflow-y-auto">
      <div className="bg-white shadow-lg p-8 border rounded-md w-96">
        <div className="text-center">
          <h3 className="font-bold text-2xl text-gray-900">Modal Title</h3>
          <div className="mt-2 px-7 py-3">
            <p className="text-gray-500 text-lg">Modal Body</p>
          </div>
          <div className="flex justify-center mt-4">

            {/* Using useRouter to dismiss modal*/}
            <button
              onClick={router.back}
              className="bg-blue-500 hover:bg-gray-400 shadow-sm px-4 py-2 rounded-md focus:ring-2 focus:ring-gray-300 font-medium text-base text-white focus:outline-none"
            >
              Close
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}