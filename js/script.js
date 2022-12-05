import {dataBase} from './modules/database.js';

import {modalForm} from './modules/htmlElements.js';

import {renderTotalPriceModal} from './modules/totalPrice.js';

import {
  modalControl,
  modalControlDiscount,
  modalAddGoods,
} from './modules/modalControls.js';

import {
  renderGoods,
  renderGoodsIndex,
} from './modules/renderGoods.js';

import {
  deleteGoods,
  showGoodsPhoto,
} from './modules/controlGoods.js';

// Config inputs
const modalConfigFields = () => {
  const elements = modalForm.firstElementChild.elements;

  for (const element of elements) {
    if (element.type !== 'checkbox' && element.type !== 'file') {
      element.required = true;
    }
  }

  elements.discount_count.type = 'number';
  elements.count.type = 'number';
  elements.price.type = 'number';
};

const init = () => {
  modalConfigFields();

  renderGoods(dataBase);
  renderGoodsIndex();

  modalControl();
  modalControlDiscount();
  renderTotalPriceModal();

  modalAddGoods();
  deleteGoods();
  showGoodsPhoto();
};

init();
