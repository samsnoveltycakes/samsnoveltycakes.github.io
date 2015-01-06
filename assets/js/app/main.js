define(['jquery', 'flickr.client'], function ()
{
	var client = require('flickr.client');
	var fetchPhotos = jQuery.when(client.fetchPhotos());

	var canvas = jQuery('section[role="main"]');

	fetchPhotos.then(function (photos) {
		photos.forEach(function (photo)
		{
			var image = new Image(150, 150);
			image.src = photo.getUrl();

			canvas.append(image);
		});
	});
});