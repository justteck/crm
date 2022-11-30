const overlay = document.querySelector('.overlay');

const modalForm = document.querySelector('.modal__form');
const newGoodsId = document.querySelector('.vendor-code__id');
const modalDiscountCheckbox = modalForm.discount;
const modalDiscountField = modalForm.discount_count;
const modalCount = modalForm.count;
const modalPrice = modalForm.price;
const modalTotalPrice = modalForm.total;

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
  tableBody,
  totalPrice,
  btnAddGoods,
};
