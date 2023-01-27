import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const addNewProduct = (data) => {
      return axios.post(`${API_URL}/admin/product`, data)
}

export const getProduct = (id) => {
      return axios.get(`${API_URL}/admin/products/${id}`);
}

export const putProduct = (id, data) => {
      return axios.put(`${API_URL}/admin/product/${id}`, data);
}

export const addNewSizeSystem = (data) => {
      return axios.post(`${API_URL}/admin/sizesystem`, data);
}

export const getSizeSystem = (id) => {
      return axios.get(`${API_URL}/admin/sizesystems/${id}`);
}

export const putSizeSystem = (id, data) => {
      return axios.put(`${API_URL}/admin/sizesystem/${id}`, data);
}

export const postNewBrand = (data) => {
      return axios.post(`${API_URL}/admin/brand`, data);
}

export const getBrand = (id) => {
      return axios.get(`${API_URL}/admin/brands/${id}`);
}

export const putBrand = (id, data) => {
      return axios.put(`${API_URL}/admin/brand/${id}`, data);
}

