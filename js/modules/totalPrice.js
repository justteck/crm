import {
  modalDiscountField,
  modalCount,
  modalPrice,
  modalTotalPrice,
  modalDiscountCheckbox,
  totalPrice,
} from './htmlElements.js';

const countTotalPriceModal = () => {
  const discountCount = modalDiscountField.value ? modalDiscountField.value : 0;
  const totalPrice =
    (modalPrice.value * modalCount.value * (1 - (discountCount / 100)).
      toFixed(2));

  return totalPrice;
};

const renderTotalPriceModal = () => {
  const render = () => {
    modalTotalPrice.textContent = `$ ${countTotalPriceModal()}`;
  };

  modalCount.addEventListener('blur', () => render());
  modalPrice.addEventListener('blur', () => render());
  modalDiscountField.addEventListener('blur', () => render());
  modalDiscountCheckbox.addEventListener('click', () => render());
};

const countTotalPricePage = (dataBase) => {
  console.log('DB', dataBase);
  const price = +dataBase.map(goods => {
    const discount = goods['discount_count'] ?? 0;
    return (+goods.price) * (+goods.count) * (1 - (discount / 100));
  }).
    reduce((prevPrice, currPrice) => prevPrice + currPrice, 0).
    toFixed(2);
  console.log('price: ', price);
  return price;
};

const renderTotalPricePage = (dataBase) => {
  totalPrice.textContent = `$ ${countTotalPricePage(dataBase)}`;
};

export {
  renderTotalPriceModal,
  countTotalPriceModal,
  renderTotalPricePage,
  countTotalPricePage,
};
