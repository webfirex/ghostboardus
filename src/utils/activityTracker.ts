// utils/activityTracker.ts
import { useEffect, useState } from 'react';

export function useActivityTracker(onActive: () => void, onInactive: () => void, inactiveTimeout = 30000) {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const resetTimeout = () => {
      clearTimeout(timeoutId);
      if (!isActive) {
        setIsActive(true);
        onActive();
      }
      timeoutId = setTimeout(() => {
        setIsActive(false);
        onInactive();
      }, inactiveTimeout);
    };

    const handleActivity = () => resetTimeout();

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('scroll', handleActivity);

    resetTimeout();

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      clearTimeout(timeoutId);
    };
  }, [isActive, onActive, onInactive, inactiveTimeout]);

  return isActive;
}