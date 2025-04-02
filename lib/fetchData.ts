export const fetchData = async <T>(
  url: string,
  token: string | undefined
): Promise<T | null> => {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const data = await response.json();
      if (data?.statusCode === 401) {
        throw new Error("Network response was not ok");
      }
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
