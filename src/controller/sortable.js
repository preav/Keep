const Sortable = require('../../node_modules/sortablejs');

class SortableCards{
	callSortable() {
		const mainCard = document.getElementById('mainCard');
		Sortable.create(mainCard);
	}
}

export default SortableCards;