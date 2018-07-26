require('./scss/index.scss');
import ConvertToJSON from './services/convertToJSON';
import SubmitToJSON from './services/submitToJSON';
import Modal from './controller/modal';
import { store } from './services/store';
import JSONToStore from './services/jsonToStore'
import Cards from './views/cards';

new Modal();
new JSONToStore().getDataFromJSON();

var cards = new Cards();
store.subscribe(cards.populateCards);
