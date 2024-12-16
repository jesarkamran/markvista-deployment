export const saveToken = (token) => {
  try {
    localStorage.setItem("authToken", token);
  } catch (error) {
    console.error("Failed to save token:", error);
  }
};

export const getToken = () => {
  try {
    const token = localStorage.getItem("authToken");
    return token || null;
  } catch (error) {
    console.error("Failed to get token:", error);
    return null;
  }
};

export const removeToken = () => {
  try {
    localStorage.removeItem("authToken");
  } catch (error) {
    console.error("Failed to remove token:", error);
  }
};
