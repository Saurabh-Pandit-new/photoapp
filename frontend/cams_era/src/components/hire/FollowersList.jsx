import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFollowContext } from '../../contexts/FollowContext';

const FollowersList = () => {
  const { id } = useParams(); // photographer/user ID from URL
  const { followers, loading, error, fetchFollowers } = useFollowContext();

  useEffect(() => {
    fetchFollowers(id);
  }, [id, fetchFollowers]);

  if (loading) return <p className="text-cyan-500">Loading followers...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!followers.length) return <p>No followers found.</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Followers</h2>
      <ul className="space-y-4">
        {followers.map((follower) => (
          <li key={follower._id} className="flex items-center space-x-4">
            <img
              src={follower.profilePicture || '/default-profile.png'}
              alt={follower.name}
              className="w-12 h-12 rounded-full"
            />
            <span>{follower.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowersList;
