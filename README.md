## Beer Seeker

Uses the Google Maps API to find your location when you navigate to the site.

Grabs the lat/long of your location to access the BreweryDB API to find the ten breweries closest to you and information about them.

You can click on the brewery name to see a list of beers they've brewed and click on each beer to see more information about it.

## Tools
I built the site using:
* Javascript
* jQuery
* Node.js
* SCSS
* Express for routing
* nginx as a reverse proxy
* Lets Encrypt for a free SSL/TLS certificate
* Gulp to automate SCSS and javascript file tasks: compiling and minifying CSS, combining and minifying JS files into one, creating sourcemaps, some rudimentary jshint rules and watching files for changes.
* PM2 on the server to watch the app for crashes
* A Digital Ocean droplet
* Git/github
* Markdown for this README

## Beer Seeker 2.0
See the new branch for upcoming updates and improvements:
[Beer Seeker 2.0 github branch](https://github.com/wbeck32/cfpdx/tree/beerseeker2.0)

#### Sources

- [Google Maps Geolocation API](https://developers.google.com/maps/documentation/javascript/geocoding#ReverseGeocoding)
- [BreweryDB](http://www.brewerydb.com/)
- [Lets Encrypt](https://letsencrypt.org/)
- [Google search: "What is a proxy server?"](https://www.google.com/search?q=what+is+a+proxy+server&oq=what+is+a+&aqs=chrome.0.69i59j69i60j69i57j0l3.1832j0j4&sourceid=chrome&ie=UTF-8)
