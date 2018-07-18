require('./scss/index.scss');
import GetNotes from './services';
import AddNewList from './controller';

var notes = new GetNotes();
notes.getNotes("http://localhost:3000/collection");

new AddNewList();

// function convertToJSON(){
// 	var liElement = document.getElementsByClassName('newListClass');
// 	//console.log(liElement);
// 	for (var lists of liElement){
// 		var inputList = lists.innerHTML;
// 		//console.log(inputList.value);
// 	}
// }

function writeToJSON(event){
	event.preventDefault();
	submitToJSON();
}

function submitToJSON() {
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "http://localhost:3000/collection", true);
	xhttp.setRequestHeader("Content-type", "application/json");
	var stringData = {"id": "1", "title": "Welcome", "lists":[{list:[{"listValue": "Welcome 1", "isChecked": false},{"listValue": "Welcome 1", "isChecked": true}]}]};
	var jsoning = JSON.stringify(stringData);
	xhttp.send(jsoning);
}
