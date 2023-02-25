import {overlayDelete, tableBody} from './htmlElements';
import {
  renderTotalPricePage,
} from './totalPrice';
import {
  renderGoodsIndex,
  createRow,
} from './renderGoods';
import {getGoods} from './getGoods';
import {fetchRequest} from './fetchRequest';
import {apiURL} from '..';
import {
  callbackGet,
  callbackPost} from './fetchCallbacks';

// add goods
const addGoods = async goods => {
  // add to DB
  await fetchRequest(apiURL, {
    method: 'post',
    callback: callbackPost,
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


// delete goods
// modal confirm delete goods
const deleteGoods = (goods, id) => {
  const confirmDelete = async ({target}) => {
    // if clicked 'yes' in modal
    if (target.matches('.modal__submit_yes')) {
      overlayDelete.classList.remove('active'); // close modal

      // delete from DB
      await fetchRequest(`${apiURL}/${id}`, {
        method: 'delete',
      });

      goods.remove(); // remove from page
      renderGoodsIndex();
      renderTotalPricePage(await getGoods(apiURL, callbackGet));

      // if clicked 'no' / overlay
    } else if (target.matches('.modal__submit_no') ||
                target.matches('.overlay-delete')) {
      overlayDelete.classList.remove('active'); // close modal
    }

    overlayDelete.removeEventListener('click', confirmDelete);
  };

  overlayDelete.addEventListener('click', confirmDelete);
};

// select delete goods
const selectDeleteGoods = (target) => {
  const currentGoods = target.closest('tr'); // goods to delete
  const goodsId = currentGoods. // goods id
    querySelector('.table__cell-id').
    parentElement.dataset.id;

  // set goods title in modal
  const goodsTitle =
    currentGoods.querySelector('.table__cell_name').textContent;
  document.querySelector('.modal-delete__goods').textContent = goodsTitle;

  deleteGoods(currentGoods, goodsId);
};

// render delete confirmation
const renderDeleteModal = () => {
  tableBody.addEventListener('click', ({target}) => {
    if (target.matches('.table__btn_del')) { // if edit btn clicked
      overlayDelete.classList.add('active');
      selectDeleteGoods(target);
    }
  });
};


// edit goods
const editGoods = async goods => {
  // update goods in DB
  const editResult = await fetchRequest(`${apiURL}/${goods.id}`, {
    method: 'PATCH',
    callback: callbackPost,
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

  // return true or false
  return editResult;
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
  editGoods,
  showGoodsPhoto,
  renderDeleteModal,
};
