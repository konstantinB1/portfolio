let today = new Date();

function makeDate(day = today.getDay(), 
	              month = today.getMonth(), 
	              year = today.getFullYear()) {

	return new Date(year, month, day).toDateString();

}

console.log(makeDate());

let { a, b } = 1;

console.log( b );