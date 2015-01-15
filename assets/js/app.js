'use strict';

requirejs.config({
	'baseUrl': '/assets/js/lib',
    'paths': {
    	'app': '/assets/js/app',
		'jquery': '//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min',
		'mustache': '//cdnjs.cloudflare.com/ajax/libs/mustache.js/0.8.1/mustache.min',
    }
});

// Load the main app module to start the app
requirejs(['app/main']);