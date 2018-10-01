var swith = document.getElementById("swith");
var set = document.getElementById("set");
var start = document.getElementById("start");
var canvas = document.getElementById('canvas');


canvas.addEventListener('click', function (e) {
    mouse_add(e.layerX, e.layerY)
})

swith.addEventListener("click", showSet);
start.addEventListener("click", starter);


var space = new App({
    render_space: canvas,
    width: 1550,
    height: 1550
        /*    adpt_canvas: true,
            border_collision: true*/

})

console.log(space.params);



function mouse_add(x, y) {
    space.add.square(x, y, 0.1, 0.1, 0.01, 0.01, 20, 10)


}

function starter(){
     //space.animate()

};

function showSet() {
    set.classList.toggle("visible")

}
