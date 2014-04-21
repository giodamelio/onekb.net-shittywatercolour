// Load a page of images
var lastFullname = null;
var lastLoadDone = true;
var appendImages = function() {
    lastLoadDone = false;
    var url = "http://www.reddit.com/user/Shitty_Watercolour/comments.json";
    if (lastFullname) {
        url = url + "?after=" + lastFullname
    }
    $.getJSON(url, function(data) {
        for (index in data.data.children) {
            var image = data.data.children[index].data.body.match(/(http:\/\/i.imgur.com\/(.*))(\?.*)?/);
            if (image) {
                $("div").append("<img src=\"" + image[0] + "\"></img>");
                lastFullname = data.data.children[index].data.name
            }
        };
        lastLoadDone = true;
    });
};

// Load the first page on startup
appendImages();

// Load more images when we get near the bottom of the page
var loadMore = function() {
    if($(window).scrollTop() + $(window).height() > $(document).height() - 200 && lastLoadDone) {
        $(window).unbind("scroll");
        appendImages();
        $(window).bind("scroll", loadMore);
    }
}
$(window).scroll(loadMore);
