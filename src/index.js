require('./scss/index.scss');
const jsonData = require ('../data.json');

function displayLists()
{
	for(let jsonChild of  jsonData){
		var section = document.createElement("section");
		section.className +="card shadow-sm col-xs-12 col-sm-6 col-md-4 col-lg-3 ";
		var header = document.createElement("h2");
		var title = document.createTextNode(jsonChild.title);
		header.appendChild(title);
		header.className +="card-title";
		section.appendChild(header);
		for (let list of jsonChild.lists){
			section.appendChild(displayListChild(list.list));
		}
		document.getElementById("mainCard").appendChild(section);
	}
}

function displayListChild(listElement){
	var ul = document.createElement("ul");
	ul.className +="list-group ";
	ul.className +="list-group-flush ";
	for (let listItem of listElement){
		//console.log(listItem);
		li = document.createElement("li");
		li.className += "list-group-item";
	//li.id = listItem.id;
		var input = document.createElement('input');
		input.setAttribute("type", "checkbox");
		if (listItem.isChecked) {
			input.checked = true;
		};
		input.name = listItem.listValue;
		li.appendChild(input);
		li.append(document.createTextNode(listItem.listValue));
		ul.append(li);
	}
	return ul;
}

displayLists();