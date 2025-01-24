import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

export const useAppwrite = <T,>(fn: Function) => {
  const [isLoading, setIsLoading] = useState(true);

  const [data, setData] = useState<T[]>([]);

  const handleFetchData = async () => {
    try {
      const data = await fn();

      setData(data as T[]);
      setIsLoading(false);
    } catch (error: any) {
      Alert.alert('Error', error?.message || 'Something wrong.');
    }
  };

  const refetch = () => handleFetchData();

  useEffect(() => {
    handleFetchData();
  }, []);

  return { data, isLoading, refetch };
};
