import {
  overlay,
  modalForm,
  newGoodsId,
  modalDiscountField,
  btnAddGoods,
  modalDiscountCheckbox,
  modalFile,
  overlayError,
} from './htmlElements';

import {addGoods, editGoods} from './controlGoods';

import {renderGoodsTable} from './renderGoods';

import {getGoods} from './getGoods';

import {toBase64} from './imgToBase64';

import {el, mount, setChildren} from 'redom';
import {apiURL} from '..';
import {fetchRequest} from './fetchRequest';
import {callbackGet} from './fetchCallbacks';
import {modalIsPhotoAttached} from './editControl';

// Generate goods ID
const generateId = () => 'будет сгенерирован на сервере';

// show goods category list
const modalShowCategories = async () => {
  // get category datalist element
  const categoriesDatalist = document.querySelector('#category-list');

  // get goods categories from API
  const categoriesAPI = await fetchRequest(`https://skitter-spectrum-bath.glitch.me/api/category`, {
    method: 'get',
  });

  // create array of category elements
  const datalistOptions = categoriesAPI.map(category => el('option', {
    value: `${category}`}));

  // add to datalist
  setChildren(categoriesDatalist, datalistOptions);
};

// create modal photo preview
const createPhotoPreview = (src) => el('img', {
  className: 'modal__photo-preview',
  src: `${src}`,
  alt: 'goods photo',
  style: {
    maxHeight: '200px',
    borderRadius: '8px',
  },
});

// create modal photo container
const createPhotoContainer = (photo) => el('div', {
  className: 'modal__photo',
}, [el('p', {
  className: 'modal__label modal__text',
}, 'Фото товара'), photo]);

// show modal photo preview
const modalShowPhoto = () => {
  modalFile.addEventListener('change', () => {
    // if photo size < 1 Mb
    if (modalFile.files[0].size < 1000000) {
      const imgSrc = URL.createObjectURL(modalFile.files[0]);
      // create img
      const photo = createPhotoPreview(imgSrc);

      // create container
      const photoContainer = createPhotoContainer(photo);

      // delete error section if exists
      document.querySelector('.modal__photo_error')?.remove();

      // delete photo section if exists
      document.querySelector('.modal__photo')?.remove();

      // insert photo section after fieldset
      mount(modalForm, photoContainer, modalForm.lastElementChild);
    } else { // if photo size > 1 Mb
      // create error message
      const message = el('p', {
        style: {
          color: 'red',
          fontSize: '15px',
        },
      }, 'Размер изображения не должен превышать 1 МБ');

      // create error section
      const errorContainer = el('div', {
        className: 'modal__photo_error',
        style: {
          maxWidth: `${document.querySelector('.modal__input').offsetWidth}px`,
        },
      }, message);

      // add error message
      mount(document.querySelector('fieldset'), errorContainer);
      // delete photo section
      document.querySelector('.modal__photo')?.remove();
    }
  });
};

// Controls
const modalOpen = () => {
  overlay.querySelector('.modal__title').textContent = 'Добавить товар';
  overlay.querySelector('.modal__label_file').textContent =
    'Добавить изображение';

  // set current modal mode
  modalForm.dataset.mode = 'add';

  overlay.classList.add('active');
  newGoodsId.textContent = generateId();
  modalForm.total.textContent = '$ 0';

  modalShowCategories();
};

// modal close
const modalClose = () => {
  modalDiscountField.disabled = true; // disable discount field

  document.querySelector('.modal__photo')?.remove(); // remove photo preview
  document.querySelector('.modal__photo_error')?.
    remove(); // remove photo error message
  document.querySelector('.modal__error')?.
    remove(); // remove post error message

  // reset modal mode (add goods/ edit goods)
  overlay.dataset.mode = '';

  modalForm.reset();
  overlay.classList.remove('active');
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

  overlayError.addEventListener('click', ({target}) => {
    if (target.matches('.overlay-error') ||
    target.closest('.modal-error__close-btn')) {
      document.querySelector('.overlay-error').classList.remove('active');
    }
  });
};

// actions after submit
const modalAddGoods = () => {
  modalForm.addEventListener('submit', async e => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const newGoods = Object.fromEntries(formData);

    const imgBase64 = await toBase64(newGoods.image);
    newGoods.image = imgBase64;

    // check modal mode (edit goods / add goods)
    if (modalForm.dataset.mode === 'edit') { // if mode is "edit goods"
      // get id
      newGoods.id = newGoodsId.textContent;

      // if no photo attached
      if (!modalIsPhotoAttached(imgBase64)) delete newGoods.image;

      if (await editGoods(newGoods)) { // if edited successfully
        renderGoodsTable(await getGoods(apiURL, callbackGet));
        modalClose();
      }
    } else if (modalForm.dataset.mode === 'add') { // if mode is "add goods"
      await addGoods(newGoods);
      renderGoodsTable(await getGoods(apiURL, callbackGet));
      modalClose();
    }
  });
};

export {
  modalClose,
  modalControl,
  modalControlDiscount,
  modalAddGoods,
  modalShowPhoto,
  createPhotoPreview,
  createPhotoContainer,
  modalShowCategories,
};
