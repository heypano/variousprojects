/*
 * Configure require.js
 */ 

var standardIncludes = ['jquery', 'combinations', 'combination'];

require.config({
    baseUrl: 'js/lib',
    paths: {
        app: '../app',
    },
    shim: {
    	'app/barbell': standardIncludes,
    }
});

/*
 * Require main app file
 */

requirejs(["app/barbell"]);