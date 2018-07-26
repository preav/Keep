import SubmitToJSON from './submitToJSON';

class ConvertToJSON {
  constructor(stringObj) {
    this.stringObj = stringObj;
  }

  convertToJSON() {
    return JSON.stringify(this.stringObj);
  }
}

export default ConvertToJSON;
