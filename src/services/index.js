import ConvertToJSON from './ConvertToJSON';
import Cards from '../views/Cards';

const Sortable = require('../../node_modules/sortablejs');

class GetNotesFromJSON {
  callSortable(valUl) {
    const cardUl = document.getElementById(valUl);
    const mainCard = document.getElementById('mainCard');
    Sortable.create(cardUl);
    Sortable.create(mainCard);
  }

  getNotesFromJSON(url) {
    const cards = new Cards();
    const self = this;
    fetch(url)
      .then(resp => resp.json())
      .then((datum) => {
        for (const data of datum) {
          cards.displayOnScreen(data, data.length);
          self.addListeners(data.id);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  saveChanges(e) {
    const arr = e.target.parentNode.parentNode.parentNode;
    const i = arr.id.indexOf('-');
    const id = arr.id.substr(i + 1);
    const newCardObject = {};
    const newListarray = [];
    const card = e.target.parentNode.parentNode.childNodes;
    const header = card[1];
    header.childNodes[1].style.border = 'none';
    newCardObject.title = header.childNodes[1].innerText;
    for (const liItem of card[3].childNodes) {
      if (liItem.value === 0) {
        this.getListValue(liItem.childNodes[1], liItem.childNodes[3], newListarray);
        liItem.style.border = 'none';
      }
    }
    newCardObject.list = newListarray;
    const dateValue = this.getLastModifiedTime();
    newCardObject.lastModified = dateValue;
    const lastModifiedPara = e.target.parentNode.parentNode.childNodes[5];
    lastModifiedPara.childNodes[1].innerText = ` Last modified: ${dateValue}`;
    const formData = JSON.stringify(newCardObject);
    const xhr = new XMLHttpRequest();
    xhr.open('PATCH', `http://localhost:3000/collection/${id}`);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => { });
    xhr.send(formData);
    e.target.style.visibility = 'hidden';
  }

  getListValue(elementCheck, elementInput, newListarray) {
    const singleListObj = {};
    singleListObj.listValue = elementInput.innerText;
    singleListObj.isChecked = !!elementCheck.checked;
    newListarray.push(singleListObj);
  }

  getLastModifiedTime() {
    const currentdate = new Date();
    const datetime = `${currentdate.getDate()}/${
      currentdate.getMonth() + 1}/${
      currentdate.getFullYear()} ${
      currentdate.getHours()}:${
      currentdate.getMinutes()}:${
      currentdate.getSeconds()}`;
	   return datetime;
  }

  editList(e) {
    const arr = [...e.target.parentNode.parentNode.parentNode.childNodes];
    const header = arr[1].childNodes[1];
    const allLIs = arr[3].childNodes;
    const innerInput = [];
    for (const inner of allLIs) {
      if (inner.value === 0) {
        inner.childNodes[1].removeAttribute('onclick');
        inner.childNodes[3].contentEditable = true;
        inner.style.border = '1px solid #E7B7BD';
      }
    }
    header.contentEditable = true;
    header.style.border = '1px solid #E7B7BD';
    header.focus();
    arr[5].childNodes[3].style.visibility = 'visible';
  }

  removeList(e) {
    const arr = e.target.parentNode.parentNode.parentNode.parentNode;
    arr.style.display = 'none';
    const i = arr.id.indexOf('-');
    const id = arr.id.substr(i + 1);
    const url = 'http://localhost:3000/collection';
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', `${url}/${id}`, true);
    xhr.onload = function () {
      const result = JSON.parse(xhr.responseText);
      if (xhr.readyState == 4 && xhr.status == '200') {
        console.log(result);
      } else {
        console.error(result);
      }
    };
    xhr.send(null);
  }

  archiveList(e) {
    const arr = e.target.parentNode.parentNode.parentNode.parentNode;
    arr.style.display = 'none';
  }

  addListeners(id) {
    const editLists = document.getElementsByClassName('edit');
    for (const edit of editLists) {
      edit.addEventListener('click', this.editList);
    }
    const removeList = document.getElementsByClassName('removeList');
    for (const remove of removeList) {
      remove.addEventListener('click', this.removeList);
    }
    const archiveList = document.getElementsByClassName('archiveList');
    for (const archive of archiveList) {
      archive.addEventListener('click', this.archiveList);
    }
    const saveChanges = document.getElementsByClassName('saveEdit');
    for (const save of saveChanges) {
      save.addEventListener('click', e => this.saveChanges(e));
    }
    this.callSortable(`cardUl-${id}`);
  }
}
export default GetNotesFromJSON;
