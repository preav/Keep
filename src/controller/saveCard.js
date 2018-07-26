class SaveCard{
  saveChanges(e) {
    const arr = e.target.parentNode.parentNode.parentNode;
    const i = arr.id.indexOf('-');
    const id = arr.id.substr(i + 1);
    const newCardObject = {};
    const newListarray = [];
    const card = e.target.parentNode.parentNode.childNodes;
    const header = card[1];
    header.childNodes[1].style.border = 'none';
    newCardObject.title = header.childNodes[1].innerText;
    for (const liItem of card[3].childNodes) {
      if (liItem.value === 0) {
        this.getListValue(liItem.childNodes[1], liItem.childNodes[3], newListarray);
        liItem.style.border = 'none';
      }
    }
    newCardObject.list = newListarray;
    const dateValue = this.getLastModifiedTime();
    newCardObject.lastModified = dateValue;
    const lastModifiedPara = e.target.parentNode.parentNode.childNodes[5];
    lastModifiedPara.childNodes[1].innerText = ` Last modified: ${dateValue}`;
    const formData = JSON.stringify(newCardObject);
    const xhr = new XMLHttpRequest();
    xhr.open('PATCH', `http://localhost:3000/collection/${id}`);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => { });
    xhr.send(formData);
    e.target.style.visibility = 'hidden';
  }

  getListValue(elementCheck, elementInput, newListarray) {
    const singleListObj = {};
    singleListObj.listValue = elementInput.innerText;
    singleListObj.isChecked = !!elementCheck.checked;
    newListarray.push(singleListObj);
  }

  getLastModifiedTime() {
    const currentdate = new Date();
    const datetime = `${currentdate.getDate()}/${
      currentdate.getMonth() + 1}/${
      currentdate.getFullYear()} ${
      currentdate.getHours()}:${
      currentdate.getMinutes()}:${
      currentdate.getSeconds()}`;
	   return datetime;
  }
}

export default SaveCard;