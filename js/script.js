(function ($, root, undefined) {$(function () {'use strict'; // on ready start
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////
//        general
///////////////////////////////////////

  // css tricks snippet - http://css-tricks.com/snippets/jquery/smooth-scrolling/
  $(function() {
    $('a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 500);
          return false;
        }
      }
    });
  });

  // inserts current year
  $('.js-year').html(new Date().getFullYear());

  // detects touch device
  if ("ontouchstart" in document.documentElement){
    $('html').addClass('touch');
  }


///////////////////////////////////////
//        Navigation
///////////////////////////////////////

  // mobile nav open
  $('.js-mobile-menu-open').on('click', function(e) {
    e.preventDefault();
    $(this).addClass('mobile-icon__menu--open');
    $('.mobile-menu').toggleClass('mobile-menu--open');
  });

  // mobile nav close
  $('.js-mobile-menu-close').on('click', function(e) {
    e.preventDefault();
    $('.js-mobile-menu-open').removeClass('mobile-icon__menu--open');
    $('.mobile-menu').toggleClass('mobile-menu--open');
  });

  // current page nav highlight
  var currentPage = $('body').data('current-page');
  $('.' + currentPage + ' .microsite-nav__item--' + currentPage).addClass('microsite-nav__item--current');


///////////////////////////////////////
//      SVG image swap
///////////////////////////////////////

  // finds image with class and swaps .png with .svg in img source string
  if (Modernizr.svgasimg) {
    var svgSwap = $('img.js-svg-swap');
    svgSwap.each( function() {
      var currentSrc = $(this).attr('src'),
          newSrc = currentSrc.replace('.png', '.svg');
      $(this).attr('src', newSrc);
    });
  }


///////////////////////////////////////
//      Parallax
//      [ example: <div class="parallax" data-parallax-speed="0.2"> ]
///////////////////////////////////////

  $(document).scroll(function(){
    var scrolled = $(document).scrollTop();
    $('.parallax').each(function(){
      var speed = $(this).attr('data-parallax-speed');
      var offset = $(this).offset();
      var parallax = -(scrolled - offset.top) * speed ;
      $(this).css('background-position', 'center ' + parallax + 'px');
    });
  });


///////////////////////////////////////
//      Modal
///////////////////////////////////////

  var modal         = $('.js-modal'),
      modalContent  = $('.js-modal__content'),
      modalClose    = $('.js-modal__close'),
      modalVideo    = $('.js-modal__video');

  // EVENT - launch modal & populate with content
  $('.js-launch-modal').on('click', function(e) {

    e.preventDefault();

    // launch modal
    modal.removeClass('is-closed').addClass('is-open').fadeIn();
    $('body').css('overflow', 'hidden');

  });


  function closeModal(e) {
    e.on('click', function() {
      modal.removeClass('is-open').addClass('is-closed').fadeOut();
      $('body').css('overflow', 'auto');
    });
  }

  $(document).keyup(function(e) {
     if (e.keyCode == 27) { // escape key maps to keycode `27`
       modal.removeClass('is-open').addClass('is-closed').fadeOut();
       $('body').css('overflow', 'auto');
      }
  });

  // close modal on icon and bg click
  closeModal(modalClose);
  // closeModal(modal);


///////////////////////////////////////////////////////////////////////////////
});})(jQuery, this); // on ready end