class AddNewList{

	constructor(event){
		this.count = 0;
		this.inputList = [];
		var newListId = document.getElementById("Input-0");
		newListId.addEventListener('keyup', (e) => { this.addNewList(e) });
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
		if (event.keyCode === 13 && (document.activeElement.value.length>0)){
			this.count++;
			var generateInputId = "Input-"+this.count;
			var generateListId = "List-"+this.count;
			var generateCheckId = "Check-"+this.count;
			var template = `
			<li name=${generateListId} id=${generateListId} class="newListClass dynLi input-group mb-3">
	  			<div class="input-group-prepend">
	  				<div class="input-group-text">
	  					<input type="checkbox" id=${generateCheckId} class="newInnerCheck" aria-label="Checkbox for following text input">
	  				</div>
	  			</div>
	  			<input type="text" name=${generateInputId} id=${generateInputId} class="newInputClass 
	  			form-control" placeholder="List item" aria-label="Text input with checkbox">
			</li>`
			var dynDiv = document.createElement('div')
			dynDiv.innerHTML += template; 
			document.getElementById("newListUl").appendChild(dynDiv)
			document.getElementById(`${generateListId}`).addEventListener('keyup', (e) => {this.addNewList(e)});
			var nextList = document.getElementById(`${generateInputId}`);
			nextList.focus();
		}
	}
}

export default AddNewList;