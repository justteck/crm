import {
  overlay,
  modalForm,
  newGoodsId,
  modalDiscountField,
  btnAddGoods,
  modalDiscountCheckbox,
  modalFile,
} from './htmlElements';

import {
  renderTotalPricePage,
} from './totalPrice';

import {addGoods} from './controlGoods';

import {renderGoods, renderGoodsIndex} from './renderGoods';

import {getGoods} from './getGoods';

import {toBase64} from './imgToBase64';

import {el, mount} from 'redom';

// Generate goods ID
const generateId = () => Date.now();

// show photo preview
const modalShowPhoto = () => {
  modalFile.addEventListener('change', () => {
    // if photo size < 1 Mb
    if (modalFile.files[0].size < 1000000) {
      const imgSrc = URL.createObjectURL(modalFile.files[0]);

      const goodsPhoto = el('img', {
        src: `${imgSrc}`,
        alt: 'goods',
        style: {
          maxHeight: '200px',
          borderRadius: '8px',
        },
      });

      const photoSection = el('div', {
        className: 'modal__photo',
        style: {
          maxWidth: `${document.querySelector('.modal__form').offsetWidth}px`,
        },
      }, goodsPhoto);

      // insert photo section after a fieldset
      mount(modalForm, photoSection, modalForm.lastElementChild);
      // delete error section
      document.querySelector('.modal__photo_error')?.remove();
    } else { // if photo size > 1 Mb
      const message = el('p', {
        style: {
          color: 'red',
          fontSize: '15px',
        },
      }, 'Размер изображения не должен превышать 1 МБ');

      const errorSection = el('div', {
        className: 'modal__photo_error',
        style: {
          maxWidth: `${document.querySelector('.modal__input').offsetWidth}px`,
        },
      }, message);

      // add error message
      mount(document.querySelector('fieldset'), errorSection);
      // delete photo section
      document.querySelector('.modal__photo')?.remove();
    }
  });
};

// Controls
const modalOpen = () => {
  overlay.querySelector('.modal__title').textContent = 'Добавить товар';
  overlay.classList.add('active');
  newGoodsId.textContent = generateId();
  modalForm.total.textContent = '$ 0';
};

const modalClose = async () => {
  modalDiscountField.disabled = true;
  modalForm.reset();
  document.querySelector('.modal__photo')?.remove(); // remove photo preview
  document.querySelector('.modal__photo_error')?.
    remove(); // remove error message
  overlay.classList.remove('active');

  const currentDB = await getGoods('https://skitter-spectrum-bath.glitch.me/api/goods');
  renderTotalPricePage(currentDB);
  renderGoods(currentDB);
  renderGoodsIndex();
};

// enable/disable discount checkbox
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

// open/close modal
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
  modalForm.addEventListener('submit', async e => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const newGoods = Object.fromEntries(formData);
    newGoods.id = +newGoodsId.textContent;
    console.log(newGoods);

    const imgBase64 = await toBase64(newGoods.image);
    newGoods.image = imgBase64;

    await addGoods(newGoods);
    modalClose();
  });
};

export {
  modalClose,
  modalControl,
  modalControlDiscount,
  modalAddGoods,
  modalShowPhoto,
};
