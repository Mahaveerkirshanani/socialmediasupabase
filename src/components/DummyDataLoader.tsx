import React from 'react'

const DummyDataLoader = () => {
  return (
    <div className="space-y-4 p-4">
      {/* Placeholder for multiple posts */}
      {[...Array(5)].map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-6 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>
  );
}

export default DummyDataLoader