'use strict';

require('./style.css');

const blockA  = document.querySelector('.block-var-a')
const blockB  = document.querySelector('.block-var-b')

function scrollIndicator(el) {
  let winScroll = el.scrollTop || el.scrollTop;
  let height = el.scrollHeight - el.clientHeight;
  let scrolled = (winScroll / height) * 100;
  document.querySelector('.scroll-indicator-status').style.width = scrolled + "%";
}

function randomAnimation(el) {

    let prefix = 'slide-in-text-'

    // Im lazy to write more
	let classes = ['top']
    let pick = Math.floor(Math.random() * classes.length)
    let clName = prefix + classes[pick]

    for (let i = 0; i < classes.length; i++) {
    	let cl = prefix + classes[i]
    	if (clName !== cl) el.classList.remove(cl)
    }

    el.classList.add(clName)

}

function fetchData(src, onload) {

	let route = src.substr(0, src.length - 5)
	history.pushState(src, '', route === 'index' ? './' : route)

    fetch('pages/' + src).then((resp) => resp.text()).then((data) => {
    	
    	const page = document.querySelector('.fetch-wrap')
    	page.innerHTML = data
     	const fetched = document.querySelector('.index')   	

		if (!onload) {
			fetched.classList.remove('intro-anim-dl')
		    randomAnimation(fetched)
		}    	

    })
} 

function colHover(e) {
	if (e.type == 'mouseenter')
		this.children[0].classList.add('col-icon-hover')
	if (e.type == 'mouseleave')
		this.children[0].classList.remove('col-icon-hover')		
}

function navigate(ev) {

	ev.stopImmediatePropagation()
	ev.stopPropagation()
	ev.preventDefault()

	let stateChange = ev.type == 'popstate' ? ev.state : null;

	if (ev.target.nodeName == 'h1' || ev.path.length === 8 || ev.path.length === 7 || stateChange) {

		const id = !stateChange ? (ev.target.hasAttribute('id') ? ev.target.getAttribute('id') : ev.path[1].getAttribute('id')) : null;
		const highlight = document.querySelector('.highliter')

	    let highlightLocation = highlight.dataset.position

		switch(true) {
			case (highlightLocation == 1):
				if(id === 'sec' || stateChange == 'about.html') {
	                highlight.dataset.position = 2
	                highlight.style.transform = 'translateY(15vh)'
				} else if (id === 'thr' || stateChange == 'skills.html') {
					highlight.dataset.position = 3
	                highlight.style.transform = 'translateY(30vh)'					
				}
				break;
			case (highlightLocation == 2):		
				if(id === 'first' || stateChange == 'index.html') {
	                highlight.dataset.position = 1
					highlight.style.transform = 'translateY(0vh)'                
				} else if (id === 'thr' || stateChange == 'skills.html') {
					highlight.dataset.position = 3
					highlight.style.transform = 'translateY(30vh)'				
				}
				break;	
			case (highlightLocation == 3):		
				if(id === 'first' || stateChange == 'index.html') {
	                highlight.dataset.position = 1
					highlight.style.transform = 'translateY(0vh)'	                
				} else if (id === 'sec' || stateChange == 'about.html') {
					highlight.dataset.position = 2
				    highlight.style.transform = 'translateY(15vh)'
				}
				break;							
		}

		let location = window.location.pathname

		if(stateChange)
			fetchData(stateChange)
		if(id == 'first')
			fetchData('index.html')
		if(id == 'sec')
			fetchData('about.html')		
		if(id == 'thr')
			fetchData('skills.html')
	}

}

window.onload = () => {

	setTimeout( () => {
	    blockB.classList.remove('block-b-intro-move-right')
	    blockB.classList.add('block-b-intro-move-right-fix-right')	
	    blockA.classList.remove('block-a-intro-open-left')
	    blockA.classList.add('block-a-intro-move-left-fix-left')	    
	}, 1600)

	const navColumn = document.querySelectorAll('.sidebar-column')

	fetchData('index.html', true)

	navColumn.forEach( (el, i, self) => { 
		el.addEventListener('click', navigate, true)	
		el.addEventListener('mouseenter', colHover)
		el.addEventListener('mouseleave', colHover)		

	 })
}

document.querySelector('.fetch-wrap').onscroll = function() { scrollIndicator(this) };

window.addEventListener('popstate', (e) => { navigate(e) })