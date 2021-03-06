var Encore = require('@symfony/webpack-encore');

Encore
    // the project directory where compiled assets will be stored
    .setOutputPath('public/build/')
    // the public path used by the web server to access the previous directory
    .setPublicPath('/build')
    .cleanupOutputBeforeBuild()
    .enableSourceMaps(!Encore.isProduction())
    // uncomment to create hashed filenames (e.g. app.abc123.css)
    // .enableVersioning(Encore.isProduction())

    // uncomment to define the assets of the project
    .addEntry('js/app', './assets/js/app.js')
    .addStyleEntry('css/app', './assets/css/app.css')

    .addEntry('js/avatar', './assets/js/avatar.js')
    .addEntry('js/voting', './assets/js/voting.js')
    .addEntry('js/admin', './assets/js/admin.js')
    .addEntry('js/remove_admin', './assets/js/remove_admin.js')
    .addEntry('js/ban_user', './assets/js/ban_user.js')
    .addEntry('js/restore_user', './assets/js/restore_user.js')
    .addEntry('js/delete_reply', './assets/js/delete_reply.js')
    .addEntry('js/follow', './assets/js/follow.js');

// uncomment if you use Sass/SCSS files
// .enableSassLoader()

// uncomment for legacy applications that require $/jQuery as a global variable
// .autoProvidejQuery()

module.exports = Encore.getWebpackConfig();
