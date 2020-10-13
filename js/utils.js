/*
 * Utility function to tell if a given parameter
 * is a string or not
 *
 * returns: true/false
 */
window.isString = function(s) {
    return typeof(s) === 'string' || s instanceof String;
};

/*
 * Generates a random integer between min and max
 *
 * params:
 * min: minimum value
 * max: maximum value
 *
 * returns: random integer
 *
 * source: https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
 */
 window.getRandomInt = function(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
 };
