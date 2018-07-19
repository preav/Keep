const Sortable = require('../../node_modules/sortablejs');

class GetNotesFromJSON{
	
	edit(){
		var editLists = document.querySelectorAll('.editList');
		for (var edit of editLists) {
			edit.addEventListener('click', (e) => {
			this.editModal(e);
			})
		}
	}

	editModal(e) {
		$('#exampleModalCenter').modal('show');
		// var elem = e.target.parentElement.parentElement;
		// var titleValue = elem.querySelector('.headerDiv').innerText;
		// $('#exampleModalCenter').on('show.bs.modal', function(e) {
		// 	$('#newTitle').val(titleValue);
		// 	//console.log("hey");
		// });

		// $('#exampleModalCenter').on('hide.bs.modal', function (e) {
		//   $('#newTitle').val('');
		//   $('input').val('');
		//   $('.newInnerCheck').prop('checked', false);
		// });
	}

	displayListChild(listElement) {
	var ul = document.createElement("ul");
	ul.className +="card-text list-group ";
	ul.className +="list-group-flush ";
	ul.setAttribute('id', 'cardUl');
	for (let listItem of listElement){
		var li = document.createElement("li");
		li.className += "list-group-item";
		var input = document.createElement('input');
		input.setAttribute("type", "checkbox");
		if (listItem.isChecked) {
			input.checked = true;
		}
		input.name = listItem.listValue;
		li.appendChild(input);
		li.appendChild(document.createTextNode(listItem.listValue));
		ul.appendChild(li);
	}
		return ul;
	}


	callSortable() {
		var cardUl = document.getElementById('cardUl');
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
				self.displayOnScreen(data);
			}
			self.edit();
		})
		.catch(function( error ) {
			console.log(error);
		})
	}

	displayOnScreen(data){
		var sectionDiv = document.createElement("section");
		sectionDiv.className +="card ";
		var cardBody = document.createElement("div");
		cardBody.className += "card-body ";
		var headerContainer = document.createElement("div");
		headerContainer.className += "d-flex headerContainer justify-content-between ";
		var headerDiv = document.createElement("h2");
		headerDiv.className += "card-title headerDiv ";
		var editFont = document.createElement("i");
		var titleDiv = document.createTextNode(data.title);
		headerDiv.appendChild(titleDiv);
		editFont.className += "far fa-edit editList ";
		headerContainer.appendChild(headerDiv);
		headerContainer.appendChild(editFont);
		cardBody.appendChild(headerContainer);
		cardBody.appendChild(this.displayListChild(data.list));
		var para = document.createElement("p");
		para.className += "card-text";
		var smallPara = document.createElement("small");
		smallPara.className += "text-muted";
		var footer = document.createTextNode("Last modified: "+data.lastModified);
		smallPara.appendChild(footer);
		para.appendChild(smallPara);
		cardBody.appendChild(para);
		sectionDiv.appendChild(cardBody);
		document.getElementById("mainCard").appendChild(sectionDiv);
		this.callSortable();
		//this.edit();
	}
}

export default GetNotesFromJSON;