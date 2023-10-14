import {deleteData, getData, postData, putData} from '@utils/httpClient';
import {UserAddProps, UserUpdateProps} from '../types';

export function getUsersApi() {
  return getData('/api/users');
}

export function addUserApi(params: UserAddProps) {
  return postData('/api/users', {
    ...params,
  });
}

export function updateUserApi(params: UserUpdateProps) {
  const {id, ...rest} = params;
  return putData(`/api/users/${id}`, rest);
}

export function deleteUserApi(id: number) {
  return deleteData(`/api/users/${id}`);
}
