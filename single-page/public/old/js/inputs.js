function chStr(str) {
	return ([undefined, null, ''].indexOf(str) === -1);
}

let pattern = new RegExp(/^[A-Za-z0-9]+$/, 'g');

function test(str, msg) {	
	if(chStr(str)) {
	   msg.style.display = 'none';
	   if(str.match(pattern)) {
		   console.log('validation passed');
	   }
	   else {
		   console.log('validation failed');
	   }
	} else {
       msg.innerHTML = 'Cannot be blank';
       msg.style.display = 'block';
	}
}

function checkFields(fields, cb) {
    let msg = document.querySelectorAll('.mes-failed'),
	    len = fields.length, i = 0, ar = [];
    	fields = (len !== 0) ? fields : [];
	for(; i < len; i++) {
		let f = fields[i], m = msg[i];
		if(f.className.match(/field/)) {
			ar.push(f);
		    if(typeof cb === 'function') {
		    	cb(f.value, m);
		    }			
		}
	}
}

let field = document.querySelector('.field');
let submit = document.querySelector('.sub');
let form = document.getElementsByTagName('form')[0];
let formEl = form.getElementsByTagName('input');


form.addEventListener('submit', function(e) {
	e.preventDefault();
	checkFields(formEl, test)
});