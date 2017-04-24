
// var Handlebars = require('handlebars');
// find data express sends to handlebars (route)

// window.test = 'test';
// console.log(test)

let createTagArray = function(posts){
    let tagsArray = [];    
    let post;
    for(post in posts){
        let tags = posts[post].tags;
        let tag;
        for(tag in tags){
            let tagname = tags[tag].name
            tagsArray.push(tagname);
        }
    }
    return tagsArray
}

let calculateFontSize = function(tagCount, tagsArray){
    let totalTags = tagsArray.length;
    let fontFactor = 6 * totalTags;
    // (rate/tagCount * smooth) * 10 + base_font
    for(var key in tagCount) {
        if(tagCount.hasOwnProperty(key)) {
            element = tagCount[key]
            tagCount[key] = Math.round((element/totalTags) * fontFactor);
        }
    }
    let fonts = tagCount;
    return fonts
}

let createTagCloud = function(){
    $.get(ghost.url.api('posts', {include: 'tags'}))
        .done(function (data){
            let posts = data.posts;
            let tags = createTagArray(posts);
            let tagCount = {};
            let i;
            tags.forEach(function(i) { 
                tagCount[i] = (tagCount[i] || 0)+1; 
            });

            let fonts = calculateFontSize(tagCount, tags);
            let tagNames = Object.keys(fonts);
            for( var tag in tagNames){
                element = tagNames[tag];
                // $("#elem").css({
                //     fontSize: 20
                // });
                var $tag = $(`<li class='tagCloudTag'>${element}</li>`);
                $("#tag-cloud").append($tag)
                $("li.tagCloudTag").each(function(){
                    console.log(fonts[element])                    
                    var element = $( this ).text();
                    $(this).css("fontSize", fonts[element]);
                })
            }
        })
        .fail(function (err){
            console.log(err);
        });
}

createTagCloud();