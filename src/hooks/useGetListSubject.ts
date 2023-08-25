import {useQuery} from 'react-query';
import * as services from '../services/index';
import _ from 'lodash';
import {IPropsSubject} from '../types';

const useGetListSubject = () => {
  const data = useQuery(
    ['get-list-subject'],
    () => {
      return services.getListSubjectApi();
    },
    {
      select(newData) {
        const modifiedData = newData?.data?.subjects as IPropsSubject[];
        const result = _.uniqBy(modifiedData, 'url');
        return result;
      },
    },
  );
  return data;
};

export default useGetListSubject;
