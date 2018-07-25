const Sortable = require('../../node_modules/sortablejs');

export default function callSortable(valUl) {
	const cardUl = document.getElementById(valUl);
	const mainCard = document.getElementById('mainCard');
	Sortable.create(cardUl);
	Sortable.create(mainCard);
}