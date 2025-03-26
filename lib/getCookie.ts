export const fetchCookie = async <T = string>(cookieName: string): Promise<T | null> => {
    try {
      const res = await fetch(`/api/get-cookie?name=${cookieName}`);
      if (!res.ok) throw new Error('Failed to fetch cookie');
      
      const data = await res.json();
      return data[cookieName] ?? null;
    } catch (error) {
      console.error('Error fetching cookie:', error);
      return null;
    }
  };