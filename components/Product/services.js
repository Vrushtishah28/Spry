export const getProductDetails = async () => {
  try {
    const data = await fetch("https://dummyjson.com/products");
    return await data.json();
  } catch (e) {
    throw e;
  }
};
