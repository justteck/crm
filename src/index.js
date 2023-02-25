import {
  inputSearch,
} from './script/htmlElements';
import {modalRenderTotalPrice} from './script/totalPrice';
import {
  modalControl,
  modalControlDiscount,
  modalAddGoods,
  modalShowPhoto,
} from './script/modalControls';
import {
  renderGoodsTable,
} from './script/renderGoods';
import {
  renderDeleteModal,
  showGoodsPhoto,
} from './script/controlGoods';
import {modalEditOpen} from './script/editControl';
import './index.html';
import './css/index.css';
import {modalConfigFields} from './script/defaultInputs';
import {getGoods} from './script/getGoods';
import {callbackGet} from './script/fetchCallbacks';
import {searchDebounce} from './script/search';
import {preloaderStart, preloaderStop} from './script/preloader';

// api URL
export const apiURL = 'https://skitter-spectrum-bath.glitch.me/api/goods';

const init = async () => {
  preloaderStart(); // show preloader

  modalConfigFields(); // config inputs by default

  // modal controls
  modalControl();
  modalControlDiscount();
  modalShowPhoto();
  modalRenderTotalPrice();
  modalAddGoods();

  renderGoodsTable(await getGoods(apiURL, callbackGet)); // render table

  preloaderStop(); // stop preloader

  modalEditOpen(); // open goods edit modal

  renderDeleteModal(); // render delete confirmation

  showGoodsPhoto(800, 600); // open goods photo

  inputSearch.addEventListener('input', searchDebounce); // search
};

init();
