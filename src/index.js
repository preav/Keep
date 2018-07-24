import AddNewList from './controller';
import ConvertToJSON from './services/ConvertToJSON';
import SubmitToJSON from './services/SubmitToJSON';
import getNotesFromJSON from './services';

require('./scss/index.scss');

$('#exampleModalCenter').on('hidden.bs.modal', (e) => {
  $('.newInputClass').val('');
  $('#newTitle').val('');
  $('.newInnerCheck').prop('checked', false);
  $('.dynLi').remove();
});

$('#exampleModalCenter').on('shown.bs.modal', () => {
  $('#newTitle').trigger('focus');
});

window.onload = displayListOnBoard();

document.getElementById('btnAddNewList').addEventListener('click', modalOpened);
document.getElementById('btnSaveNewList').addEventListener('click', modalClosing);

function modalOpened(event) {
  new AddNewList(event);
}

function modalClosing() {
  const newCardObject = {};
  const newListarray = [];
  const getElement = document.getElementById('newTitle').value;
  newCardObject.archived = false;
  newCardObject.title = getElement;
  const getAllListIds = document.getElementsByClassName('newListClass');
  for (const getListId of getAllListIds) {
    getListValue(getListId.children[0].children[0].children[0], getListId.children[1], newListarray);
  }
  newCardObject.list = newListarray;
  newCardObject.lastModified = getLastModifiedTime();
  if (newCardObject.title.length > 0 || (newListarray.length > 0) && checkListArrayValue(newListarray)) {
    const toJSON = new ConvertToJSON(newCardObject).convertToJSON();
    new SubmitToJSON().submitToJSON(toJSON);
  }
  const notes = new getNotesFromJSON();
  notes.displayOnScreen(newCardObject);
}

function getListValue(elementCheck, elementInput, newListarray) {
  const singleListObj = {};
  singleListObj.listValue = elementInput.value;
  singleListObj.isChecked = !!elementCheck.checked;
  newListarray.push(singleListObj);
}

function getLastModifiedTime() {
  const currentdate = new Date();
  const datetime = `${currentdate.getDate()}/${
    currentdate.getMonth() + 1}/${
    currentdate.getFullYear()} ${
    currentdate.getHours()}:${
    currentdate.getMinutes()}:${
    currentdate.getSeconds()}`;
  return datetime;
}

function displayListOnBoard() {
  const notes = new getNotesFromJSON();
  notes.getNotesFromJSON('http://localhost:3000/collection');
}

function checkListArrayValue(array) {
  let val = false;
  for (const arr of array) {
    if (arr.listValue.length > 0) {
      val = true;
    }
  }
  return val;
}
