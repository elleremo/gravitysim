/* http://paperjs.org*/




class Core {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.ctx_width = $(window).width();
        this.ctx_height = $(window).height();
        this.border_collide = true;

        this.planets = {
            static_grav: [],
            kineamatic_grav: [],
            parts: [],
            count: function () {
                return this.kineamatic_grav.length + this.static_grav.length + this.parts.length
            }
        }
    }
    //---------------------------------

    get width() {
        return this.ctx_width
    }
    set width(new_val) {
        this.canvas.width = new_val;
        this.ctx_width = new_val;
        console.log("вызов width");
    }
    get height() {
        return this.ctx_height
    }
    set height(new_val) {
        this.canvas.height = new_val;
        this.ctx_height = new_val;
        console.log("вызов height");
    }

    //---------------------------------



    initProperties(options) {
        this.canvas.width = options.width || $(window).width();
        this.canvas.height = options.height || $(window).height();
        this.border_collide = options.border_collide;
    }

    render() {
        // Добавить метод рендера к самому объекту
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let item of this.planets.parts) {

            item.draw(this.ctx);

        }
    }

    simulate() {
        console.log("start sim");
        let ss = sim(this);
        ss();


        //        sim(this)


    }

    append(obj) {
        this.planets.parts.push(new Circle(obj.pos, obj.vel, obj.acc, obj.size, obj.mass));
        console.log("частиц " + this.planets.parts.length);


        /*==============СДЕЛАТЬ кол частиц по типу в классе типа=============*/

        this.render()
    }
}

function sim(obj) {
    let count = 0;
    let time;

    function iner() {

        requestAnimationFrame(iner);

        let now = new Date().getTime(),
            dt = now - (time || now);
        time = now;


        //        console.info(dt);
        //--------------------------------------------
        obj.ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let item of obj.planets.parts) {
            item.move(obj.planets.parts);
            item.draw(obj.ctx);
        }

    }
    return iner;


}


//======================================================
class Vector {

    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
        Vector.count++;
    }

    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
    };

}

Vector.count = 0;
//======================================================

class _Path {
    constructor() {

        this.color = hsla(rand(359), 100, 70, 0.5);
        //        this.strokeStyle = "hsla(0, 72%, 38%, 0.5)";
    }


}

function hsla(hue, saturation, lightness, alpha) {

    color = `hsla(${hue},${saturation}%,${lightness}%,${alpha})`

    return color;
}

function rand(x) {
    return Math.floor(Math.random() * (x))
    console.log("rrr")
}
//======================================================
class Planets {
    constructor() {

    }
}



//======================================================
class Circle {

    constructor(position, velocity, acceleration, size, mass) {
        this.position = new Vector(position.x, position.y);
        this.velocity = new Vector(velocity.x, velocity.y);
        this.acceleration = new Vector(acceleration.x, acceleration.y);
        this.size = size || 20;
        this.mass = mass || 100;
        this.elipse = new _Path();
        Circle.count++;
    }

    move() {


        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
    };

    draw(ctx) {
        let r, g, b;
        r = Math.floor(Math.random() * (100) + 100);
        g = Math.floor(Math.random() * (100) + 100);
        b = Math.floor(Math.random() * (100) + 100);

        ctx.ellipse(10, 10, 30, 30, 0, 0, 1);

        let circle = new Path2D();
        circle.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);
        ctx.fillStyle = this.elipse.color;
        ctx.strokeStyle = this.elipse.strokeStyle;
        ctx.fill(circle);
        //        console.log("вызов");
    }
}

Circle.count = 0;
//======================================================
