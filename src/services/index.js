const Sortable = require('../../node_modules/sortablejs');

class GetNotes{	
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

	getNotes(url) {
		var self = this;		
		fetch(url)
		.then((resp) =>
			resp.json())
		.then(function (datum){
			for (var data of datum){
				var section = document.createElement("section");
				section.className +="card col-xs-12 col-sm-6 col-md-4 col-lg-3 ";
				var header = document.createElement("h2");
				var title = document.createTextNode(data.title);
				header.appendChild(title);
				header.className +="card-title";
				section.appendChild(header);
				for (let list of data.lists){
					section.appendChild(self.displayListChild(list.list));
				}
				document.getElementById("mainCard").appendChild(section);
			}
			self.callSortable();
		})
		.catch(function( error ) {
			console.log(error);
		})
	}
}

export default GetNotes;