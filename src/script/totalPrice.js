import {
  modalDiscountField,
  modalCount,
  modalPrice,
  modalTotalPrice,
  modalDiscountCheckbox,
  totalPrice,
} from './htmlElements';

// count goods price in modal window
const countTotalPriceModal = () => {
  const discountCount = modalDiscountField.value ? modalDiscountField.value : 0;
  const totalPrice =
    (modalPrice.value * modalCount.value * (1 - (discountCount / 100)).
      toFixed(2));

  return totalPrice;
};

// render goods price in modal window
const modalRenderTotalPrice = () => {
  const render = () => {
    modalTotalPrice.textContent = `$ ${countTotalPriceModal()}`;
  };

  // render total price
  modalCount.addEventListener('blur', () => render());
  modalPrice.addEventListener('blur', () => render());
  modalDiscountField.addEventListener('blur', () => render());
  modalDiscountCheckbox.addEventListener('click', () => render());
};

// count total price of all goods
const countTotalPricePage = (dataBase) => {
  const price = +dataBase.map(goods => {
    const discount = goods['discount'] ?? 0;
    return (+goods.price) * (+goods.count) * (1 - (discount / 100));
  }).
    reduce((prevPrice, currPrice) => prevPrice + currPrice, 0).
    toFixed(2);
  return price;
};

// render total price of all goods
const renderTotalPricePage = (dataBase) => {
  totalPrice.textContent = `$ ${countTotalPricePage(dataBase)}`;
};

export {
  modalRenderTotalPrice,
  countTotalPriceModal,
  renderTotalPricePage,
  countTotalPricePage,
};
