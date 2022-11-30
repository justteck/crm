import {
  overlay,
  modalForm,
  newGoodsId,
  modalDiscountField,
  btnAddGoods,
  modalDiscountCheckbox,
} from './htmlElements.js';

import {dataBase} from './database.js';

import {
  renderTotalPricePage,
} from './totalPrice.js';

import {addGoods} from './controlGoods.js';

import {renderGoodsIndex} from './renderGoods.js';

// Generate goods ID
const generateId = () => Date.now();

// Controls
const modalOpen = () => {
  overlay.classList.add('active');
  newGoodsId.textContent = generateId();
  modalForm.total.textContent = '$ 0';
};

const modalClose = () => {
  modalDiscountField.disabled = true;
  modalForm.reset();
  overlay.classList.remove('active');
  renderTotalPricePage(dataBase);
};

const modalControlDiscount = () => {
  const modalUnlockDiscount = () => {
    modalDiscountField.disabled = false;
  };

  const modalLockDiscount = () => {
    modalDiscountField.disabled = true;
    modalDiscountField.value = '';
  };

  modalDiscountCheckbox.addEventListener('click', () => {
    if (modalDiscountField.disabled) {
      modalUnlockDiscount();
      console.log('unlocked');
    } else {
      modalLockDiscount();
      console.log('locked');
    }
  });
};

const modalControl = () => {
  modalClose();

  btnAddGoods.addEventListener('click', () => {
    modalOpen();
  });

  overlay.addEventListener('click', e => {
    const target = e.target;

    if (target.matches('.overlay') ||
        target.closest('.modal__close')) {
      modalClose();
    }
  });
};

const modalAddGoods = () => {
  modalForm.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const newGoods = Object.fromEntries(formData);
    newGoods.id = +newGoodsId.textContent;

    addGoods(newGoods);
    renderGoodsIndex();
    modalClose();
  });
};

export {
  modalClose,
  modalControl,
  modalControlDiscount,
  modalAddGoods,
};
