class ConvertToJSON{
	constructor(stringObj){
		this.stringObj = stringObj;
	}

	convertToJSON() {
		var strJSON = JSON.stringify(this.stringObj);
		this.submitToJSON(strJSON);
	}

	submitToJSON(strJSON) {
		var xhttp = new XMLHttpRequest();
		xhttp.open("POST", "http://localhost:3000/collection", true);
		xhttp.setRequestHeader("Content-type", "application/json");
		xhttp.send(strJSON);
	}
}

export default ConvertToJSON;