import { store } from '../services/store';

class ArchiveCard {
  archiveList(e) {
    const arr = e.target.parentNode.parentNode.parentNode.parentNode;
    arr.style.display = 'none';
    const i = arr.id.indexOf('-');
    	const id = arr.id.substr(i + 1);
    store.dispatch({
      type: 'ARCHIVE',
      data: parseInt(id),
    });
    const newCardObject = {};
    newCardObject.archived = true;
    const formData = JSON.stringify(newCardObject);
    const xhr = new XMLHttpRequest();
	    xhr.open('PATCH', `http://localhost:3000/collection/${id}`);
	    xhr.setRequestHeader('Content-type', 'application/json');
	    xhr.responseType = 'json';
	    xhr.addEventListener('load', () => { });
	    xhr.send(formData);
	    e.target.style.visibility = 'hidden';
  }
}

export default ArchiveCard;
