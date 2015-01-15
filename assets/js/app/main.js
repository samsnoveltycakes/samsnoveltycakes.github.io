define(['jquery', 'flickr.client', 'mustache'], function (jquery, flickr, mustache)
{
	var client = require('flickr.client');
	var fetchPhotos = jQuery.when(client.fetchPhotos());

	var canvas = jQuery('section[role="main"]');
	var template = jQuery('#tpl-cake').html();

	mustache.parse(template);

	fetchPhotos.then(function (photos)
	{
		photos.forEach(function (photo)
		{
			var cake = mustache.render(template, {
				"title": photo.title,
				"image": photo.getUrl()
			});

			canvas.append(cake);
		});
	});
});