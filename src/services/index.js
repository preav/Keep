const Sortable = require('../../node_modules/sortablejs');

class GetNotesFromJSON{

	callSortable(val) {
		var cardUl = document.getElementById(val);
		var mainCard = document.getElementById('mainCard');
		Sortable.create(cardUl);
		Sortable.create(mainCard);
	}

	getNotesFromJSON(url) {
		var self = this;		
		fetch(url)
		.then((resp) =>
			resp.json())
		.then(function (datum){ 
			for (var data of datum){
				self.displayOnScreen(data, count);
			}
		})
		.catch(function( error ) {
			console.log(error);
		})
	}

	populateModal(){
		console.log("event added")
	}

	displayOnScreen(data, count){
		const markup = `
			<section class="card" id="cardUl-${count}">
				<div class="card-body">
					<div class="d-flex headerContainer justify-content-between">
						<h2 class="card-title headerDiv"> ${data.title} </h2>
						<div class="wrapperDiv">
							<i class="far fa-edit edit" id="edit-${count}"></i>
							<i class="far fa-trash-alt removeList"></i>
						</div>
					</div>
					<ul class="card-text list-group list-group-flush">
						${data.list.map(datum => 
							`<li class="list-group-item"> 
								<input type="checkbox" ${datum.isChecked? 'checked' : 'unchecked'}>
								${datum.listValue}
							</li>`).join('')}
					</ul>
					<p class="card-text">
						<small class="text-muted"> Last modified: ${data.lastModified} </small>
					</p>
				</div>
			</section>`

		document.getElementById("mainCard").innerHTML += markup;
		this.callSortable(`cardUl-${count}`);
	}
}
export default GetNotesFromJSON;