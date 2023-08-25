const OFFSET = 0;
const LIMIT = 10;
const URL = `https://pokeapi.co/api/v2/pokemon/?offset=${OFFSET}&limit=${LIMIT}`;

fetch(URL)
.then((response) => response.json())
.then((responseBody) => console.log(responseBody))
.catch((error) => console.log(error));