import {fetchRequest} from './fetchRequest';

export const getGoods = async (URL, callback) =>
  await fetchRequest(URL, {
    method: 'get',
    callback,
  });
