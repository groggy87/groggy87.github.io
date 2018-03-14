import { Observable } from 'rxjs/Observable'; 

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/fromEvent';

let shape;
let pin: boolean = false;

let sources = document.querySelectorAll("div");
let dropzone = document.querySelectorAll(".dropzone");

let click = Observable.fromEvent(sources, "click");

let drop = Observable.fromEvent(dropzone, "click").subscribe();


let subscription  = click.subscribe(function (e: MouseEvent) {
	//console.log(e.target);
	let element = <Element>e.target;
	let id = element.getAttribute("id");
	shape = document.getElementById(id);
});


function onNext(value) {

	shape.style.left = value.x+10+"px";
	shape.style.top = value.y+10+"px";
}

function dropShape(value) {
	console.log(value);
}

function moveShape() {// only affects divs with position:absolute
	return Observable.fromEvent(document, "mousemove")
					.map((e: MouseEvent) => {
						return {
							x: e.clientX,
							y: e.clientY
						}
					})
					.delay(200);
}

click.flatMap(e => moveShape())
	.subscribe(
		onNext,
		e => console.log(`error: ${e}`), 
		() => console.log("click")
	);

