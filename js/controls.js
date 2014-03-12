// In here all the controls do the controlling things

const THRUST_INCREMENT = MAX_THRUST / 40;

kd.UP.down(function() {
    roket.thrust = roket.thrust + THRUST_INCREMENT;
});

kd.DOWN.down(function() {
    roket.thrust = roket.thrust - THRUST_INCREMENT;
});
