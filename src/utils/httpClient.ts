import axios from 'axios';
import {API_HOST} from '../configs/constants';

export const HttpClient = axios.create({
  timeout: 90000,
  headers: {
    'Cache-Control': 'no-store',
    responseType: 'application/json',
  },
  baseURL: API_HOST,
});

export interface IAPIResponse<T = any> {
  data: T;
  message: string;
  status: 200 | 400 | 300 | 500;
}

export const getData = async <T = any>(url: string, config = {}) => {
  return await HttpClient.get<T>(url, {...config}).then(response => response);
};

export const postData = async <T = any>(url: string, data = {}) => {
  return await HttpClient.post<T>(url, {...data}).then(response => response);
};

export const patchData = async (url: string, data = {}) => {
  return await HttpClient.patch<IAPIResponse>(url, {...data}).then(
    response => response,
  );
};

export const deleteData = async (url: string, data = {}) => {
  return await HttpClient.delete<IAPIResponse>(url, {...data}).then(
    response => response,
  );
};

export const putData = async <T = any>(url: string, data = {}) => {
  return await HttpClient.put<T>(url, {...data}).then(response => response);
};
