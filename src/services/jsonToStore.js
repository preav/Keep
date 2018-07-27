import { store } from './store';
import Cards from '../views/cards';

export default class JSONToStore {
  getDataFromJSON() {
    fetch('http://localhost:3000/collection')
      .then(resp => resp.json())
      .then((datum) => {
        store.dispatch({
          type: 'DEFAULT',
          data: datum,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
