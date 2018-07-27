import { store } from '../services/store';

class RemoveCard {
  removeList(e) {
    const arr = e.target.parentNode.parentNode.parentNode.parentNode;
    arr.style.display = 'none';
    const i = arr.id.indexOf('-');
    const id = arr.id.substr(i + 1);
    store.dispatch({
      type: 'DELETE',
      data: parseInt(id),
    });
    this.deleteFromJSON(arr, id);
  }

  deleteFromJSON(arr, id) {
    const url = 'http://localhost:3000/collection';
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', `${url}/${id}`, true);
    xhr.onload = function () {
      const result = JSON.parse(xhr.responseText);
      if (xhr.readyState == 4 && xhr.status == '200') {
        // console.info(result);
      } else {
        console.error(result);
      }
    };
    xhr.send(null);
  }
}
export default RemoveCard;
