openxJSON
=========

jQuery plug-in to grab ads from OpenX Enterprise

Initialize plug-in with class name of ad zones on a page e.g...

$('.advert').getOXJSONads();

Default variables...

openx_json : 'http://ox-d.gamer-network.net/w/1.0/arj?' // Ad server

zone_attribute : 'data-ad-zone' // Attribute on each DOM element which specifies Ad Unit ID

custom_variables : '' // Blank but can pass in key/value to be used as custom variables

Plug-in looks at which ad zones are visible on the page and grabs ads for each one.

Does an asynchronous JSONP request and then populates the ad zones once HTML has been received.
