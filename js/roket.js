const MAX_THRUST = 20000;

/**
 * This is a Roket
 *
 * Some notes:
 *  - Mass is in Kilograms
 *  - Thrust is in Newtons
 */
function Roket() {
    this.width = 15;
    this.height = 35;

    this.mass = 1000;

    this.x = (canvas.width / 2) - (this.width / 2);
    this.y = canvas.height - this.height;
    this.maxY = this.y;

    this.thrust = 0;
    this.speed = 0;
}

// Calculate the weight
Roket.prototype.weight = function() {
    return this.mass * GRAVITY;
};

// Calculate the resultant force
Roket.prototype.force = function() {
    return this.thrust - this.weight();
};

// Calculate the acceleration
Roket.prototype.acceleration = function() {
    return this.force() / this.mass;
};

// Calculate the roket's next position based on its acceleration
Roket.prototype.move = function() {
    this.speed = this.speed + this.acceleration()

    if (this.y <= this.maxY) {
        this.y = this.y - (this.speed / 100);
    } else {
        this.speed = 0;
        this.y = this.maxY;
    }
};

// Draw the roket onto a 2D context
Roket.prototype.draw = function(ctx) {
    ctx.fillStyle = '#f00';
    ctx.fillRect(this.x, this.y, this.width, this.height);
}



// Getters and setters

Roket.property('thrust', {
    set: function(thrust) {
        // Ensure the thrust can never go below zero or above MAX_THRUST
        this._thrust = Math.max(0, Math.min(thrust, MAX_THRUST));
    },
    get: function() {
        return this._thrust;
    }
});
