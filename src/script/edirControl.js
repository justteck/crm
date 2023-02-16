// control goods edit
import {fetchRequest} from './fetchRequest';
import {
  tableBody,
  overlay,
  newGoodsId,
  modalForm,
  modalCount,
  modalPrice,
  // modalTotalPrice,
  modalDiscountCheckbox,
  modalDiscountField,
} from './htmlElements';

const modalEditOpen = () => {
  tableBody.addEventListener('click', async e => {
    const target = e.target;

    if (target.matches('.table__btn_edit')) {
      overlay.querySelector('.modal__title').textContent =
          'Редактировать товар';
      const currentGoods = target.closest('tr');

      // current id
      const goodsId = currentGoods.
        querySelector('.table__cell-id').
        parentElement.dataset.id;

      const {
        id,
        title,
        description,
        category,
        price,
        units,
        count,
        discount,
        // image,
      } = await fetchRequest(
        `https://skitter-spectrum-bath.glitch.me/api/goods/${goodsId}`,
        {method: 'get'});

      // render goods data inside the form
      newGoodsId.textContent = id;
      modalForm.title.value = title;
      modalForm.description.textContent = description;
      modalForm.category.value = category;
      modalCount.value = count;
      modalPrice.value = price;
      modalForm.units.value = units;

      if (discount === 0) {
        modalDiscountField.disabled = true;
      } else {
        modalDiscountField.disabled = false;
        modalDiscountCheckbox.checked = true;
        modalDiscountField.value = discount;
      }

      overlay.classList.add('active');
    }
  });
};

export {
  modalEditOpen,
};
