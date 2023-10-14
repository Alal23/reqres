import {useMutation} from '@tanstack/react-query';
import * as services from '@modules/auth/services/index';
import {IPayloadAuth} from '../types';

/**
 * dok lengkap dsini https://tanstack.com/query/v4/docs/guides/queries
 * @returns
 */

const useRegister = () => {
  // perlu kasih nama prefix namaModule di depan nya untuk yg sifat nya list karena biar gak bentrok
  const data = useMutation(['auth-register'], (payload: IPayloadAuth) => {
    return services.authRegisterServices(payload);
  });
  return data;
};

export default useRegister;
