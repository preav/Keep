class Cards {
  displayOnScreen(data, count = 0) {
    let markup = '';
    if (!data.archived) {
      markup = `
				<section class="card" id="cardUl-${data.id}">
					<div class="card-body">
						<div class="d-flex headerContainer justify-content-between">
							<h2 class="card-title headerDiv"> ${data.title} </h2>
							<div class="wrapperDiv">
								<i class="far fa-edit edit" id="edit-${count}"></i>
								<i class="far fa-trash-alt removeList"></i>
								<i class="fas fa-archive archiveList"></i>
							</div>
						</div>
						<ul class="card-text list-group list-group-flush">
							${data.list.map(datum => `<li class="list-group-item"> 
									<input type="checkbox" ${datum.isChecked ? 'checked' : 'unchecked'} onclick="return false">
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
    document.getElementById('mainCard').innerHTML += markup;
  }
}
export default Cards;
