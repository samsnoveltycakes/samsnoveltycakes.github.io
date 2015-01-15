define(['flickr.photo'], function (FlickrPhoto)
{
	var endpoint = 'https://api.flickr.com/services/rest';
	var params = {
		'api_key': 'a6cc33445474dfd8ed9a11bf2d1efab6',
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