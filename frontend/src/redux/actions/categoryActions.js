import axios from "axios";

export const getCategories = async () => {
  return await axios.get("http://localhost:4000/api/categories");
};

export const getCategory = async (slug) => {
  return await axios.get(`http://localhost:4000/api/category/${slug}`);
};

export const updateCategory = async (slug, category) => {
  return await axios.put(
    `http://localhost:4000/api/category/${slug}`,
    category
  );
};

export const removeCategory = async (slug) => {
  // pasarle token de admin cuando este por parametro ademas de slug
  return await axios.delete(
    `http://localhost:4000/api/category/${slug}` // aca falta el headers del token
  );
};

export const createCategory = async (category) => {
  return await axios.post(`http://localhost:4000/api/category`, category);
};

export const getShoez = async () => {
  return await axios.get(`http://localhost:4000/api/shoes`, {});
};

export const getShoesCount = async () => {
  return await axios.get(`http://localhost:4000/api/shoes/total`);
};
