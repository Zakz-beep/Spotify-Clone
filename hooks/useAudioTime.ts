import { useEffect, useState } from 'react';
import useSound from 'use-sound';

const useAudioTime = (songUrl: string) => {
  const [duration, setDuration] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [, { sound }] = useSound(songUrl, {
    preload: true,
    onload: () => {
      if (sound) {
        const soundDuration = sound.duration() || 0;
        setDuration(soundDuration);
        setIsLoading(false);
      }
    },
    onloaderror: () => {
      setIsLoading(false);
    }
  });

  useEffect(() => {
    // Reset when URL changes
    setIsLoading(true);
    setDuration(0);
  }, [songUrl]);

  return {
    duration,
    isLoading
  };
};

export default useAudioTime;