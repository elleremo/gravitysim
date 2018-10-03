/* http://paperjs.org*/


/* ДОбавить все в свойства класса или сделать на функциях!!!!!!!!!!!!!!!!!!*/

class Core {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.ctx_width;
        this.ctx_height;
        this.border_collide = true;
        Core.canvas =canvas; 
        Core.planets = {
            suns: [],
            kineamatic_grav: [],
            meteors: []

        }
    }
    //---------------------------------

    get width() {
        return this.ctx_width
    }

    get height() {
        return this.ctx_height
    }
    set width(new_val) {
        this.canvas.width = new_val;
        this.ctx_width = new_val;
//        console.log("вызов width");
    }

    set height(new_val) {
        this.canvas.height = new_val;
        this.ctx_height = new_val;
//        console.log("вызов height");
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

        for (let item of Core.planets.meteors) {
            item.draw(this.ctx);
        }        
        
        for (let item of Core.planets.suns) {
            item.draw(this.ctx);
        }
    }

    simulate() {
        console.log("start sim");
        let ss = sim(this);
        ss();


        //        sim(this)


    }

    append(obj, type) {
        
        if (type == "sun"){
            let a = new Sun(obj.pos, obj.size, obj.mass);
            a.elipse.color = "hsla(0, 0%, 100%, 0.51)";
            Core.planets.suns.push(a);
        } 
        if (type == "meteor"){
            Core.planets.meteors.push(new Meteor(obj.pos, obj.vel, obj.acc,   obj.size, obj.mass));              
        }
        
        console.log("планет "+Sun.count);


        /*==============СДЕЛАТЬ кол частиц по типу в классе типа=============*/

        this.render()
    }
}
Core.canvas = {};
Core.planets={}

function sim(obj) {
    let count = 0;
    let time;

    function iner() {

        requestAnimationFrame(iner);

        let now = new Date().getTime(),
            dt = now - (time || now);
        time = now;


        //        console.info(dt);
        //--------- ОПТИМИЗИРОВАТЬ -----------------------------------
        obj.ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let item of Core.planets.meteors) {
            item.move(Core.planets.meteors);
            item.draw(obj.ctx);
        }
        for (let item of Core.planets.suns) {
            item.draw(obj.ctx);
        }

    }
    return iner;


}


//======================================================

class _Path {
    constructor() {
        this.colorz = hsla(359, 100, 70, 0.5);
        this.color = hsla(rand(359), 100, 70, 0.7);
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
    
    static sub(vector2, vector1){
        let x = vector2.x - vector1.x ;
        let y = vector2.y - vector1.y ;
         
        return {x,y};
    }
    
    static length(vector){
        
        return ( Math.sqrt(vector.x**2 + vector.y**2) )
    }
}

Vector.count = 0;

//======================================================
class Sun {
    constructor(position, size, mass) {
        this.position = new Vector(position.x, position.y);
        this.size = size || 20;
        this.mass = mass || 100;
        this.elipse = new _Path();
        Sun.count++;
    }
    
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
Sun.count =0;


//======================================================
class Meteor extends Sun {

    constructor(position, velocity, acceleration, size, mass) {
        super(position, size, mass);
        this.velocity = new Vector(velocity.x, velocity.y) ;
        this.acceleration = new Vector(acceleration.x, acceleration.y);
        Meteor.count++;
    }

    move() { /*================== GRAVITY ====================== */
     
     var accX = 0;
     var accY = 0;    
         
     for(let sun of Core.planets.suns){
         let x = sun.position.x - this.position.x;
         let y = sun.position.y - this.position.y;
         
         let vector_length = Vector.length({x, y});
//         console.log(vector_length)
         let f = sun.mass * this.mass/vector_length**2 * 0.1;
         accX += x / vector_length * f;
         accY += y / vector_length * f;
         this.acceleration.x =  accX;
         this.acceleration.y =   accY;
 
     };
        
//        let col = this.position;
//        let size = this.size/2;
//        if ( col.x > Core.canvas.width-size || col.x < size ){
//            this.velocity.x *= -1;
//        };
//        if ( col.y > Core.canvas.height-size || col.y < size ){
//            this.velocity.y *= -1;
//        };  
    
                
           


    /*================== GRAVITY ====================== */
        
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);    
    };


}

Meteor.count = 0;
//======================================================
