import axios from "axios";

export const fetchMoreData = async (nextUrl, setPlankData) => {
  console.log("Hitting fetchMoreData:");
  try {
    const { data } = await axios.get(nextUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });

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
