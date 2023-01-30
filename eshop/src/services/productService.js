import { axiosInstance } from './api';

export const addNewProduct = (data) => {
      return axiosInstance.post(`/admin/product`, data)
}

export const getProduct = (id) => {
      return axiosInstance.get(`/admin/products/${id}`);
}

export const putProduct = (id, data) => {
      return axiosInstance.put(`/admin/product/${id}`, data);
}

export const addNewSizeSystem = (data) => {
      return axiosInstance.post(`/admin/sizesystem`, data);
}

export const getSizeSystem = (id) => {
      return axiosInstance.get(`/admin/sizesystems/${id}`);
}

export const putSizeSystem = (id, data) => {
      return axiosInstance.put(`/admin/sizesystem/${id}`, data);
}

export const postNewBrand = (data) => {
      return axiosInstance.post(`/admin/brand`, data);
}

export const getBrand = (id) => {
      return axiosInstance.get(`/admin/brands/${id}`);
}

export const putBrand = (id, data) => {
      return axiosInstance.put(`/admin/brand/${id}`, data);
}

