export const fetchTutorials = async () => {
    try {
      const response = await fetch('/api/tutorials');

      if (!response.ok) {
        throw new Error('Failed to fetch tutorials');
      }

      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
};