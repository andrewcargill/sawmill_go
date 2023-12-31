import axios from "axios";

export const fetchMoreData = async (nextUrl, setPlankData) => {
  console.log("Hitting fetchMoreData:");
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    // Check if the access_token exists in localStorage before adding it to headers
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      headers.Authorization = `Bearer ${access_token}`;
    }

    const { data } = await axios.get(nextUrl, { headers });

    console.log("API Response:", data);

    setPlankData((prevData) => ({
      results: [...prevData.results, ...data.results],
      count: data.count,
      next: data.next,
    }));
  } catch (error) {
    console.error("Error fetching more data:", error);
  }
};
