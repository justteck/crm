import {el} from 'redom';

// callback GET
const callbackGet = (err, data) => {
  if (err) {
    // remove error message if exists
    document.querySelector('.table-error')?.remove();

    // add error message
    document.querySelector('.goods__table-wrapper').append(el('div', {
      className: 'table-error',
      style: {
        color: 'red',
        fontSize: '15px',
        padding: '20px',
        textAlign: 'center',
      },
    }, 'Не удалось загрузить список товаров'));
  } else {
    console.log('GET OK');
    return data;
  }
};

const callbackPost = (err) => {
  // show modal error
  const showErrorModal = () => {
    document.querySelector('.overlay-error').classList.add('active');
  };

  if (err) {
    // remove error message if exists
    document.querySelector('.modal__error')?.remove();

    // add error message
    if (err.responseStatus === 404 ||
        err.responseStatus === 422 ||
        (err.responseStatus >= 500 && err.status < 600)) {
      // show error message
      const errorContainer = el('div', {
        className: 'modal__error',
        style: {
          color: 'red',
          fontSize: '15px',
          textAlign: 'right',
        },
      }, `${err.message}`);

      document.querySelector('.modal__footer').
        insertAdjacentElement('beforebegin', errorContainer);
      return false;
    } else {
      // show error window if response status is another
      showErrorModal();
      return false;
    }
  }

  return true;
};

export {
  callbackGet,
  callbackPost,
};
