import {useMutation} from '@tanstack/react-query';
import * as services from '@modules/auth/services/index';
import {IPayloadAuth} from '../types';

/**
 * dok lengkap dsini https://tanstack.com/query/v4/docs/guides/queries
 * @returns
 */

const useLogin = () => {
  // perlu kasih nama prefix namaModule di depan nya untuk yg sifat nya list karena biar gak bentrok
  const data = useMutation(['auth-login'], (payload: IPayloadAuth) => {
    return services.authLoginServices(payload);
  });
  return data;
};

export default useLogin;
