'use strict';

const dataBase = [];

const overlay = document.querySelector('.overlay');
const modalForm = document.querySelector('.modal__form');
const newGoodsId = document.querySelector('.vendor-code__id');
const modalDiscountCheckbox = document.querySelector('.modal__checkbox');
const discountField = modalDiscountCheckbox.nextElementSibling;

const tableBody = document.querySelector('.table__body');
const totalPrice = document.querySelector('.cms__total-price');

const btnAddGoods = document.querySelector('.panel__add-goods');

const modalConfigFields = () => {
  const elements = modalForm.firstElementChild.elements;

  for (const element of elements) {
    if (element.type !== 'checkbox' && element.type !== 'file') {
      element.required = true;
    }
  }

  elements.discount_count.type = 'number';
  elements.count.type = 'number';
  elements.price.type = 'number';
};

const generateId = () => Date.now();

const createRow =
  ({id,
    name: title,
    category,
    units,
    count,
    price,
    discount_count: discountCount = 0}) => {
    const tr = document.createElement('tr');
    const resultDiscount = 1 - (discountCount / 100);
    const resultPrice = (price * resultDiscount).toFixed(2);
    const tableRow = `
      <td class="table__cell"></td>
      <td class="table__cell table__cell_left 
      table__cell_name" data-id="${id}">
        <span class="table__cell-id">id: ${id}</span>
        ${title}
      </td>
      <td class="table__cell table__cell_left">${category}</td>
      <td class="table__cell">${units}</td>
      <td class="table__cell">${count}</td>
      <td class="table__cell">$${resultPrice}</td>
      <td class="table__cell">$${count * resultPrice}</td>
      <td class="table__cell table__cell_btn-wrapper">
        <button class="table__btn table__btn_pic"></button>
        <button class="table__btn table__btn_edit"></button>
        <button class="table__btn table__btn_del"></button>
      </td>
    `;

    tr.insertAdjacentHTML('afterbegin', tableRow);
    return tr;
  };

const modalSetTotalPrice = () => {
  const totalPriceField = modalForm.total;
  const count = modalForm.count;
  const price = modalForm.price;
  const discount = modalForm.discount_count;
  const discountCheckbox = modalForm.discount;

  const setTotalPrice = () => {
    const discountCount = discount.value ? discount.value : 0;

    const totalPrice =
      (price.value * count.value * (1 - (discountCount / 100)).
        toFixed(2));

    totalPriceField.textContent = `$ ${totalPrice}`;
  };

  count.addEventListener('blur', setTotalPrice);
  price.addEventListener('blur', setTotalPrice);
  discount.addEventListener('blur', setTotalPrice);
  discountCheckbox.addEventListener('click', setTotalPrice);
};

const countTotalPricePage = () => {
  const price = [...tableBody.querySelectorAll('td:nth-child(7)')].
    map(price => +price.textContent.slice(1)).
    reduce((prevPrice, currPrice) => prevPrice + currPrice, 0).
    toFixed(2);

  totalPrice.textContent = `$ ${price}`;
};

const addGoods = (goods) => {
  const addGoodsToDB = (goods) => {
    dataBase.push(goods);
  };

  const addGoodsToPage = (goods) => {
    const nextRowNumber = tableBody.querySelectorAll('tr').length + 1;
    const newGoods = createRow(goods);

    newGoods.querySelector('td').textContent = nextRowNumber;
    tableBody.append(newGoods);
  };

  addGoodsToDB(goods);
  addGoodsToPage(goods);
  console.log('DB: ', dataBase);
};

const deleteGoods = () => {
  const table = document.querySelector('.table__body');

  table.addEventListener('click', e => {
    const target = e.target;

    if (target.matches('.table__btn_del')) {
      const currentGoods = target.closest('tr');
      const goodsId = +currentGoods.
        querySelector('.table__cell-id').
        parentElement.dataset.id;

      const goodsIndexInDB = dataBase.findIndex(goods => goods.id === goodsId);

      if (goodsIndexInDB >= 0) {
        dataBase.splice(goodsIndexInDB, 1);
      }

      currentGoods.remove();
      countTotalPricePage();
      console.table('DB: ', dataBase);
    }
  });
};

const modalControlDiscount = () => {
  const modalUnlockDiscount = () => {
    discountField.disabled = false;
  };

  const modalLockDiscount = () => {
    discountField.disabled = true;
    discountField.value = '';
  };

  modalDiscountCheckbox.addEventListener('click', () => {
    if (discountField.disabled) {
      modalUnlockDiscount();
      console.log('unlocked');
    } else {
      modalLockDiscount();
      console.log('locked');
    }
  });
};

const modalControl = () => {
  const modalOpen = () => {
    overlay.classList.add('active');
    newGoodsId.textContent = generateId();
    modalForm.total.textContent = '$ 0';
  };

  const modalClose = () => {
    discountField.disabled = true;
    modalForm.reset();
    overlay.classList.remove('active');
    countTotalPricePage();
  };

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

  return modalClose;
};

const modalAddGoods = (modalClose) => {
  modalForm.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const newGoods = Object.fromEntries(formData);
    newGoods.id = +newGoodsId.textContent;

    addGoods(newGoods);
    modalClose();
  });
};

const init = () => {
  const modalClose = modalControl();

  modalConfigFields();
  modalControlDiscount();
  modalSetTotalPrice();
  modalAddGoods(modalClose);
  deleteGoods();
};

init();
