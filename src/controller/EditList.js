class EditList{
	
	editList(e){
		console.log("inside edit");
	}

}

export default EditList;

	
	// edit(){
	// 	var editLists = document.querySelectorAll('.editList');
	// 	for (var edit of editLists) {
	// 		edit.addEventListener('click', (e) => {
	// 			this.editModal(e);
	// 		})
	// 	}
	// }

	//editModal(e) {
		//console.log(e);
		//console.log(e.target);
		//console.log(e);
		// $('#exampleModalCenter').modal('show');
		// $('#exampleModalCenter').on('shown.bs.modal', function(e) {
		// 	//$('#newTitle').val(titleValue);
		// 	console.log(e);
		// 	//.parentElement.parentElement.parentElement.childNodes[1].childNodes
		// 	// for(var childs of e.target){
		// 	// 	console.log(childs.innerText);
		// 	// }
		// });
	//}
		// var elem = e.target.parentElement.parentElement;
		// var titleValue = elem.querySelector('.headerDiv').innerText;
		// $('#exampleModalCenter').on('show.bs.modal', function(e) {
		// 	$('#newTitle').val(titleValue);
		// 	//console.log("hey");
		// });

		// $('#exampleModalCenter').on('hide.bs.modal', function (e) {
		//   $('#newTitle').val('');
		//   $('input').val('');
		//   $('.newInnerCheck').prop('checked', false);
		// });