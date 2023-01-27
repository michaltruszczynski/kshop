import { axiosInstance } from './api';


const getUser = (id) => {
      return axiosInstance.get(`/admin/users/${id}`);
}

const putUser = (id, data) => {
      return axiosInstance.put(`/admin/users/${id}`, data);
}

const getProducts = () => {
      return axiosInstance.get(`/admin/products`);
}

const getProduct = (id) => {
      return axiosInstance.get(`/admin/products/${id}`);
}

const postProduct = (data) => {
      return axiosInstance.post(`/admin/product`, data);
}

const putProduct = (id, data) => {
      return axiosInstance.put(`/admin/product/${id}`, data);
}

const deleteProduct = (id) => {
      return axiosInstance.delete(`/admin/products/${id}`);
}

const removeProduct = (id) => {
      return axiosInstance.get(`/admin/products/remove/${id}`);
}

const getBrand = (id) => {
      return axiosInstance.get(`/admin/brands/${id}`);
}

const postBrand = (data) => {
      return axiosInstance.post(`/admin/brand`, data);
}

const putBrand = (id, data) => {
      return axiosInstance.put(`/admin/brand/${id}`, data);
}

export const adminService = {
      getUser,
      putUser,
      getProduct,
      getProducts,
      postProduct,
      putProduct,
      deleteProduct,
      removeProduct,
      getBrand,
      postBrand,
      putBrand

}
