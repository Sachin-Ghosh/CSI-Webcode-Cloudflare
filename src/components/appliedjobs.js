import React from 'react';

const AppliedJobs = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-xs">
      <div className="flex justify-center">
        <img
          src="/assets/user.png"
          alt="User"
          className="w-24 h-24 rounded-full"
        />
      </div>
      <div className="text-center mt-4">
        <h2 className="text-xl font-bold">Tushar Dubey</h2>
        <p className="text-gray-600">Full Stack Developer</p>
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-700">
          Passionate developer with expertise in building scalable web applications.
          Always eager to learn new technologies and improve skills.
        </p>
      </div>
    </div>
  );
};

export default AppliedJobs;