import {getGoods} from './getGoods';
import {apiURL} from '..';
import {renderGoodsTable} from './renderGoods';
import {callbackGet} from './fetchCallbacks';
import {inputSearch} from './htmlElements';

// delay search
const debounce = (func, delayTime) => {
  let timeout;
  return function doWithDelay() {
    clearTimeout(timeout);
    timeout = setTimeout(func, delayTime);
  };
};

// search
const searchGoods = async () => {
  // current search query
  const currentQuery = inputSearch.value;

  // get goods from api
  const searchResults =
    await getGoods(`${apiURL}?search=${currentQuery}`, callbackGet);

  // render
  renderGoodsTable(searchResults);
};

const searchDebounce = debounce(searchGoods, 300);

export {
  searchDebounce,
};
