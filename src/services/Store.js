import { createStore } from 'Redux';
import { ReducerMain } from '../controller/reducer';

const initialState = [{
      "archived": false,
      "title": "",
      "list": [],
      "lastModified": "",
      "id": 0
    }];

export const store = createStore(ReducerMain, initialState);