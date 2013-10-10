/*
 * jQuery OpenX JSON call plugin
 *
 * @author Gamer Network
 *
 */

(function( $ ) {

    $.fn.getOXJSONads = function( options ) {
 
        var defaults = $.extend({
            openx_json : 'http://ox-d.gamer-network.net/w/1.0/arj?',
        	zone_attribute : 'data-ad-zone',
        	custom_variables : ''
        }, options);

        var ads = $(this);
 		var get_ads = false;
 		var openx_json = defaults.openx_json;

 		var zones = [];
 		var tags = [];

		for(i = 0; i < ads.length; i++) {
			var zone = ads[i].getAttribute(defaults.zone_attribute);
			if(ads[i].getStyle('display') == 'block') {
				zones.push(zone);
				get_ads = true;
			}
		}

		if(zones) {
			openx_json = openx_json + 'auid=' + zones.toString();
		}
		
		if(defaults.custom_variables) {
			
			var variable_string = '';

			$.each(defaults.custom_variables, function(key, val) {
			 	variable_string = variable_string + '&c.' + key + '=' + val;
			});

			openx_json = openx_json + variable_string;

		}

		console.log(openx_json);

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
						var zone = ads[i].getAttribute(defaults.zone_attribute);
						$(ads[i]).html(ads_html[zone]);
					}
			  	}
			});

		}
 
    };
 
}( jQuery ));