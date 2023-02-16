import {fetchRequest} from './fetchRequest';

export const getGoods = async (URL) =>
  await fetchRequest(URL, {
    method: 'get',
  });
