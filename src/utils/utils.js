export const encodePath = (path) => {
    return btoa(path); // Encode string ke Base64
  };
  
  export const decodePath = (encodedPath) => {
    try {
      return atob(encodedPath); // Decode Base64 ke string
    } catch (error) {
      console.error("Invalid encoded path:", encodedPath);
      return null; // Handle jika path tidak valid
    }
  };
  