const $ = require('jquery');
require('../../node_modules/jquery-ui-1.12.1/jquery-ui.js');

class SortableCards {
  callSortable() {
    $( function() {
	    $( "#mainCard" ).sortable();
	    $( "#mainCard" ).disableSelection();
	    $( ".card-text" ).sortable();
	    $( ".card-text" ).disableSelection();
	} );
  }
}

export default SortableCards;
