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

const modalEditOpen = () => {
  tableBody.addEventListener('click', async e => {
    const target = e.target;

    if (target.matches('.table__btn_edit')) {
      // change modal title
      overlay.querySelector('.modal__title').textContent =
          'Редактировать товар';
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

      // render goods data inside the form
      newGoodsId.textContent = id;
      modalForm.title.value = title;
      modalForm.description.value = description;
      modalForm.category.value = category;
      modalCount.value = count;
      modalPrice.value = price;
      modalForm.units.value = units;
      modalForm.image.filename = image;
      console.log('image.value: ', image);

      if (discount === 0) {
        modalDiscountField.disabled = true;
      } else {
        modalDiscountField.disabled = false;
        modalDiscountCheckbox.checked = true;
        modalDiscountField.value = discount;
      }

      const imgSrc = `https://skitter-spectrum-bath.glitch.me/${image}`;

      const loadPhoto = () => new Promise(resolve => {
        // создать img
        // const photo = createPhotoPreview(imgSrc);
        const photo = new Image();
        photo.src = imgSrc;
        // создать контейнер с фото
        // const photoContainer = createPhotoContainer(photo);
        // // добавить на страницу
        // document.querySelector('.modal__fieldset').
        //   insertAdjacentElement('afterend', photoContainer);

        // // рендер цены
        // modalTotalPrice.textContent = `$ ${countTotalPriceModal()}`;

        // photo.addEventListener('load', () => {
        //   resolve();
        // });

        photo.onload = resolve(photo);
      });

      const x = loadPhoto();
      x.then(photo => {
        // создать контейнер с фото
        const photoContainer = createPhotoContainer(photo);
        // добавить на страницу
        document.querySelector('.modal__fieldset').
          insertAdjacentElement('afterend', photoContainer);

        // рендер цены
        modalTotalPrice.textContent = `$ ${countTotalPriceModal()}`;

        overlay.classList.add('active');
      });

      // // создать img
      // const photo = createPhotoPreview(imgSrc);

      // photo.addEventListener('load', () => {
      //   // создать контейнер с фото
      //   const photoContainer = createPhotoContainer(photo);
      //   // добавить на страницу
      //   document.querySelector('.modal__fieldset').
      //     insertAdjacentElement('afterend', photoContainer);

      //   // рендер цены
      //   modalTotalPrice.textContent = `$ ${countTotalPriceModal()}`;
      // });

      // overlay.classList.add('active');
    }
  });
};

export {
  modalEditOpen,
};
