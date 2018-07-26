class EditCard{
    editList(e) {
        const arr = [...e.target.parentNode.parentNode.parentNode.childNodes];
        const header = arr[1].childNodes[1];
        const allLIs = arr[3].childNodes;
        const innerInput = [];
        for (const inner of allLIs) {
          if (inner.value === 0) {
            inner.childNodes[1].removeAttribute('onclick');
            inner.childNodes[3].contentEditable = true;
            inner.style.border = '1px solid #E7B7BD';
          }
        }
        header.contentEditable = true;
        header.style.border = '1px solid #E7B7BD';
        header.focus();
        arr[5].childNodes[3].style.visibility = 'visible';
    }
}

export default EditCard;