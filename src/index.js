import {modalForm} from './script/htmlElements';
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
  // deleteGoods,
  renderDeleteModal,
  showGoodsPhoto,
} from './script/controlGoods';
import {modalEditOpen} from './script/editControl';
import './index.html';
import './css/index.css';
import {el} from 'redom';
import {getGoods} from './script/getGoods';
import {callbackGet} from './script/fetchCallbacks';
import {searchDebounce} from './script/search';

// api URL
export const apiURL = 'https://skitter-spectrum-bath.glitch.me/api/goods';

// Config inputs
const modalConfigFields = () => {
  const elements = modalForm.firstElementChild.elements;

  for (const element of elements) {
    if (element.type !== 'checkbox' && element.type !== 'file') {
      element.required = true;
    }
  }

  elements.discount.type = 'number';
  elements.count.type = 'number';
  elements.price.type = 'number';

  // create categories datalist
  const categories = el('datalist', {
    id: 'category-list',
  });
  document.querySelector('.modal__label_category').
    insertAdjacentElement('afterend', categories);
};

const init = async () => {
  renderGoodsTable(await getGoods(apiURL, callbackGet));

  modalConfigFields();
  modalControl();
  modalControlDiscount();
  modalShowPhoto();
  modalRenderTotalPrice();
  modalAddGoods();

  modalEditOpen();

  renderDeleteModal();

  showGoodsPhoto(800, 600);

  searchDebounce();
};

init();
