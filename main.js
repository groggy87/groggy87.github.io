"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
let shape;
let pin = false;
let sources = document.querySelectorAll("div");
let dropzone = document.getElementById("fridge");
let click = rxjs_1.Observable.fromEvent(sources, "click");
let drop = rxjs_1.Observable.fromEvent(dropzone, "click").subscribe();
let subscription = click.subscribe(function (e) {
    //console.log(e.target);
    let element = e.target;
    let id = element.getAttribute("id");
    shape = document.getElementById(id);
});
function onNext(value) {
    shape.style.left = value.x + 20 + "px";
    shape.style.top = value.y + 20 + "px";
}
function dropShape(value) {
    console.log(value);
}
function moveShape() {
    return rxjs_1.Observable.fromEvent(document, "mousemove")
        .map((e) => {
        return {
            x: e.clientX,
            y: e.clientY
        };
    })
        .delay(200);
}
click.flatMap(e => moveShape())
    .subscribe(onNext, e => console.log(`error: ${e}`), () => console.log("click"));
//# sourceMappingURL=main.js.map