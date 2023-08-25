import {useQuery} from 'react-query';
import * as services from '../services/index';

const useGetListBook = (subjectName: string) => {
  const data = useQuery(
    ['get-list-book', subjectName],
    () => {
      return services.getListBookApi(subjectName);
    },
    {
      select(newData) {
        const modifiedData = newData?.data?.works.map(item => ({
          ...item,
          cover_link: `https://covers.openlibrary.org/b/id/${item.cover_id}.jpg`,
        }));
        return modifiedData;
      },
      enabled: subjectName !== '',
    },
  );
  return data;
};

export default useGetListBook;
