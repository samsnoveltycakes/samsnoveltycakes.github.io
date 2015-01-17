define(['jquery', 'featherlight', 'flickr.client', 'flickr.tag', 'mustache'], function ()
{
	var client = require('flickr.client');
	var mustache = require('mustache');
	var flickrTag = require('flickr.tag');

	function displayPhotos(data, mode)
	{
		if (data.photos.length < 1) {
			return;
		}

		var canvas = jQuery('#photos');
		var template = jQuery('#tpl-cake').html();
		var paginator = jQuery('<a />', {
			'class': 'paginator',
			'data-page': data.page,
			'data-tag': jQuery('#tags').val(),
			'text': 'More'
		});

		mustache.parse(template);

		// clean up previous dom elements
		canvas.find('.paginator').remove();
		if ('append' !== mode) {
			canvas.find('article').remove();
		}

		data.photos.forEach(function (photo)
		{
			var cake = mustache.render(template, {
				"title": photo.title,
				"image": photo.getUrl('large'),
				"fullsize": photo.getUrl('large'),
			});

			canvas.append(cake);
		});

		// attach the paginator
		if (data.page < data.pages) {
			canvas.append(paginator);
		}

		paginator.on('click', function (ev)
		{
			ev.preventDefault();

			var el = jQuery(ev.target);
			var data = el.data();

			jQuery.when(client.fetchPhotos(data.tag, (data.page + 1))).then(function(data)
				{
					displayPhotos(data, 'append');
				});
		});

		// see if this is a touch device
		if ('ontouchstart' in window)
		{
			canvas.find('article').removeAttr('data-featherlight');

			// set the correct [touchscreen] body class
			jQuery('body').removeClass('no-touch').addClass('touch');

			// add the touch toggle to show text when tapped
			canvas.find('div').on('click', function() {
				jQuery(this).closest('div').toggleClass('touchFocus');
			});
		}
	}

	(function setupTagFilter()
	{
		var filter = jQuery('#tags');
		var tags = new flickrTag().getCategories();

		jQuery.map(tags, function (value, key)
		{
			var option = jQuery('<option />', {
				'value': key,
				'text': value
			});

			filter.append(option);
		});

		filter.on('change', function (ev)
		{
			var el = jQuery(ev.target);

			// retrieve the photos keyed by tagname
			jQuery.when(client.fetchPhotos(el.val())).then(displayPhotos);
		});

		// retrieve photos from flickr
		jQuery.when(client.fetchPhotos(filter.val())).then(displayPhotos);
	})();

	(function setupAbout ()
	{
		var more = jQuery('#more');
		var tplMore = jQuery('#tpl-more').html();

		mustache.parse(tplMore);
		var btnMore = jQuery.trim(mustache.render(tplMore, {
			'href': '#more',
			'title': 'About'
		}));

		jQuery(btnMore)
			.on('click', function (ev) {
				ev.preventDefault();
				more.toggleClass('hide');
			})
			.trigger('click')
			.insertBefore(more);
	})();

});