import { axiosInstance } from './api';

export const getShopProduct = (id) => {
      return axiosInstance.get(`/shop/products/${id}`);
}

export const getShopProducts = () => {
      return axiosInstance.get(`/shop/products`);
}