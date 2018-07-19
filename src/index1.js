require('./scss/index.scss');
import GetNotes from './services';
import AddNewList from './controller';

var notes = new GetNotes();
notes.getNotes("http://localhost:3000/collection");

new AddNewList();