import {tableBody} from './htmlElements.js';

// Create ROW
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
        <button class="table__btn table__btn_pic" 
        data-pic="/img/test-pic.jpg"></button>
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
  tableBody.append(...rows);
};

export {
  createRow,
  renderGoodsIndex,
  renderGoods,
};
