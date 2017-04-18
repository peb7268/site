
// console.log('tagcloud.js here');
// window.onload = function() {
//     if (window.jQuery) {  
//         // jQuery is loaded  
//         alert("Yeah!");
//     } else {
//         // jQuery is not loaded
//         alert("Doesn't Work");
//     }
// }
// set font size cap
// divide number of tags used
// smooth out with a factor
// get font for tag

// get all tags from ghost
// count frequency
// map them
// tags: {
//  tagName: {frequency: x}
//  url: http://url.com  
// } 
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
    let fontFactor = 50;
    for(var key in tagCount) {
        if(tagCount.hasOwnProperty(key)) {
            element = tagCount[key]
            tagCount[key] = (element/totalTags) * fontFactor;
            console.log(tagCount[key])
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
            console.log(fonts);

        })
        .fail(function (err){
            console.log(err);
        });
}

createTagCloud();