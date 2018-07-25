import { createStore } from 'Redux';
import { Operations } from '../controller/reducer';

const initialState = [{
      "archived": false,
      "deleted": false,
      "editable": false,
      "title": "",
      "list": [],
      "lastModified": "",
    }];

export const store = createStore(Operations, initialState);

console.log(store.getState());