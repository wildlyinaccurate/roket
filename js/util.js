// This is a universe full of utility functions

// A bit of syntax sugar for adding getters/setters to a function prototype
Function.prototype.property = function(property, descriptor) {
    Object.defineProperty(this.prototype, property, descriptor);
};

// A more performant setInterval to allow setting an FPS for requestAnimationFrame
window.requestInterval = function(fn, delay) {
    var start = new Date().getTime();
    var handle = {};

    function loop() {
        var current = new Date().getTime();
        var delta = current - start;

        if (delta >= delay) {
            fn.call();
            start = new Date().getTime();
        }

        handle.value = requestAnimationFrame(loop);
    };

    handle.value = requestAnimationFrame(loop);

    return handle;
}
