import axios from "axios";

export const fetchMoreData = async (nextUrl, setPlankData, requiresAuth = false) => {
  console.log("Hitting fetchMoreData:");
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    // Only add the Authorization header if authentication is required and the access_token exists
    if (requiresAuth) {
      const access_token = localStorage.getItem("access_token");
      if (access_token) {
        headers.Authorization = `Bearer ${access_token}`;
      }
    }

    const response = await axios.get(nextUrl, { headers });
    const { data } = response;

    console.log("API Response:", data);

    // Update the state with the new data
    setPlankData((prevData) => ({
      results: [...prevData.results, ...data.results],
      count: data.count,
      next: data.next,
    }));
  } catch (error) {
    console.error("Error fetching more data:", error);
    // Consider how to handle errors, such as showing a message to the user
  }
};
