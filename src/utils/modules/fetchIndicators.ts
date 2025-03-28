export const fetchIndicators = async () => {
    try {
      const response = await fetch('/api/indicators');

      if (!response.ok) {
        throw new Error('Failed to fetch indicators');
      }

      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
};