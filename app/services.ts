
/* eslint-disable @typescript-eslint/no-explicit-any */

// Helper function to make proxy requests
async function proxyRequest(method: string, url: string, data?: any) {
  // const token = localStorage.getItem("token");

  const response = await fetch("/api/proxy", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      method,
      url,
      data,
      // token, // Pass the token to the proxy
    }),
  });

  return response.json();
}

export const getReviews = async () => {
  try {
    const response = await proxyRequest("GET", "ReviewTech/GetAllReviewTechs");
    return response.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};
