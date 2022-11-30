import {dataBase} from './database.js';

import {tableBody} from './htmlElements.js';

import {
  renderTotalPricePage,
  countTotalPricePage,
} from './totalPrice.js';

import {
  renderGoodsIndex,
  createRow,
} from './renderGoods.js';

// Add goods
const addGoodsToDB = (goods) => {
  dataBase.push(goods);
};

const addGoods = (goods) => {
  addGoodsToDB(goods);
  tableBody.append(createRow(goods));

  // DB
  console.log('DB: ', dataBase);
};

// Delete goods
const deleteGoodsFromDB = (goodsIndexInDB) => {
  dataBase.splice(goodsIndexInDB, 1);
};

const deleteGoods = () => {
  tableBody.addEventListener('click', e => {
    const target = e.target;

    if (target.matches('.table__btn_del')) {
      const currentGoods = target.closest('tr');
      const goodsId = +currentGoods.
        querySelector('.table__cell-id').
        parentElement.dataset.id;

      const goodsIndexInDB = dataBase.findIndex(goods => goods.id === goodsId);

      if (goodsIndexInDB >= 0) {
        deleteGoodsFromDB(goodsIndexInDB);
      }

      currentGoods.remove();
      renderGoodsIndex();
      renderTotalPricePage(dataBase);

      // DB
      console.table('DB: ', dataBase);
    }
  });
};

export {
  addGoodsToDB,
  addGoods,
  deleteGoods,
};
