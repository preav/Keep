class AddNewList{

	constructor(){
		this.count = 0;
		this.inputList = [];
		var newListId = document.getElementById("List-0");
		newListId.addEventListener('keypress', (e) => { this.addNewList(e) });
		this.btnAddNewList = document.getElementById('btnAddNewList');
		this.buttonClicked = false;
		btnAddNewList.addEventListener("click", (e) => {this.setInputValue(e, this.inputList)});
		var setUserInput = document.getElementById("newListUl");
		setUserInput.addEventListener('keypress', (e) => { this.setUserInput(e) });
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

	setUserInput(event){
		console.log(this.count);
		// this.inputList.push("Input-"+this.count);
		// obj["Input-"+this.count] = event.srcElement.value;
		// this.inputList.push(obj);
	}

	addNewList(event){
		// var obj = {};
		// if(((event.keyCode === 13) || (this.buttonClicked)) && (document.activeElement.value.length>0)){
		// 	console.log(this.buttonClicked);
		// 	//this.inputList.push("Input-"+this.count);
		// 	obj["Input-"+this.count] = event.srcElement.value;
		// 	this.inputList.push(obj);
		// }
		if (event.keyCode === 13 && (document.activeElement.value.length>0) && (this.checkEmptySibling())){
			this.count++;
			var generateInputId="Input-"+this.count;
			var generateListId="List-"+this.count;
			var newUl = document.getElementById("newListUl");
			newUl.className +="ulName ";
			var newLi = document.createElement("li");
			var newInput = document.createElement("input");
			newInput.setAttribute("type", "text");
			newInput.setAttribute("placeholder", "List item");
			newInput.setAttribute("id", generateInputId);
			newInput.className += "newInputClass ";
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

	setInputValue(event, inputElement) {
		var allInputs = document.getElementsByClassName("newInputClass");
		for(var elem of allInputs) {
			console.log(elem);
		}
	}
}

export default AddNewList;