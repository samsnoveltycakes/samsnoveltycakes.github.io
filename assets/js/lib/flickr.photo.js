define(function ()
{
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
	photo.prototype.getUrl = function ()
	{
		return '//farm' + this.farm + '.staticflickr.com/'
			+ this.server + '/' + this.id + '_' + this.secret + '_q.jpg';
	}

	return photo;
});