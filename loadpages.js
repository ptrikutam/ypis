var fs = require('fs'),
    system = require('system');



function loadAddresses() {
    var websites = [];
    // console.log("Loading websites...");
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
    var sites = [];
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
            // console.log("Loading " + url);
            
            return page.open(url, function(status) {
                
                if (status === "success") {
                    return window.setTimeout((function() {
                        // var endTime = Date.now() - startTime;
                        page.endTime = new Date();
                        var endTime = page.endTime - page.startTime
                        sites.push({
                            url: url,
                            time: (endTime / 1000)
                        })
                        // console.log("Load time for " + url + " is " + endTime + " msec");
                        return retrieve();
                    }), 200);
                } else {
                    console.log("LOAD FAILED");
                    return retreive();
                }
            });
        } else {
            console.log(JSON.stringify(sites));
            phantom.exit();
        }
    };
    return retrieve();
}


//public void static main() ;)
var urls = loadAddresses();
loadPages(urls);