const FPS = 60;

// This is the almost exact number of earth gravity
const GRAVITY = 9.81;

var info = document.getElementById('roket-info');
var canvas = document.getElementById('roket-game');
var ctx = canvas.getContext('2d');

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

var roket = new Roket();

function tick() {
    // Keydrown needs to sync with the game loop
    kd.tick();

    roket.move();
    roket.draw(ctx);

    // One day this will be a nice interface for the player
    info.innerHTML = 'Co-ordinates: [' + Math.round(roket.x) + ', ' + Math.round(roket.y) + ']<br>' +
        'Altitude: ' + -Math.round((roket.y - canvas.height + roket.height)) + 'm<br>' +
        'Fuel: ' + roket.fuel.toFixed() + ' kg<br>' +
        'Thrust: ' + roket.thrust + ' N<br>' +
        'Acceleration: ' + roket.acceleration().toFixed(2) + ' m/s<br>' +
        'Speed: ' + roket.speed.toFixed(2) + ' m/s';
}

requestInterval(tick, 1000 / FPS);
