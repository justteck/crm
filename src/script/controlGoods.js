import {tableBody} from './htmlElements';

import {
  renderTotalPricePage,
} from './totalPrice';

import {
  renderGoodsIndex,
  createRow,
} from './renderGoods';

import {getGoods} from './getGoods';

import {fetchRequest} from './fetchRequest';

// Add goods
const addGoods = async goods => {
  const showUploadResult = (err, data) => {
    if (err) {
      console.warn(err, data);
      console.log('Upload failed');
      return;
    }
    console.log('Uploaded', data);
  };

  // add to DB
  await fetchRequest('https://skitter-spectrum-bath.glitch.me/api/goods', {
    method: 'post',
    callback: showUploadResult,
    body: {
      title: goods.title,
      description: goods.description,
      units: goods.units,
      count: goods.count,
      price: goods.price,
      discount: goods.discount,
      category: goods.category,
      image: goods.image,
    },
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  // add to the page
  tableBody.append(createRow(goods));
};

// Delete goods
const deleteGoods = () => {
  tableBody.addEventListener('click', async e => {
    const target = e.target;

    // current DB state
    const dataBase = await getGoods('https://skitter-spectrum-bath.glitch.me/api/goods');

    if (target.matches('.table__btn_del')) {
      const currentGoods = target.closest('tr');
      const goodsId = +currentGoods.
        querySelector('.table__cell-id').
        parentElement.dataset.id;

      const goodsIndexInDB = dataBase.findIndex(goods => +goods.id === goodsId);

      if (goodsIndexInDB >= 0) { // if exists in DB
        // delete from DB
        fetchRequest(`https://skitter-spectrum-bath.glitch.me/api/goods/${goodsId}`, {
          method: 'delete',
        });
      }

      // render
      currentGoods.remove();
      renderGoodsIndex();
      renderTotalPricePage(await getGoods('https://skitter-spectrum-bath.glitch.me/api/goods'));
    }
  });
};

// show goods photo
const showGoodsPhoto = (picWidth, picHeight) => {
  tableBody.addEventListener('click', e => {
    const target = e.target;

    if (target.matches('.table__btn_pic')) {
      const picLink = target.dataset.pic;

      const left = (screen.width / 2) - (picWidth / 2);
      const top = (screen.height / 2) - (picHeight / 2);

      const params = `
        width=${picWidth},
        height=${picHeight},
        left=${left},
        top=${top}`;

      open(picLink, 'photo', params);
    }
  });
};

export {
  addGoods,
  deleteGoods,
  showGoodsPhoto,
};
