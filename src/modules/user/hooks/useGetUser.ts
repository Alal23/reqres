import {useQuery} from '@tanstack/react-query';
import * as services from '@modules/user/services/index';

const useGetUser = () => {
  const data = useQuery(['get-users'], () => {
    return services.getUsersApi();
  });
  return data;
};

export default useGetUser;
