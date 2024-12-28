import React, { useEffect } from 'react';
import { useFollowContext } from '../../contexts/FollowContext';

const FollowingList = () => {
  const { following, loading, error, fetchFollowing } = useFollowContext();

  useEffect(() => {
    fetchFollowing();
  }, [fetchFollowing]);

  if (loading) return <p className="text-cyan-500">Loading following...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!following.length) return <p>You are not following anyone.</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Following</h2>
      <ul className="space-y-4">
        {following.map((person) => (
          <li key={person._id} className="flex items-center space-x-4">
            <img
              src={person.profilePicture || '/default-profile.png'}
              alt={person.name}
              className="w-12 h-12 rounded-full"
            />
            <span>{person.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowingList;
