// Load a page of images
var lastFullname = null;
var lastLoadDone = true;
var appendImages = function() {
    lastLoadDone = false;
    var gotImage = false;
    var url = "http://www.reddit.com/user/Shitty_Watercolour/comments.json?after=" + lastFullname
    $.getJSON(url, function(data) {
        var comments = data.data.children;
        for (index in comments) {
            var image = comments[index].data.body.match(/(http:\/\/i.imgur.com\/(.*))(\?.*)?/);
            lastFullname = comments[index].data.name
            if (image) {
                $("div").append("<img src=\"" + image[0] + "\"></img>");
                gotImage = true;
            } else if (index == 24 && !gotImage) {
                appendImages()
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
