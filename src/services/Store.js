import { createStore } from 'Redux';
class Store{

	fetchData() {
		fetch("http://localhost:3000/collection")
      	.then(resp => resp.json())
      	.then((datum) => {
      		createStore()
      	})
      	.catch((error) => {
        	console.log(error);
      	});
	}
}

export default Store;