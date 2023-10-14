import {useMutation} from '@tanstack/react-query';
import * as services from '@modules/user/services/index';

/**
 * dok lengkap dsini https://tanstack.com/query/v4/docs/guides/queries
 * @returns
 */

const useDelUser = () => {
  // perlu kasih nama prefix namaModule di depan nya untuk yg sifat nya list karena biar gak bentrok
  const data = useMutation(['user-delete'], (id: number) => {
    return services.deleteUserApi(id);
  });
  return data;
};

export default useDelUser;
