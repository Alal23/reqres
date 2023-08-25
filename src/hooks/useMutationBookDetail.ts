import {useMutation} from 'react-query';
import * as services from '../services/index';

const useMutationBookDetail = () => {
  const data = useMutation(['get-list-book-detail'], (workId: string) => {
    return services.getListBookDetailApi(workId);
  });
  return data;
};

export default useMutationBookDetail;
