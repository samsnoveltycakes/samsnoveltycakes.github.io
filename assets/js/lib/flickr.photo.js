define(function ()
{
	var availableSizes = {
		// small square 75x75
		'tiny-square': 's',
		// large square 150x150
		'square': 'q',
		// thumbnail, 100 on longest side
		'thumb': 't',
		// large, 1024 on longest side
		'large': 'b',
	};

	function photo (source)
	{
		for (var key in source) {
			this[key] = source[key];
		}
	};

	/**
	 * Generate url based on source data.
	 *
	 * @see https://www.flickr.com/services/api/misc.urls.html
	 *
	 * @return string
	 */
	photo.prototype.getUrl = function (size)
	{
		if (null == size) {
			size = 'square';
		}

		// look up key for requested size
		size = availableSizes[size];

		return '//farm' + this.farm + '.staticflickr.com/'
			+ this.server + '/' + this.id + '_' + this.secret + '_'
			+ size + '.jpg';
	}

	return photo;
});