import React from 'react';

const UsersOnline: React.FC = () => {
  const users = [
    "Admin",
    "Shreyash",
    "Vilas Birardar"
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4 text-[color:var(--mainTitleLightColor)]">Users Online</h2>
      <ul className="list-disc list-inside">
        {users.map((user, index) => (
          <li key={index} className="mb-2 text-[color:var(--primaryColor)]">{user}</li>
        ))}
      </ul>
    </div>
  );
};

export default UsersOnline;
