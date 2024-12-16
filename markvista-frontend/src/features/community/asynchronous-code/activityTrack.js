import { axiosCommunity } from "@src/utils/api";

const communityActivityService = {
  // Generic method to update community activity
  async updateActivity(activityType, additionalDetails) {
    try {
      const { data: response } = await axiosCommunity.post("/activity", {
        activityType,
        description: additionalDetails || {},
      });

      console.log(response);

      return response;
    } catch (error) {
      console.error("Failed to log community activity", error);
      throw error;
    }
  },
};

export const fetchUserCommunityProfile = async (userId) => {
  try {
    const { data } = await axiosCommunity.get(`/profile/${userId}`);
    console.log(data);

    return data.data;
  } catch (error) {
    console.error("Error fetching community profile:", error);
    throw error;
  }
};

export default communityActivityService;
