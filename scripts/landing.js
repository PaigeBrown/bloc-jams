   var revealPoints = function(points) {

      points.css({
          opacity: 1,
          transform: 'scaleX(1) translateY(0)'
      });
    };
    // $.each($('.point'), revealPoint);

// var animatePoints = function(points) {
    // forEach($('.selling-points'), revealPoint);
// };

$(window).on('load', function () {
  if ($(window).height() > 950) {
      animatePoints(points);
  }
   var scrollDistance = $('.selling-points').offset().top - $(window).height() + 200;

   $(window).scroll(function(event) {
     if ($(window).scrollTop() >= scrollDistance) {
       revealPoints($('.point'));
     }
   });
 });

// ctrl y redo
// ctrl { } move left/right
// ctrl ? comment
