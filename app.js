//
var app = {
    onDeviceReady : function () {
        app.showIt('info', 'deviceready');
        if (device.platform === "iOS") {
            alert("got iOS.");
            // hide Exit button. They don't have one on iOS devices.
            // http://www.mzcart.com/javascript-how-to-addremove-css-class-from-a-dom-element/
            document.getElementById('exitApp').classList.add("hidden");
            // deals with post-iOS-7 change that covers the status bar
            // http://coenraets.org/blog/2013/09/phonegap-and-cordova-with-ios-7/
            document.body.style.marginTop = "20px";
        } else if (device.platform == 'Android') {
            // Get rid of 300ms delay 
            document.addEventListener('DOMContentLoaded', function() {
                FastClick.attach(document.body); },
                false);
            //
            document.getElementById('exitApp').addEventListener('click', function() {
                navigator.app.exitApp();
            });
        }
        if (device.platform == 'browser') {
            // hide Exit button. Browser does not exit.
            document.getElementById('exitApp').classList.add("hidden");
        } else {
            app.pluginTest();
        }
        app.showIt('info', 'deviceready done.');
    },
    showIt : function (id, msg) {
        document.getElementById(id).innerHTML = msg;
    },
    pluginTest : function() {
        // All platform
        document.getElementById('isWifiEnabled').addEventListener('click',
            function () {
                cordova.plugins.diagnostic.isWifiEnabled(
                    function (bool) { app.showIt('content', 'status:' + bool); }, 
                    function (err)  { app.showIt('info', 'error:' + err); }
                );
            }
        );

        // Android Only
        document.getElementById('getLocationMode').addEventListener('click',
            function () {
                cordova.plugins.diagnostic.getLocationMode(
                    function (bool) { app.showIt('content', 'status:' + bool); }, 
                    function (err)  { app.showIt('info', 'error:' + err); }
                );
            }
        );
        // iOS only
        document.getElementById('getBluetoothState').addEventListener('click',
            function () {
                cordova.plugins.diagnostic.getBluetoothState(
                    function (bool) { app.showIt('content', 'status:' + bool); }, 
                    function (err)  { app.showIt('info', 'error:' + err); }
                );
            }
        );
    }
};

//
//    Entry Point
//
document.addEventListener('DOMContentLoaded', function() {
    // Detect if we are using Cordova/Phonegap or a browser.
    // https://videlais.com/2014/08/21/lessons-learned-from-detecting-apache-cordova/
    var isCordovaApp = (typeof window.cordova !== "undefined");

    // Is it a device we know?
    if ( isCordovaApp === true ) {
        // Wait for PhoneGap to load
        document.addEventListener("deviceready", app.onDeviceReady, false);
    } else {
        // This needs to be global so other modules can see it.
        device = {platform:'browser'};
        // Force the function.
        app.onDeviceReady();
    }
});
