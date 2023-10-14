import {useMutation} from '@tanstack/react-query';
import * as services from '@modules/user/services/index';
import {UserUpdateProps} from '../types';

/**
 * dok lengkap dsini https://tanstack.com/query/v4/docs/guides/queries
 * @returns
 */

const useUpdateUser = () => {
  // perlu kasih nama prefix namaModule di depan nya untuk yg sifat nya list karena biar gak bentrok
  const data = useMutation(['user-update'], (payload: UserUpdateProps) => {
    return services.updateUserApi(payload);
  });
  return data;
};

export default useUpdateUser;
