class ArchiveCard{
	archiveList(e) {
		const arr = e.target.parentNode.parentNode.parentNode.parentNode;
		arr.style.display = 'none';
	}
}

export default ArchiveCard;
