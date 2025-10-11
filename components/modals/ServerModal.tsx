// Server-side Modal

import Link from "next/link";

export function ServerModal() {

    return (
      <div className="fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50 w-full h-full overflow-y-auto">
        <div className="bg-white shadow-lg p-8 border rounded-md w-96">
          <div className="text-center">
            <h3 className="font-bold text-2xl text-gray-900">Modal Title</h3>
            <div className="mt-2 px-7 py-3">
              <p className="text-gray-500 text-lg">Modal Body</p>
            </div>
            <div className="flex justify-center mt-4">
  
              {/* Navigates back to the base URL - closing the modal */}
              <Link
                href="/"
                className="bg-blue-500 hover:bg-gray-400 shadow-sm px-4 py-2 rounded-md focus:ring-2 focus:ring-gray-300 font-medium text-base text-white focus:outline-none"
              >
                Close
              </Link>
  
            </div>
          </div>
        </div>
      </div>
    );
  }