import React from 'react';

interface propTypes{
    children:React.ReactNode
}
export default function DialogWrapper({ children }:propTypes) {
    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-25"></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom  overflow-hidden transform transition-all  sm:align-middle ">
                    {children}
                </div>
            </div>
        </div>
    );
}