// utils/api.ts
export const fetchSubscriptionDetails = async (email: string) => {
    try {
      const response = await fetch('/api/subcheck', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to fetch subscription details:', error);
      throw error;
    }
  };
  