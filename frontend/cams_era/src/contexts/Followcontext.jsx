import React, { createContext, useContext, useState, useEffect } from 'react';
import { getFollowers, getFollowing } from '../services/photographerApi';

const FollowContext = createContext();

export const useFollowContext = () => useContext(FollowContext);

export const FollowProvider = ({ children }) => {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFollowers = async (userId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getFollowers(userId);
      setFollowers(data);
    } catch (err) {
      setError('Failed to fetch followers.');
    } finally {
      setLoading(false);
    }
  };

  const fetchFollowing = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getFollowing();
      setFollowing(data);
    } catch (err) {
      setError('Failed to fetch following list.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FollowContext.Provider
      value={{
        followers,
        following,
        loading,
        error,
        fetchFollowers,
        fetchFollowing,
      }}
    >
      {children}
    </FollowContext.Provider>
  );
};
