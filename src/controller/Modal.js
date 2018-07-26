import ResetModal from './resetModal';
import AddNewList from './';
import { store } from '../services/store';
import Cards from '../views/cards';
import ConvertToJSON from '../services/convertToJSON';
import SubmitToJSON from '../services/submitToJSON';

class Modal{
	constructor() {
		ResetModal();
		document.getElementById('btnAddNewList').addEventListener('click', this.modalOpened);
		document.getElementById('btnSaveNewList').addEventListener('click', () => this.modalClosing(this));
	}

	modalOpened(event) {
	  new AddNewList(event);
	}

	modalClosing(self) {
		const newCardObject = {};
		const newListarray = [];
		const getElement = document.getElementById('newTitle').value;
		newCardObject.archived = false;
		newCardObject.title = getElement;
		newCardObject.id = store.getState().length+1;
		const getAllListIds = document.getElementsByClassName('newListClass');
		for (const getListId of getAllListIds) { 
			let singleListObj = {};
			let elementInput = getListId.children[1];
			let elementCheck = getListId.children[0].children[0].children[0];
			singleListObj.listValue = elementInput.value;
			singleListObj.isChecked = !!elementCheck.checked;
			newListarray.push(singleListObj);
		}
		newCardObject.list = newListarray;
		newCardObject.lastModified = self.getLastModifiedTime();
		var jsonObj = new ConvertToJSON(newCardObject).convertToJSON();
		new SubmitToJSON().submitToJSON(jsonObj);
		store.dispatch({
			type: 'ADD',
			data: newCardObject
		})
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
}

export default Modal;