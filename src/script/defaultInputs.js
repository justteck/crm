import {modalForm} from './htmlElements';
import {el} from 'redom';

// Config inputs by default
export const modalConfigFields = () => {
  const elements = modalForm.firstElementChild.elements; // form elements

  for (const element of elements) { // set required elements
    if (element.type !== 'checkbox' && element.type !== 'file') {
      element.required = true;
    }
  }

  // set input type
  elements.discount.type = 'number';
  elements.count.type = 'number';
  elements.price.type = 'number';

  // create categories datalist
  const categories = el('datalist', {
    id: 'category-list',
  });
  document.querySelector('.modal__label_category').
    insertAdjacentElement('afterend', categories);
};
