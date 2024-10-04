import { useAsyncStorage } from '@react-native-async-storage/async-storage';

const useStorage = () => {
  const { getItem, setItem } = useAsyncStorage();

  const loadVisitedWaterfalls = async () => {
    try {
      const storedVisitedWaterfalls = await getItem('@visitedWaterfalls');
      return storedVisitedWaterfalls ? JSON.parse(storedVisitedWaterfalls) : [];
    } catch (error) {
      console.error('Error loading visited waterfalls:', error);
      return [];
    }
  };

  const saveVisitedWaterfall = async (visitedWaterfall) => {
    try {
      const visitedWaterfalls = await loadVisitedWaterfalls();
      const updatedVisitedWaterfalls = [...visitedWaterfalls, visitedWaterfall];
      await setItem('@visitedWaterfalls', JSON.stringify(updatedVisitedWaterfalls));
    } catch (error) {
      console.error('Error saving visited waterfall:', error);
    }
  };

  return {
    loadVisitedWaterfalls,
    saveVisitedWaterfall,
  };
};

export default useStorage;
