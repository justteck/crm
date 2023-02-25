// control goods edit
import {fetchRequest} from './fetchRequest';
import {
  tableBody,
  overlay,
  newGoodsId,
  modalForm,
  modalCount,
  modalPrice,
  modalDiscountCheckbox,
  modalDiscountField,
  modalTotalPrice,
} from './htmlElements';
import {apiURL} from '..';
import {countTotalPriceModal} from './totalPrice';
import {
  createPhotoContainer,
  createPhotoPreview,
} from './modalControls';
import {modalShowCategories} from './modalControls';
import {preloaderStart, preloaderStop} from './preloader';

// check attached photo (modal edit)
const modalIsPhotoAttached = (base64img) => {
  if (base64img.length <= 5) { // no attached photo (base64img === 'data:')
    return false;
  }
  return true;
};

// load photo preview
const loadImage = (img) => new Promise((resolve, reject) => {
  img.addEventListener('load', () => {
    resolve(img);
  });

  img.addEventListener('error', () => {
    reject(new Error('Error! Photo was not loaded'));
  });
});

const modalEditOpen = () => {
  tableBody.addEventListener('click', async e => {
    const target = e.target;

    if (target.matches('.table__btn_edit')) { // edit btn is clicked
      preloaderStart(); // show preloader

      // change modal title
      overlay.querySelector('.modal__title').textContent =
          'Редактировать товар';
      overlay.querySelector('.modal__label_file').textContent =
          'Изменить изображение';

      // set current modal mode
      modalForm.dataset.mode = 'edit';

      const currentGoods = target.closest('tr');

      // current goods id
      const goodsId = currentGoods.
        querySelector('.table__cell-id').
        parentElement.dataset.id;

      // get goods data
      const {
        id,
        title,
        description,
        category,
        price,
        units,
        count,
        discount,
        image,
      } = await fetchRequest(
        `${apiURL}/${goodsId}`,
        {
          method: 'get',
        });

      // load goods categories
      modalShowCategories();

      // set goods data
      newGoodsId.textContent = id;
      modalForm.title.value = title;
      modalForm.description.value = description;
      modalForm.category.value = category;
      modalCount.value = count;
      modalPrice.value = price;
      modalForm.units.value = units;
      modalForm.image.filename = image;

      // set discount
      if (discount === 0) {
        modalDiscountField.disabled = true;
      } else {
        modalDiscountField.disabled = false;
        modalDiscountCheckbox.checked = true;
        modalDiscountField.value = discount;
      }

      // load photo
      if (image !== 'image/notimage.jpg') { // if goods photo exists
        const photoSrc = `https://skitter-spectrum-bath.glitch.me/${image}`;

        const photo = createPhotoPreview(photoSrc);

        const photoLoaded = await loadImage(photo);

        const photoContainer = createPhotoContainer(photoLoaded);

        document.querySelector('.modal__fieldset').
          insertAdjacentElement('afterend', photoContainer);
      }

      // render price
      modalTotalPrice.textContent = `$ ${countTotalPriceModal()}`;
      // open modal
      overlay.classList.add('active');
      preloaderStop(); // hide preloader
    }
  });
};

export {
  modalEditOpen,
  modalIsPhotoAttached,
};
