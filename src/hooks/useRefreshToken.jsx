import axios from "@/apis/axios";

const useRefreshToken = () => {
  const refresh = async () => {
    const response = await axios.get("/refresh_token", {
      withCredentials: true,
    });
    console.log(response.data);
  };

  return refresh;
};

export default useRefreshToken;
