/*
 * jQuery OpenX JSON call plugin
 *
 * @author Gamer Network
 *
 */

(function( $ ) {

    $.fn.getOXJSONads = function( options ) {
 
        // Default options
        var defaults = $.extend({
            openx_json : 'http://ox-d.gamer-network.net/w/1.0/arj?',
        	zone_attribute : 'data-ad-zone',
        	custom_variables : '',
        	ad_unit_groups : ''
        }, options);

        var ads = $(this);
 		var get_ads = false;
 		var openx_json = defaults.openx_json;

 		var zones = [];
 		var zone_groups = [];
 		var tags = [];

		// Go through visible advert elements in DOM and gather zone IDs
		for(i = 0; i < ads.length; i++) {
			var zone = ads[i].getAttribute(defaults.zone_attribute);
			if($(ads[i]).css('display') == 'block') {
				zones.push(zone);
				get_ads = true;
			}
		}

		if(zones) {

			// Check if Ad Unit Groups have been passed and that all relevant zones are present
			if(defaults.ad_unit_groups) {

				$.each(ad_unit_groups, function(key, val) {
					
					var count = 0;
					var family_count = 0;

					$.each(val.family, function(key, val) {
						if($.inArray(val, zones) !== -1) {
							count++;
						}
						family_count++;
					});

					// If Ad Unit Group IDs on the page then include pgid
					if(count == family_count) {
						zone_groups.push(val.id);

						// Remove Ad Unit Group ad IDs from general auid list
						$.each(val.family, function(key, val) {
							var i = zones.indexOf(val);
							if(i != -1) {
								zones.splice(i, 1);
							}
						});

					}

				});

				openx_json = openx_json + 'auid=' + zones.toString();
				openx_json = openx_json + '&pgid=' + zone_groups.toString();

			} else {

				openx_json = openx_json + 'auid=' + zones.toString();

			}

		}
		
		// Append custom variables
		if(defaults.custom_variables) {
			
			var variable_string = '';

			$.each(defaults.custom_variables, function(key, val) {
			 	variable_string = variable_string + '&c.' + key + '=' + val;
			});

			openx_json = openx_json + variable_string;

		}

		// Get the ads from single request, response is JSONP
		// Append ads to DOM
		if(get_ads) {
			
			var ads_html = [];

			$.ajax({
				url: openx_json,
			  	dataType: 'jsonp',
			  	jsonpCallback: 'adsReturned',
			  	cache: true,
			  	success: function(data) {
			  		$.each(data['ads']['ad'], function(key, val) {
		 				ads_html[val['adunitid']] = val['html'];
		 			});
		 			for(i = 0; i < ads.length; i++) {
						if($(ads[i]).css('display') == 'block') {
							var zone = ads[i].getAttribute(defaults.zone_attribute);
							if(ads_html[zone]) {
								postscribe(ads[i], ads_html[zone]);
							}
						}
					}
			  	}
			});

		}
 
    };
 
}( jQuery ));
