const overlay = document.querySelector('.overlay');
const overlayError = document.querySelector('.overlay-error');
const overlayDelete = document.querySelector('.overlay-delete');

const modalForm = document.querySelector('.modal__form');
const newGoodsId = document.querySelector('.vendor-code__id');
const modalDiscountCheckbox = modalForm.discountCheckbox;
const modalDiscountField = modalForm.discount;
const modalCount = modalForm.count;
const modalPrice = modalForm.price;
const modalTotalPrice = modalForm.total;
const modalFile = modalForm.image;

const tableBody = document.querySelector('.table__body');
const totalPrice = document.querySelector('.cms__total-price');

const btnAddGoods = document.querySelector('.panel__add-goods');

export {
  overlay,
  modalForm,
  newGoodsId,
  modalDiscountCheckbox,
  modalDiscountField,
  modalCount,
  modalPrice,
  modalTotalPrice,
  modalFile,
  tableBody,
  totalPrice,
  btnAddGoods,
  overlayError,
  overlayDelete,
};
