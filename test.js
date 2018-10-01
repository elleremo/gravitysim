class Core {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
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

    render(ctx) {
        // Добавить метод рендера к самому объекту


        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let item in this.planets.parts) {
            let circle = new Path2D();
            circle.arc(item.position.x, item.position.y, item.size, 0, 2 * Math.PI);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.fill(circle);



        };
    }

    append(obj) {
        this.planets.parts.push(new Circle(obj.pos, obj.vel, obj.acc, obj.size, obj.mass));
        console.log(this.planets.count());
        this.render(this.ctx)
    }
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

class Planets {
    constructor() {

    }
}

class Circle {

    constructor(position, velocity, acceleration, size, mass) {
        this.position = new Vector(position.x, position.y);
        this.velocity = new Vector(velocity.x, velocity.y);
        this.acceleration = new Vector(acceleration.x, acceleration.y);
        this.size = size || 20;
        this.mass = mass || 100;
        Circle.count++;
    }

    move() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
    };

}

Circle.count = 0;
//======================================================
