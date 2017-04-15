
function bindEvents(){
    $('a.nav-toggle').on('click', toggleNav);
}

function toggleNav(evt){
    evt.preventDefault();
    var $nav = $('.nav');

    if(isHidden($nav)) { 
        showNav($nav)
    } else {
        hideNav($nav);
    }
}

function isHidden($nav){
    return ($nav.css('visibility') == 'hidden')
}

function showNav($nav){
    $nav.css('visibility', 'visible');
}

function hideNav($nav){
    $nav.css('visibility', 'hidden');
}


$('document').ready(function(){
    bindEvents();
});