import axiosInstance from "@/config/axios";



export const getReviews = async () => {
  try {
    const response = await axiosInstance.get("ReviewTech/GetAllReviewTechs");
    return response.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};
