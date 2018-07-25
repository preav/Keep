

class SubmitToJSON {
 	submitToJSON(strJSON) {
    const xhttp = new XMLHttpRequest();
    xhttp.open('POST', 'http://localhost:3000/collection', true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.send(strJSON);
  }
}


export default SubmitToJSON;
