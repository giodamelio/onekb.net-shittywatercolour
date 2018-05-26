// Load a page of images
var lastFullname = null;
var lastLoadDone = true;
var appendImages = function() {
    lastLoadDone = false;
    var gotImage = false;
    var url = "http://www.reddit.com/user/Shitty_Watercolour/comments.json?after=" + lastFullname
    $.getJSON(url, function(data) {
        var comments = data.data.children;
        for (var index in comments) {
            var image = comments[index].data.body.match(/(http:\/\/i.imgur.com\/(.*))(\?.*)?/);
            lastFullname = comments[index].data.name
            if (image) {
                $(document.body).append("<img src=\"" + image[0] + "\">");
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
        $(window).off("scroll");
        appendImages();
        $(window).on("scroll", loadMore);
    }
}
$(window).scroll(loadMore);
