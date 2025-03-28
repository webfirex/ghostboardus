export const fetchCalendar = async () => {
    try {
      const response = await fetch(`/api/calendar`, {method: 'POST'});
  
      if (!response.ok) {
        throw new Error('Failed to fetch flow data');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error fetching flow data:', error);
      throw error;
    }
};