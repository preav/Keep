const $ = require('jquery');
require('../node_modules/popper.js');
require('../node_modules/bootstrap/dist/js/bootstrap.min.js');
require('./scss/index.scss');
import ConvertToJSON from './services/convertToJSON';
import SubmitToJSON from './services/submitToJSON';
import Modal from './controller/modal';
import { store } from './services/store';
import JSONToStore from './services/jsonToStore';
import Cards from './views/cards';

new Modal();
new JSONToStore().getDataFromJSON();

const cards = new Cards();
store.subscribe(cards.populateCards);