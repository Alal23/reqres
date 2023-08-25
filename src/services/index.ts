import {getData} from '../utils/httpClient';

export function getListSubjectApi() {
  return getData('/people/george08/lists/OL97L/subjects.json');
}

export function getListBookApi(subjectName: string) {
  return getData(`/subjects/${subjectName}.json`);
}

export function getListBookDetailApi(workId: string) {
  return getData(`/works/${workId}`);
}
