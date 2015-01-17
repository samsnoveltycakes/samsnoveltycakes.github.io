define(['jquery', 'flickr.photo', 'flickr.tag'], function ()
{
	var jQuery = require('jquery');
	var FlickrPhoto = require('flickr.photo');
	var FlickrTag = require('flickr.tag');

	var endpoint = 'https://api.flickr.com/services/rest';
	var defaultParams = {
		'api_key': 'a6cc33445474dfd8ed9a11bf2d1efab6',
		'format': 'json',
		'nojsoncallback': 1,
		'user_id': '129674120@N08',
	};
	var deferredPhotos = [];
	var deferredTags = null;

	function client ()
	{
	};

	client.fetchPhotos = function (tagName, page)
	{
		if ('undefined' === typeof tagName
			|| null === tagName
			|| '' === tagName.replace(/\s/g, '')
		) {
			// if no tagname provided, set to default 'website'
			tagName = 'website';
		}

		if ('undefined' === typeof page || page < 1) {
			// allow for pagination
			page = 1;
		}

		if (false === deferredPhotos.hasOwnProperty(tagName)) {
			deferredPhotos[tagName] = {};
		}

		if (false === deferredPhotos[tagName].hasOwnProperty(page)) {
			// if we haven't previously fetched the photos for this tag, grab
			// them now
			deferredPhotos[tagName][page] = new jQuery.Deferred();

			var params = jQuery.extend(defaultParams, {
				'method': 'flickr.photos.search',
				'per_page': 25,
				'tags': tagName,
				'page': page
			});

			jQuery.getJSON(endpoint, params).done(function (response)
			{
				var photos = [];
				var tags = [];
				if ('ok' === response.stat && response.photos.total > 0) {
					response.photos.photo.forEach(function (data) {
						photos.push(new FlickrPhoto(data));
					});
				}
				deferredPhotos[tagName][page].resolve({
					'photos': photos,
					'page': response.photos.page || 1,
					'pages': response.photos.pages || 1,
					'total': response.photos.total || 0
				});
			});
		}

		return deferredPhotos[tagName][page].promise();
	};

	client.fetchTagsForPhoto = function (photoId)
	{
		var deferredTags = jQuery.Deferred();
		var params = jQuery.extend(defaultParams, {
			'method': 'flickr.tags.getListPhoto',
			'photo_id': photoId,
		});

		jQuery.getJSON(endpoint, params).done(function (response)
		{
			var tags = [];
			if ('ok' === response.stat && response.photo.tags.tag.length > 0) {
				response.photo.tags.tag.forEach(function (data) {
					tags.push(new FlickrTag(data));
				});
			}
			deferredTags.resolve(tags);
		});

		return deferredTags;
	};

	client.fetchTags = function ()
	{
		if (null === deferredTags) {
			deferredTags = jQuery.Deferred();

			var params = jQuery.extend(defaultParams, {
				'method': 'flickr.tags.getListUser',
			});

			jQuery.getJSON(endpoint, params).done(function (response)
			{
				var tags = [];
				if ('ok' === response.stat && response.who.tags.tag.length > 0) {
					response.who.tags.tag.forEach(function (data) {
						tags.push(new FlickrTag(data));
					});
				}
				deferredTags.resolve(tags);
			});
		}

		return deferredTags;
	}

	return client;
});