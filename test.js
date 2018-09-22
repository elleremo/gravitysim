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

