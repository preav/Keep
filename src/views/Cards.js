import { store } from '../services/store';
import EditCard from '../controller/EditCard';
import RemoveCard from '../controller/RemoveCard';
import ArchiveCard from '../controller/ArchiveCard';
import SaveCard from '../controller/SaveCard';

class Cards {
	populateCards(prevState, nextState) {
		let cardCol = document.getElementById('mainCard');
 		while (cardCol.hasChildNodes()) {
      		cardCol.removeChild(cardCol.childNodes[0]);
 		}
		let getData = store.getState();
		getData.map((data) => {
	    	let markup = '';
		    if (!data.archived) {
	      		markup = `
					<section class="card" id="cardUl-${data.id}">
						<div class="card-body">
							<div class="d-flex headerContainer justify-content-between">
								<h2 class="card-title headerDiv"> ${data.title} </h2>
								<div class="wrapperDiv">
									<i class="far fa-edit edit" id="edit-${data.id}"></i>
									<i class="far fa-trash-alt removeList"></i>
									<i class="fas fa-archive archiveList"></i>
								</div>
							</div>
							<ul class="card-text list-group list-group-flush">
								${data.list.map(datum => `<li class="list-group-item"> 
										<input type="checkbox" ${datum.isChecked ? 'checked' : 'unchecked'}>
										<div class="innerDiv"> ${datum.listValue} </div>
									</li>`).join('')}
							</ul>
							<p class="card-text">
								<small class="text-muted"> Last modified: ${data.lastModified} </small>
								<button type="button" class="btn btn-primary btn-sm saveEdit" aria-hidden="true"> Save </button>
							</p>
						</div>
					</section>`;
	    	}
    	return document.getElementById('mainCard').innerHTML += markup;
    	})
    	const editLists = document.getElementsByClassName('edit');
	    for (let edit of editLists) {
	      edit.addEventListener('click', e => new EditCard().editList(e));
	    }
	    const removeList = document.getElementsByClassName('removeList');
	    for (let remove of removeList) {
	      remove.addEventListener('click', e => new RemoveCard().removeList(e));
	    }
	    const archiveList = document.getElementsByClassName('archiveList');
	    for (let archive of archiveList) {
	      archive.addEventListener('click', (e) => new ArchiveCard().archiveList(e));
	    }
	    const saveChanges = document.getElementsByClassName('saveEdit');
	    for (let save of saveChanges) {
	      save.addEventListener('click', e => new SaveCard().saveChanges(e));
	    }
  	}
}
export default Cards;
