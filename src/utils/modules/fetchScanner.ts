export const fetchScanner = async (params: Record<string, any>) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      const response = await fetch(`/api/scanner?${queryString}`);
  
      if (!response.ok) {
        throw new Error('Failed to fetch flow data');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error fetching flow data:', error);
      throw error;
    }
};

export const fetchMagScanner = async () => {
  try {
    const response = await fetch(`/api/fetchMag`);

    if (!response.ok) {
      throw new Error('Failed to fetch flow data');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching flow data:', error);
    throw error;
  }
};