require('./scss/index.scss');
import AddNewList from './controller';
import ConvertToJSON from './services/ConvertToJSON';
import GetNotes from './services';

window.onload = displayListOnBoard();

document.getElementById("btnAddNewList").addEventListener('click', modalOpened);
document.getElementById("btnSaveNewList").addEventListener('click', modalClosing);
document.getElementById("btnDismissNewList").addEventListener('click', modalDismiss);
window.listCounter = -1;
var newCardObject = {};
var newListarray = [];

function modalOpened() {
	listCounter++;
	new AddNewList();
}

function modalDismiss() {
	listCounter--;
}

function modalClosing() {
	getTitleValue();
	var getAllListIds = document.getElementsByClassName('newListClass');
	for (var getListId of getAllListIds){
		getListValue(getListId.children[0], getListId.children[1]);
	}
	newCardObject["list"] = newListarray;
	newCardObject["lastModified"] = getLastModifiedTime();
	if( newCardObject["title"].length > 0 || (newListarray.length > 0) && checkListArrayValue(newListarray)){
		new ConvertToJSON(newCardObject).convertToJSON();
	}
	displayListOnBoard();
}

function getTitleValue() {
	var getElement = document.getElementById('newTitle').value;
	newCardObject["title"] = getElement;
}


function getListValue(elementCheck, elementInput) {
	var singleListObj = {};
	singleListObj["listValue"] = elementInput.value;
	singleListObj["isChecked"] = elementCheck.checked ? true : false;
	newListarray.push(singleListObj);
}

function getLastModifiedTime() {
	var currentdate = new Date(); 
	var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
   return datetime;
}

function displayListOnBoard() {
	var notes = new GetNotes();
	notes.getNotes("http://localhost:3000/collection");
}

function checkListArrayValue(array) {
	var val = false;
	for (var arr of array) {
		if (arr.listValue.length > 0) {
			val = true;
		}
	}
	return val;
}
