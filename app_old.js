function App(options) {
    var ctx = options.render_space.getContext('2d');

    var params = {
        width: options.width,
        height: options.height,
        setWidth: function (w) {
            options.render_space.setAttribute("width", w);
            this.width = w;
        },
        setHeight: function (h) {
            options.render_space.setAttribute("height", h);
            this.height = h;

        },

        qwerty: function () {
            console.log("rer")
        }
    }

    var world = {
        arr: [],
        see: function () {
            world.arr.forEach(function (item, i, arr) {
                ctx.fillStyle= 'rgba(255, 255, 255, 0.49)';
                ctx.strokeStyle = "#000000";
                ctx.fillRect(item.position.x, item.position.y, item.size, item.size);
                ctx.strokeRect(item.position.x, item.position.y, item.size, item.size)
            });


        },
        animate: function () {

            ctx.clearRect(0, 0, params.width, params.height);
            world.arr.forEach(function (item, i, arr) {
                  world.see();
                item.move();
                console.log(item);
                requestAnimationFrame(world.animate);

            })
        }
    }

    var add = {
        square: function (x, y, vx, vy, ax, ay, s, m) {
            world.arr.push(new Square({
                x: x,
                y: y
            }, {
                x: vx,
                y: vy
            }, {
                x: ax,
                y: ay
            }, s, m));



        }


    }

    init();

    function init() {
        params.setWidth(options.width);
        params.setHeight(options.height);
    }









    function Vector(x, y) {
        this.x = x || 0;
        this.y = y || 0;

    }
    Vector.prototype.add = function (vector) {
        this.x += vector.x;
        this.y += vector.y;
    }


    function Square(position, velocity, acceleration, size, mass) {
        this.position = new Vector(position.x, position.y);
        this.velocity = new Vector(velocity.x, velocity.y);
        this.acceleration = new Vector(acceleration.x, acceleration.y);
        this.size = size || 20;
        this.mass = mass || 100;

    }

    Square.prototype.move = function () {
        this.velocity.add(this.acceleration) ;
        this.position.add(this.velocity) ;
    }

    return {
        params: params,
        add: add,
        render: world.see,
        animate: world.animate,



    }
}

function cl(e) {
    console.log(e), console.info
}
