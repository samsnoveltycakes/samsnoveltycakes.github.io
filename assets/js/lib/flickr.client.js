define(['flickr.photo'], function (FlickrPhoto)
{
	var endpoint = 'https://api.flickr.com/services/rest';
	var params = {
		'api_key': 'b22a418385accc05b521e7c7659cf20d',
		'format': 'json',
		'method': 'flickr.photos.search',
		'nojsoncallback': 1,
		'user_id': '129674120@N08',
		// 'tags': 'website'
	};
	var deferredPhotos = null;

	return {
		fetchPhotos: function ()
		{
			if (null === deferredPhotos) {
				deferredPhotos = new jQuery.Deferred();

				jQuery.getJSON(endpoint, params).done(function (response)
				{
					var photos = [];
					if ('ok' === response.stat && response.photos.total > 0) {
						response.photos.photo.forEach(function (data) {
							photos.push(new FlickrPhoto(data));
						});
					}
					deferredPhotos.resolve(photos);
				});
			}

			return deferredPhotos.promise();
		}
	};
});