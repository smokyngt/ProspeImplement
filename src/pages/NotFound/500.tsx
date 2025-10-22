import React from "react";


const Error500: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
            <h1 className="text-6xl font-bold text-red-600">500</h1>
            <h2 className="mt-4 text-2xl font-semibold">Internal Server Error</h2>
            <p className="mt-2 text-gray-600">Something went wrong on our end. Please try again later.</p>
        </div>
        </div>
    );
    }
    
    export default Error500;