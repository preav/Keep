const Sortable = require('../../node_modules/sortablejs');

class GetNotesFromJSON{	

	displayListChild(listElement) {
	var ul = document.createElement("ul");
	ul.className +="list-group ";
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
			self.displayOnScreen(datum);
		})
		.catch(function( error ) {
			console.log(error);
		})
	}

	displayOnScreen(datum){
		if(datum.length>0){
			for (var data of datum){
				var sectionDiv = document.createElement("section");
				sectionDiv.className +="card col-xs-12 col-sm-6 col-md-4 col-lg-3 ";
				var headerDiv = document.createElement("h2");
				headerDiv.className +="card-title";
				var titleDiv = document.createTextNode(data.title);
				headerDiv.appendChild(titleDiv);
				sectionDiv.appendChild(headerDiv);
				sectionDiv.appendChild(this.displayListChild(data.list));
				document.getElementById("mainCard").appendChild(sectionDiv);
			}
			this.callSortable();
		}
	}
}

export default GetNotesFromJSON;