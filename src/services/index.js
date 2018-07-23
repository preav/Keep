import ConvertToJSON from './ConvertToJSON';
//import getNotesFromJSON from './services';
const Sortable = require('../../node_modules/sortablejs');

class GetNotesFromJSON{

	callSortable(val) {
		var cardUl = document.getElementById(val);
		var mainCard = document.getElementById('mainCard');
		Sortable.create(cardUl);
		Sortable.create(mainCard);
	}

	getNotesFromJSON(url) {
		var self = this;		
		fetch(url)
		.then((resp) =>
			resp.json())
		.then(function (datum){ 
			for (var data of datum){
				self.displayOnScreen(data, data.length);
			}
		})
		.catch(function( error ) {
			console.log(error);
		})
	}

	saveChanges(e) {
		var newCardObject = {};
		var newListarray = [];
		var card = e.target.parentNode.parentNode.childNodes;
		var header = card[1];
		header.childNodes[1].style.border = 'none';
		newCardObject["title"] = header.childNodes[1].innerText;
		for (var liItem of card[3].childNodes){
			if (liItem.value === 0){
				this.getListValue(liItem.childNodes[1], liItem.childNodes[3],newListarray);
				liItem.style.border = 'none';
			}
		}
		newCardObject["list"] = newListarray;
		newCardObject["lastModified"] = this.getLastModifiedTime();
		if( newCardObject["title"].length > 0 || (newListarray.length > 0) && checkListArrayValue(newListarray)){
			new ConvertToJSON(newCardObject).convertToJSON();
		}
		e.target.style.visibility = "hidden";
	}

	getListValue(elementCheck, elementInput, newListarray) {
		var singleListObj = {};
		singleListObj["listValue"] = elementInput.innerText;
		singleListObj["isChecked"] = elementCheck.checked ? true : false;
		newListarray.push(singleListObj);
	}

	getLastModifiedTime() {
	var currentdate = new Date(); 
	var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
   return datetime;
	}

	editList(e){
		var arr = [...e.target.parentNode.parentNode.parentNode.childNodes];
		var header = arr[1].childNodes[1];
		var allLIs = arr[3].childNodes;
		var innerInput = [];
		for (var inner of allLIs){
			if (inner.value === 0){
				inner.childNodes[1].removeAttribute("onclick");
				inner.childNodes[3].contentEditable = true;
				inner.style.border = '1px solid red';
			}
		}
		header.contentEditable = true;
		header.style.border = '1px solid red';
		header.focus();
		arr[5].childNodes[3].style.visibility = "visible"
	}

	removeList(e) {
		var arr = e.target.parentNode.parentNode.parentNode.parentNode;
		arr.style.display = "none";
	}

	displayOnScreen(data, count = 0){
		const markup = `
			<section class="card" id="cardUl-${count}">
				<div class="card-body">
					<div class="d-flex headerContainer justify-content-between">
						<h2 class="card-title headerDiv"> ${data.title} </h2>
						<div class="wrapperDiv">
							<i class="far fa-edit edit" id="edit-${count}"></i>
							<i class="far fa-trash-alt removeList"></i>
						</div>
					</div>
					<ul class="card-text list-group list-group-flush">
						${data.list.map(datum => 
							`<li class="list-group-item"> 
								<input type="checkbox" ${datum.isChecked? 'checked' : 'unchecked'} onclick="return false">
								<div class="innerDiv"> ${datum.listValue} </div>
							</li>`).join('')}
					</ul>
					<p class="card-text">
						<small class="text-muted"> Last modified: ${data.lastModified} </small>
						<button type="button" class="btn btn-primary btn-sm saveEdit" aria-hidden="true"> Save </button>
					</p>
				</div>
			</section>`

		document.getElementById("mainCard").innerHTML += markup;
		var editLists = document.getElementsByClassName("edit");
		for (var edit of editLists){
			edit.addEventListener('click', this.editList);
		}
		var removeList = document.getElementsByClassName("removeList");
		for (var remove of removeList){
			remove.addEventListener('click', this.removeList);
		}
		var saveChanges = document.getElementsByClassName('saveEdit');
		for (var save of saveChanges){
			save.addEventListener('click', (e)=> this.saveChanges(e));
		}
		this.callSortable(`cardUl-${count}`);
	}
}
export default GetNotesFromJSON;