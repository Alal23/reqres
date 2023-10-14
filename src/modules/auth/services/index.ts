import {postData} from '@utils/httpClient';
import {IPayloadAuth} from '../types';

export const authLoginServices = (params: IPayloadAuth) => {
  return postData('/api/login', {
    ...params,
  });
};

export const authRegisterServices = (params: IPayloadAuth) => {
  return postData('/api/register', {
    ...params,
  });
};
