import {tableBody} from './htmlElements';
import {renderTotalPricePage} from './totalPrice';
import {el} from 'redom';

// Create table row
const createRow =
  ({id,
    title,
    category,
    units,
    count,
    price,
    discount = 0,
    image}) => {
    const tr = document.createElement('tr');
    const resultDiscount = 1 - (discount / 100);
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
      <td class="table__cell">$${(count * resultPrice).toFixed(2)}</td>
      <td class="table__cell table__cell_btn-wrapper">
        <button class="table__btn table__btn_pic" 
        data-pic="https://skitter-spectrum-bath.glitch.me/${image}"></button>
        <button class="table__btn table__btn_edit"
        data-pic="/img/test-pic.jpg"></button>
        <button class="table__btn table__btn_del"></button>
      </td>
    `;

    tr.insertAdjacentHTML('afterbegin', tableRow);
    return tr;
  };

// Render
const renderGoodsIndex = () => {
  tableBody.querySelectorAll('tr').forEach((row, index) => {
    row.firstElementChild.textContent = index + 1;
  });
};

const renderGoods = (goodsArr) => {
  const rows = goodsArr.map((goods, index) => createRow(goods, index + 1));
  tableBody.innerHTML = '';

  if (rows.length === 0) { // if goods array is empty
    // remove no goods message if exists
    document.querySelector('.no-goods')?.remove();

    // add no goods message
    document.querySelector('.goods__table-wrapper').append(el('div', {
      className: 'no-goods',
      style: {
        fontSize: '15px',
        padding: '20px',
        textAlign: 'center',
      },
    }, 'Товары отсутствуют'));
  } else {
    // remove no goods message if exists
    document.querySelector('.no-goods')?.remove();

    // add goods
    tableBody.append(...rows);
  }
};

const renderGoodsTable = (dataBase) => {
  renderGoods(dataBase);
  renderGoodsIndex();
  renderTotalPricePage(dataBase);
};

export {
  createRow,
  renderGoodsIndex,
  renderGoods,
  renderGoodsTable,
};
