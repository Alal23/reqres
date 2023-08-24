// /* eslint-disable camelcase */
// /* eslint-disable no-return-await */
// import { API_HOST } from '@configs/constants';
// import axios, {
//   AxiosError,
//   AxiosInstance,
//   AxiosRequestConfig,
//   AxiosResponse,
// } from 'axios';
// import { store } from '@configs/store';
// import { actions as bootActions } from '@bootstrap/store/bootReducer';
// import { actions as AuthActions } from '@modules/auth/stores/index';
// import toLower from 'lodash/toLower';
// import * as NavigationService from 'react-navigation-helpers';
// import { routesEnum } from '@routes/index';

// export const HttpClient = axios.create({
//   timeout: 90000,
//   headers: {
//     'Cache-Control': 'no-store',
//     responseType: 'application/json',
//   },
//   baseURL: API_HOST,
// });

// type IErrorParse = {
//   status: number;
//   message: string;
// };

// let isAlreadyFetchingAccessToken = false;
// let isFetchingRefreshtoken = false;

// let subscribers: any = [];

// const resetTokenAndReattemptRequest = async (
//   error: any,
//   userMobilePhoneNumber: string,
//   refreshToken: string,
//   deviceId: string,
// ) => {
//   try {
//     const { response: errorResponse } = error;

//     const retryOriginalRequest = new Promise((resolve) => {
//       addSubscriber((AccessToken: string) => {
//         errorResponse.config.headers.Authorization = `Bearer ${AccessToken}`;
//         errorResponse.config.headers.KEY = 'RETRY-FROM-REFRESH-TOKEN'; // flag
//         resolve(HttpClient(errorResponse.config));
//       });
//     });

//     if (!isAlreadyFetchingAccessToken) {
//       isAlreadyFetchingAccessToken = true;
//       const response = await HttpClient.post('/auth/refreshToken', {
//         id: userMobilePhoneNumber,
//         refreshToken,
//         deviceId,
//       });

//       const accessToken = response?.data?.data?.token?.access_token ?? '';

//       if (accessToken !== '') {
//         isAlreadyFetchingAccessToken = false;
//         isFetchingRefreshtoken = false;

//         store.dispatch(AuthActions.AuthSetToken(response.data.data.token));
//         onAccessTokenFetched(accessToken);

//         return retryOriginalRequest;
//       }
//       if (!accessToken) {
//         isAlreadyFetchingAccessToken = false;
//         isFetchingRefreshtoken = false;
//         return Promise.reject(error);
//       }
//     }
//     return retryOriginalRequest;
//   } catch (err: any) {
//     const _error: AxiosError = err;
//     if (_error?.config?.url === '/auth/refreshToken') {
//       store.dispatch(AuthActions.AuthReset());
//       store.dispatch(AuthActions.AuthSetUserIsLogin({ isLogin: false }));
//       NavigationService.reset({
//         index: 0,
//         routes: [{ name: routesEnum.AuthLoad }],
//       });

//       // block request token biar gak request lg
//       isAlreadyFetchingAccessToken = true;
//       return Promise.reject(err);
//     }
//     isAlreadyFetchingAccessToken = false;
//     isFetchingRefreshtoken = false;
//     return Promise.reject(err);
//   }
// };

// const onAccessTokenFetched = (accessToken: string) => {
//   subscribers.forEach((callback: any) => callback(accessToken));
//   subscribers = []; // reset
// };

// const addSubscriber = (_callback: any) => {
//   subscribers.push(_callback);
// };

// // const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
// const onRequest = (config: any): AxiosRequestConfig => {
//   // console.info(`[request] [${JSON.stringify(config)}]`);
//   const { ua } = store.getState().app;
//   const { token, isLogin } = store.getState().auth;

//   if (isLogin) {
//     config.headers.Authorization = `Bearer ${token.access_token}`;
//     config.headers['x-fooma-ua'] = toLower(JSON.stringify(ua));
//   }

//   return config;
// };

// const onRequestError = (error: AxiosError): Promise<AxiosError> => {
//   // console.error(`[request error] [${JSON.stringify(error)}]`);
//   return Promise.reject(error);
// };

// const onResponse = (response: AxiosResponse): AxiosResponse => {
//   // console.info(`[response] [${JSON.stringify(response)}]`);

//   return response;
// };

// const onResponseError = (error: AxiosError): Promise<AxiosError> => {
//   console.log(`[response error] [${JSON.stringify(error)}]`);
//   const {
//     userData: { email, deviceId },
//     token: { refresh_token },
//     isLogin,
//   } = store.getState().auth;
//   // const { ua } = store.getState().app;

//   const res = JSON.stringify(error);

//   const errorParseOriginal = JSON.parse(res);
//   const errMessage = JSON.stringify((error as AxiosError)?.response?.data);
//   const errorParse: IErrorParse = JSON.parse(errMessage);

//   store.dispatch(
//     bootActions.setErrorResponse({
//       message: errorParse?.message ?? '',
//       status: errorParseOriginal?.status,
//     }),
//   );

//   // handling error 500 disini
//   if (errorParseOriginal?.status >= 500) {
//     if (isLogin) {
//       store.dispatch(
//         bootActions.setIsErrorModal({
//           isShowErrorModal: true,
//           errorStatus: errorParseOriginal?.status.toString(),
//           errorMessage: errorParse?.message ?? '',
//         }),
//       );
//     }
//   }
//   // reset message error
//   setTimeout(() => {
//     store.dispatch(
//       bootActions.setErrorResponse({
//         message: '',
//         status: '',
//         data: {},
//       }),
//     );
//   }, 3 * 1000);
//   // #region refresh token
//   const originalRequest = errorParseOriginal.config;
//   if (
//     errorParseOriginal?.status === 401 &&
//     !originalRequest._retry &&
//     !isFetchingRefreshtoken
//   ) {
//     originalRequest._retry = true;
//     isFetchingRefreshtoken = true;

//     resetTokenAndReattemptRequest(error, email, refresh_token, deviceId);
//   }
//   // #endregion

//   return Promise.reject(error);
// };

// export const setupInterceptorsTo = (
//   axiosInstance: AxiosInstance,
// ): AxiosInstance => {
//   axiosInstance.interceptors.request.use(onRequest, onRequestError);
//   axiosInstance.interceptors.response.use(onResponse, onResponseError);
//   return axiosInstance;
// };

// setupInterceptorsTo(HttpClient);

// export interface IAPIResponse<T = any> {
//   isAllRegistered: any;
//   dataLocation: any; // geo response
//   supportedVersion?: any; // for remote config
//   disableScreen?: string[]; // for remoce config disable screen;
//   downloadUrl?: any;
//   Blob?: any;
//   dataProduct?: any;
//   dataCategory?: any;
//   data: T;
//   message: string;
//   status: 200 | 400 | 300 | 500;
// }

// export const getData = async <T = any>(url: string, config = {}) => {
//   return await HttpClient.get<T>(url, { ...config }).then(
//     (response) => response,
//   );
// };

// export const postData = async <T = any>(url: string, data = {}) => {
//   return await HttpClient.post<T>(url, { ...data }).then(
//     (response) => response,
//   );
// };

// export const patchData = async (url: string, data = {}) => {
//   return await HttpClient.patch<IAPIResponse>(url, { ...data }).then(
//     (response) => response,
//   );
// };

// export const deleteData = async (url: string, data = {}) => {
//   return await HttpClient.delete<IAPIResponse>(url, { ...data }).then(
//     (response) => response,
//   );
// };

// export const putData = async <T = any>(url: string, data = {}) => {
//   return await HttpClient.put<T>(url, { ...data }).then((response) => response);
// };
