import { createStore } from 'Redux';

const actionType = (state = {}, action) => {
  switch (action.type) {
    case 'EDIT':
      return 'EDIT';
    case 'DELETE':
      return 'DELETE';
    case 'ARCHIVE':
      return 'ARCHIVE';
    default:
      return state;
  }
};

// const store = createStore(actionType);
// console.log(store.getState);
