import axios from "axios";

const accessToken = localStorage.getItem("accessToken");

interface ApiResponse {
  status: string;
  message: string;
}

export const deleteInterestedStock = (sector: string, stockCode: string) => {
  return axios.delete(`${process.env.REACT_APP_BASE_URL}/fastapi/sic/${sector}/${stockCode}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const addInterestedStock = async (sector: string, stockCode: string): Promise<ApiResponse> => {
  const accessToken = localStorage.getItem("accessToken");
  try {
    const response = await axios.request<ApiResponse>({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/fastapi/sic/${sector}/${stockCode}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
