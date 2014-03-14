const MAX_THRUST = 20000;

/**
 * This is a Roket
 *
 * Some notes:
 *  - Mass is in kilograms
 *  - Fuel is in kilograms
 *  - Thrust is in newtons
 *  - Speed is in metres per second
 */
function Roket() {
    this.width = 15;
    this.height = 35;

    this.mass = 1000;

    this.x = (canvas.width / 2) - (this.width / 2);
    this.y = canvas.height - this.height;
    this.maxY = this.y;

    this.fuel = 500000;
    this.thrust = 0;
    this.speed = 0;

    // For liquid hydrogen/liquid oxygen fuel. Source: http://en.wikipedia.org/wiki/Rocket
    this.maxSpeed = 4462;

    // Maybe roket can go faster
    this._cache = {};
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

// Calculate fuel consumption based on current thrust.
// I made this up. It isn't a real physics.
Roket.prototype.fuelConsumption = function() {
    return -(Math.log(1.001 - this.thrust / MAX_THRUST) * 100);
};

// Calculate the roket's next position based on its acceleration
Roket.prototype.move = function() {
    if (this.thrust && this.fuel > 0) {
        this.fuel = this.fuel - this.fuelConsumption();
    } else if (this.fuel <= 0) {
        this.fuel = 0;
        this.thrust = 0;
    }

    if (this.y === this.maxY && !this.thrust) {
        // Stationary on the ground. What now?
    } else if (this.y <= this.maxY) {
        // Above ground
        this.speed = Math.min(this.maxSpeed, this.speed + this.acceleration());
        this.y = this.y - (this.speed / 100);
    } else {
        // On (or below?!) the ground
        this.speed = 0;
        this.y = this.maxY;
    }
};

// Draw the roket onto a 2D context
Roket.prototype.draw = function(ctx) {
    if (this.hasChanged('x') || this.hasChanged('y')) {
        // Clear the whole canvas because wat
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#f00';
        ctx.fillRect(this.x, this.y, this.width, this.height);

        this._cache.x = this.x;
        this._cache.y = this.y;
    }
}

// Is this good programming? I don't even know anymore
Roket.prototype.hasChanged = function(prop) {
    return this._cache[prop] !== this[prop];
};



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
