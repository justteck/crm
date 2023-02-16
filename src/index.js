import {modalForm} from './script/htmlElements';

import {modalRenderTotalPrice} from './script/totalPrice';

import {
  modalControl,
  modalControlDiscount,
  modalAddGoods,
  modalShowPhoto,
} from './script/modalControls';

import {
  renderGoods,
  renderGoodsIndex,
} from './script/renderGoods';

import {
  deleteGoods,
  showGoodsPhoto,
} from './script/controlGoods';

import {getGoods} from './script/getGoods';

import {modalEditOpen} from './script/edirControl';

import './index.html';
import './css/index.css';

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
};

const init = async () => {
  modalConfigFields();
  modalControl();
  modalControlDiscount();
  modalShowPhoto();
  modalRenderTotalPrice();
  modalEditOpen();

  renderGoods(await getGoods('https://skitter-spectrum-bath.glitch.me/api/goods'));
  renderGoodsIndex();

  modalAddGoods();
  deleteGoods();

  showGoodsPhoto(800, 600);
};

init();
