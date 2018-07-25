import { createStore } from 'Redux';
import { ReducerMain } from '../controller/reducer';

const initialState = [{
      "archived": false,
      "deleted": false,
      "editable": false,
      "title": "",
      "list": [],
      "lastModified": "",
    }];

export const store = createStore(ReducerMain, initialState);

console.log(store.getState());