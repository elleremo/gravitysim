let canvas = $('#canvas')[0];
let toggle_control = $('#toggle_control')[0];
let start = $('#start')[0];


canvas.addEventListener('click', function (e) {
    mouse_add(e.layerX, e.layerY)
})

toggle_control.addEventListener("click", toggleControl);
start.addEventListener("click", startSimulate);

let app = new Core(canvas);

app.initProperties({
    width: 500,
    height: 500,
    border_collide : false
})


let Part = {
    pos : {x : 5, y : 5},
    vel : {x : 5, y : 5},
    acc : {x : 1, y : 1},
    size : 20,
    mass : 20
}


function mouse_add(x, y) {
    let k = Object.create(Part);
    k.pos.x = x; k.pos.y = y;
    app.append(k);

}

function startSimulate(){
     app.simulate()

};

function toggleControl() {
    set.classList.toggle("visible")

}
