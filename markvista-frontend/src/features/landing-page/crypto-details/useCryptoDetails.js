import { axiosCrypto } from "../../../utils/api";

// Load configuration from environment variables

export async function getCryptoData(
  currency,
  sortBy,
  perPage,
  page,
  coinSearch,
  setCryptoData,
) {
  try {
    console.log("Getting Data");

    // Make the GET request
    const { data } = await axiosCrypto.get(
      `/${currency}/${sortBy}/${page}/${perPage}?coinSearch=${coinSearch}`,
    );

    // Return the entire data object
    if (data?.data) setCryptoData(data.data);
    return data.data;
  } catch (error) {
    // Handle any errors that occur during the request
    console.error("Failed to get crypto data:", error);
    throw new Error(error.message); // Rethrow the error to allow calling code to handle it
  }
}

export async function getCoinData(id) {
  try {
    console.log("Getting Data");

    // Make the GET request
    const { data } = await axiosCrypto.get(`/details/${id}`);

    // Return the entire data object
    return data.data;
  } catch (error) {
    // Handle any errors that occur during the request
    console.error("Failed to get coin data:", error);
    throw new Error(error.message); // Rethrow the error to allow calling code to handle it
  }
}

export async function getChartData(id, type, days) {
  try {
    console.log("Getting Data");

    // Make the GET request
    const { data } = await axiosCrypto.get(`/chart-data/${id}/${type}/${days}`);

    console.log(data);

    // Return the entire data object
    return data.chartData;
  } catch (error) {
    // Handle any errors that occur during the request
    console.error("Failed to get crypto data:", error);
    throw new Error(error.message); // Rethrow the error to allow calling code to handle it
  }
}
