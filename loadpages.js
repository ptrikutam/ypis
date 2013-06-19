var fs = require('fs'),
    system = require('system');



function loadAddresses() {
    var websites = [];
    console.log("Loading websites...");
    var content;
    var website_file;
    try {
        websitefile = fs.open('website_list.txt','r');
        content = websitefile.read();
    } catch (e) {
        console.log("ERRORORR");
        console.log(e);
    }

    if (content) {
        lines = content.split("\n");
        for (var i = 0, len = lines.length; i < len; i++) {
            websites.push(lines[i]);
        }
    }
    return websites;
}


function loadPages(urls) {
    var next, page, retrieve, urlIndex, webpage;
    urlIndex = 0;
    webpage = require("webpage");
    page = null;

    // next = function(status, url, startTime) {
    //     page.close();
    //     return retrieve();
    // };
    retrieve = function() {
        if (page) {
            page.close();
        }
        var url;
        if (urls.length > 0) {
            url = urls.shift();
            urlIndex++;
            page = webpage.create();
                page.onError = function(msg, trace) {
                    //Ignore Errors
                };
                page.onLoadStarted = function () {
                    page.startTime = new Date();
                }
            page.viewportSize = {
                width: 320,
                height: 480
            };
            var startTime = Date.now();
            console.log("Loading " + url);
            
            return page.open(url, function(status) {
                
                if (status === "success") {
                    return window.setTimeout((function() {
                        // var endTime = Date.now() - startTime;
                        page.endTime = new Date();
                        var endTime = page.endTime - page.startTime
                        console.log("Load time for " + url + " is " + endTime + " msec");
                        return retrieve();
                    }), 200);
                } else {
                    console.log("LOAD FAILED");
                    return retreive();
                }
            });
        } else {
            phantom.exit();
        }
    };
    return retrieve();
}


function printPageTime(address, callback) {
    var t = Date.now();
    var page = webpage.create();
    console.log("Loading " + address + "...");

        page.onResourceRequested = function (req) {
            // console.log('requested: ' + JSON.stringify(req, undefined, 4));
        };

        page.onResourceReceived = function (res) {
            // console.log('received: ' + JSON.stringify(res, undefined, 4));
        };

        page.open(address, function (status) {
            console.log("PAGE LOADED");
            if (status !== 'success') {
                console.log('FAIL to load the address:' + address);
            } else {
                t = Date.now() - t;
                console.log('Loading time ' + t/1000 + 's');
            }
           
        });

}
//public void static main() ;)

var urls = loadAddresses();
loadPages(urls);