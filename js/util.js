// This is a universe full of utility functions

// A bit of syntax sugar for adding getters/setters to a function prototype
Function.prototype.property = function(property, descriptor) {
    Object.defineProperty(this.prototype, property, descriptor);
};
