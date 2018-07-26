class AddNewList {
  constructor(event) {
    this.count = 0;
    this.inputList = [];
    const newListId = document.getElementById('Input-0');
    newListId.addEventListener('keyup', (e) => { this.addNewList(e); });
  }

  checkEmptySibling() {
    const classes = document.getElementsByClassName('newInputClass');
    for (const inside of classes) {
      if (inside.value.length < 1) {
        return false;
      }
    }
    return true;
  }

  addNewList(event, count) {
    if (event.keyCode === 13 && (document.activeElement.value.length > 0)) {
      this.count++;
      const generateInputId = `Input-${this.count}`;
      const generateListId = `List-${this.count}`;
      const generateCheckId = `Check-${this.count}`;
      const template = `
			<li id=${generateListId} class="newListClass dynLi input-group mb-3">
	  			<div class="input-group-prepend">
	  				<div class="input-group-text">
	  					<input type="checkbox" id=${generateCheckId} class="newInnerCheck" aria-label="Checkbox for following text input">
	  				</div>
	  			</div>
	  			<input type="text" name=${generateInputId} id=${generateInputId} class="newInputClass 
	  			form-control" placeholder="List item" aria-label="Text input with checkbox">
			</li>`;
      const dynDiv = document.createElement('div');
      dynDiv.innerHTML += template;
      document.getElementById('newListUl').appendChild(dynDiv);
      document.getElementById(`${generateListId}`).addEventListener('keyup', (e) => { this.addNewList(e); });
      const nextList = document.getElementById(`${generateInputId}`);
      nextList.focus();
    }
  }
}

export default AddNewList;
