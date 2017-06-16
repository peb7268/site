
function bindEvents(){
    $('a.nav-toggle').on('click', toggleNav);
    bindCtaAnimations('.cta, .graphic.image');
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

function bindCtaAnimations(sel){
    window.IdAnimations     = {};
    IdAnimations.$ctas      = $(sel);
    IdAnimations.remaining  = IdAnimations.$ctas.length;
    IdAnimations.count      = 0;

    //Rx Pipeline
    var windowMovement$ = Rx.Observable.fromEvent(document, 'scroll');
    windowMovement$
    .takeWhile((evt, i) => i % 100 == 0).repeat()   //sample the event stream less frequently ( every 100 events )
    .map(doc => window.pageYOffset)
    .subscribe(scroll_pos => {
        console.log(`scroll_pos: ${scroll_pos}`);
        window.IdAnimations.screen_height = screen.height;
        let $current_cta      = $(IdAnimations.$ctas[IdAnimations.count]);
        
        //If not at last cta and there are more ctas remaining
        let header_height     = $('header').height();
        let screen_top        = window.pageYOffset;     //where the top of the screen is at.
        let distance_from_top = $current_cta.offset().top;
        let elem_current_position = (distance_from_top - header_height) - window.pageYOffset;   //current distance from top of viewable area
        
        console.log(`elem_current_position: ${elem_current_position}`);

        let elem_is_on_screen = screen.height > (distance_from_top - header_height); 
        let elem_is_near_middle_of_screen = (elem_current_position - 100 >= (screen.height / 2) || elem_current_position + 100 >= (screen.height / 2));

        /**
         * 1 - if we're working with the first one, activate it on mousemove
         * 2 - if were working on the rest
         *      - is the element on screen?
         *      - is the (element position - 100) or the (element position + 100) >= half of the screen height
         */

        if(IdAnimations.count == 0 && screen_top > 20){
            console.log(`first elem element is on screen and mouse moved`);
            $current_cta.addClass('active');
            IdAnimations.count++;
        } else {
            if(elem_is_on_screen && elem_is_near_middle_of_screen) {
                console.log(`element is on screen and near middle`);
                $current_cta.addClass('active');
                IdAnimations.count++;
            }
        }
    });
}

//Kickoff jQuery
$('document').ready(function(){
    bindEvents();
});