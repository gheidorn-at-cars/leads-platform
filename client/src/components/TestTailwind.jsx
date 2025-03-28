import React from 'react';

const TestTailwind = () => {
  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4 mt-4">
      <div className="shrink-0">
        <div className="h-12 w-12 bg-blue-500 rounded-full"></div>
      </div>
      <div>
        <div className="text-xl font-medium text-black">Tailwind Test</div>
        <p className="text-gray-500">This should have Tailwind styling</p>
      </div>
    </div>
  );
};

export default TestTailwind;