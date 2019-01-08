const routes = require('next-routes')

                                                    // Name   Page      Pattern
module.exports = routes()                           // ----   ----      -----
.add('index')                                       // about  about     /about
.add('channel', '/:slug.:id', 'channel')            // blog   blog      /blog/:slug
.add('podcast', '/:slugChannel.:idChannel/:slug.:id', 'podcast')