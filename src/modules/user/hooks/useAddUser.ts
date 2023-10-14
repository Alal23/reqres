import {useMutation} from '@tanstack/react-query';
import * as services from '@modules/user/services/index';
import {UserAddProps} from '../types';

/**
 * dok lengkap dsini https://tanstack.com/query/v4/docs/guides/queries
 * @returns
 */

const useAddUser = () => {
  // perlu kasih nama prefix namaModule di depan nya untuk yg sifat nya list karena biar gak bentrok
  const data = useMutation(['user-add'], (payload: UserAddProps) => {
    return services.addUserApi(payload);
  });
  return data;
};

export default useAddUser;
