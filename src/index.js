require('./scss/index.scss');
import AddNewList from './controller';
import ConvertToJSON from './services/ConvertToJSON';
import getNotesFromJSON from './services';
import EditList from './controller/EditList';

$('#exampleModalCenter').on('shown.bs.modal', function () {
	$('#newTitle').trigger('focus');
});

$('#exampleModalCenter').on('hidden.bs.modal', function (e) {
  $('.newInputClass').val('');
  $('#newTitle').val('');
  $('.newInnerCheck').prop('checked', false);
  $('.dynLi').remove();
});

window.onload = function() {
	fetch("http://localhost:3000/collection")
		.then((resp) =>
			resp.json())
		.then(function (datum){ 
			window.count = datum.length === 0 ? 0 : datum.length;
		})
		.catch(function( error ) {
			console.log(error);
		})
}

window.onload = displayListOnBoard();

document.getElementById("btnAddNewList").addEventListener('click', modalOpened);
document.getElementById("btnSaveNewList").addEventListener('click', modalClosing);
document.getElementById("btnDismissNewList").addEventListener('click', modalDismiss);
//window.listCounter = -1;

function modalOpened(event) {
	//listCounter++;
	new AddNewList(event);
}

function modalDismiss() {
	//listCounter--;
}

function modalClosing() {
	var newCardObject = {};
	var newListarray = [];
	var getElement = document.getElementById('newTitle').value;
	newCardObject["title"] = getElement;
	var getAllListIds = document.getElementsByClassName('newListClass');
	for (var getListId of getAllListIds){
		getListValue(getListId.children[0].children[0].children[0], getListId.children[1], newListarray);
	}
	newCardObject["list"] = newListarray;
	newCardObject["lastModified"] = getLastModifiedTime();
	if( newCardObject["title"].length > 0 || (newListarray.length > 0) && checkListArrayValue(newListarray)){
		new ConvertToJSON(newCardObject).convertToJSON();
	}
	var notes = new getNotesFromJSON();
	notes.displayOnScreen(newCardObject);
}

function getListValue(elementCheck, elementInput, newListarray) {
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
	var notes = new getNotesFromJSON();
	notes.getNotesFromJSON("http://localhost:3000/collection");
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

function editList(x) {
	var classname = document.getElementsByClassName("edit");

	//get list of all the edits and add event listener to them
	// inside that event listener, make the modal open up with values from the event that clicked it
}

