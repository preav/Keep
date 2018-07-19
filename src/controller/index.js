class AddNewList{

	constructor(){
		this.count = 0;
		this.inputList = [];
		var newListId = document.getElementById("List-0");
		newListId.addEventListener('keypress', (e) => { this.addNewList(e) });
		this.btnAddNewList = document.getElementById('btnAddNewList');
	}

	checkEmptySibling(){
		var classes = document.getElementsByClassName("newInputClass");
		for (var inside of classes){
			if (inside.value.length < 1){
					return false;
				}
			}
		return true;
	}

	addNewList(event){
		if (event.keyCode === 13 && (document.activeElement.value.length>0) && (this.checkEmptySibling())){
			this.count++;
			var generateInputId="Input-"+this.count;
			var generateListId="List-"+this.count;
			var generateCheckId = "Check-"+this.count;
			var newUl = document.getElementById("newListUl");
			newUl.className +="ulName ";
			var newCheck = document.createElement("input");
			newCheck.setAttribute("type", "checkbox");
			newCheck.setAttribute("id", generateCheckId);
			newCheck.className += "newInnerCheck ";
			var newLi = document.createElement("li");
			var newInput = document.createElement("input");
			newInput.setAttribute("type", "text");
			newInput.setAttribute("placeholder", "List item");
			newInput.setAttribute("id", generateInputId);
			newInput.className += "newInputClass ";
			newLi.appendChild(newCheck);
			newLi.appendChild(newInput);
			newLi.setAttribute("id", generateListId);
			newLi.className += "newListClass";
			newUl.appendChild(newLi);
			newLi.addEventListener('keypress', (e) => {this.addNewList(e)});
		}
		if (event.keyCode === 13 && (document.activeElement.value.length > 0)){
			var nextList = document.getElementById("Input-"+this.count);
			nextList.focus();
		}
	}
}

export default AddNewList;