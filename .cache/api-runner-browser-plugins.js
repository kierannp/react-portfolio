module.exports = [{
      plugin: require('../node_modules/gatsby-plugin-manifest/gatsby-browser.js'),
      options: {"plugins":[],"name":"gatsby-starter-default","short_name":"starter","start_url":"./","background_color":"#663399","theme_color":"#663399","display":"minimal-ui","icon":"./public/favicon-32x32.png","legacy":true,"theme_color_in_head":true,"cache_busting_mode":"query","crossOrigin":"anonymous","include_favicon":true,"cacheDigest":"1f7351b086f3ca2a44baa5144a302ce7"},
    },{
      plugin: require('../node_modules/gatsby-plugin-smoothscroll/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../gatsby-browser.js'),
      options: {"plugins":[]},
    }]
