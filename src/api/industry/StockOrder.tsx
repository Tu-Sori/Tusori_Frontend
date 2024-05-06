import axios, { AxiosResponse } from "axios";

export interface StockOrderSuccessResponse {
  status: string;
  message: string;
  data: {
    available_assets: number;
    average_purchase: number;
    reserves: number;
  };
}

export const sendStockOrderRequest = async (code: string, price: number, amount: number): Promise<StockOrderSuccessResponse | null> => {
  const requestData = {
    price: price,
    amount: amount,
  };
  const token = localStorage.getItem("accessToken");

  try {
    const response: AxiosResponse<StockOrderSuccessResponse> = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/springboot/sic/buy?code=${code}`,
      requestData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error("Error occurred in sendStockOrderRequest:", error);
    return null;
  }
};
