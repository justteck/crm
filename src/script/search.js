import {getGoods} from './getGoods';
import {apiURL} from '..';
import { renderGoodsTable } from './renderGoods';

// search
const inputSearch = document.querySelector('.panel__input');

const debounce = (func, delayTime) => {
  let timeout;
  return function doWithDelay() {
    clearTimeout(timeout);
    timeout = setTimeout(func, delayTime);
  };
};

const searchGoods = async () => {
  const currentQuery = inputSearch.value;

  const searchResults = await getGoods(`${apiURL}?search=${currentQuery}`);
  renderGoodsTable(searchResults);
};

const searchDebounce = debounce(searchGoods, 300);

inputSearch.addEventListener('input', searchDebounce);

export {
  searchDebounce,
};
