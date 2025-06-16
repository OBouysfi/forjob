// js Document


;(function ($) {
  'use strict'

  //-------------- Click event to scroll to top
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 200) {
      $('.scroll-top').fadeIn()
    } else {
      $('.scroll-top').fadeOut()
    }
  })
  $('.scroll-top').on('click', function () {
    $('html, body').animate({ scrollTop: 0 })
    return false
  })



  // ----------------------------- Counter Function
  var timer = $('.counter')
  if (timer.length) {
    $('.counter').counterUp({
      delay: 10,
      time: 1200
    })
  }

  // ------------------------ Navigation Scroll
  $(window).on('scroll', function () {
    var sticky = $('.sticky-menu'),
      scroll = $(window).scrollTop()
    if (scroll >= 180) sticky.addClass('fixed')
    else sticky.removeClass('fixed')
  })

  // -------------------- Remove Placeholder When Focus Or Click
  $('input,textarea').each(function () {
    $(this).data('holder', $(this).attr('placeholder'))
    $(this).on('focusin', function () {
      $(this).attr('placeholder', '')
    })
    $(this).on('focusout', function () {
      $(this).attr('placeholder', $(this).data('holder'))
    })
  })

  // ---------------- Grid And List
  if ($('.product-gallery').length) {
    $('#list-btn').on('click', function () {
      $('.item').addClass('list-style')
      $(this).addClass('active')
      $('#grid-btn').removeClass('active')
    })

    $('#grid-btn').on('click', function () {
      $('.item').removeClass('list-style')
      $(this).addClass('active')
      $('#list-btn').removeClass('active')
    })
  }

  // ---------------------- Filter More Item Button
  if ($('.more-btn').length) {
    $('.more-btn').on('click', function () {
      let $more = $(this).siblings('ul').toggleClass('show')

      if ($more.hasClass('show')) {
        $(this).html('<i class="bi bi-dash"></i> Show Less')
      } else {
        $(this).html('<i class="bi bi-plus"></i> Show More')
      }
    })
  }

  // ---------------------- Grid and List Switcher

  $(document).on('click', '.list-btn', function () {
    $(this).removeClass('active')
    $('.grid-btn').addClass('active')
    $('.grid-style').removeClass('show')
    $('.list-style').addClass('show')
  })

  $(document).on('click', '.grid-btn', function () {
    $(this).removeClass('active')
    $('.list-btn').addClass('active')
    $('.grid-style').addClass('show')
    $('.list-style').removeClass('show')
  })

  // ------------------------ Expert Slider One
  if ($('.expert-slider-one').length) {
    $('.expert-slider-one').slick({
      dots: false,
      arrows: true,
      lazyLoad: 'ondemand',
      prevArrow: $('.prev_a'),
      nextArrow: $('.next_a'),
      centerPadding: '0px',
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2
          }
        }
      ]
    })
  }

  // ------------------------ Expert Slider Two
  if ($('.expert-slider-two').length) {
    $('.expert-slider-two').slick({
      dots: true,
      arrows: false,
      lazyLoad: 'ondemand',
      centerPadding: '0px',
      slidesToShow: 4,
      slidesToScroll: 2,
      autoplay: false,
      autoplaySpeed: 3000,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    })
  }

  // ------------------------ Feedback Slider One

  // ------------------------ Feedback Slider Two
  if ($('.feedback-slider-two').length) {
    $('.feedback-slider-two').slick({
      dots: true,
      arrows: false,
      lazyLoad: 'ondemand',
      centerPadding: '0px',
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 300000,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    })
  }

  // ------------------------ Company Review Slider
  if ($('.company-review-slider').length) {
    $('.company-review-slider').slick({
      dots: true,
      arrows: false,
      lazyLoad: 'ondemand',
      centerPadding: '0px',
      slidesToShow: 2,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    })
  }
  if ($('.candidate-review-slider').length) {
    $('.candidate-review-slider').slick({
      dots: false,
      arrows: false,
      lazyLoad: 'ondemand',
      centerPadding: '0px',
      slidesToShow: 2,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    })
  }


  // -----------------------Location Range
  if ($('#locationRange').length) {
    $('#locationRange').on('mousemove', function () {
      $('#rangeValue').text($('#locationRange').val())
    })
  }

  // --------------------------------- Contact Form
  // init the validator
  // validator files are included in the download package
  // otherwise download from http://1000hz.github.io/bootstrap-validator

  if ($('#contact-form').length) {
    $('#contact-form').validator()
    // when the form is submitted
    $('#contact-form').on('submit', function (e) {
      // if the validator does not prevent form submit
      if (!e.isDefaultPrevented()) {
        var url = 'inc/contact.php'

        // POST values in the background the the script URL
        $.ajax({
          type: 'POST',
          url: url,
          data: $(this).serialize(),
          success: function (data) {
            // data = JSON object that contact.php returns

            // we recieve the type of the message: success x danger and apply it to the
            var messageAlert = 'alert-' + data.type
            var messageText = data.message

            // let's compose Bootstrap alert box HTML
            var alertBox =
              '<div class="alert ' +
              messageAlert +
              ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
              messageText +
              '</div>'

            // If we have messageAlert and messageText
            if (messageAlert && messageText) {
              // inject the alert to .messages div in our form
              $('#contact-form').find('.messages').html(alertBox)
              // empty the form
              $('#contact-form')[0].reset()
            }
          }
        })
        return false
      }
    })
  }
  // ------------------------ Password Toggler
  if ($('.user-data-form').length) {
    $('.passVicon').on('click', function () {
      $('.passVicon').toggleClass('eye-slash')
      var input = $('.pass_log_id')
      if (input.attr('type') === 'password') {
        input.attr('type', 'text')
      } else {
        input.attr('type', 'password')
      }
    })
  }
  // -------------------------- Dashboard Mobile Sidebar
  if ($('.dash-mobile-nav-toggler').length) {
    $('.dash-mobile-nav-toggler').on('click', function () {
      $('.dash-aside-navbar').addClass('show')
    })
    $('.dash-aside-navbar .close-btn').on('click', function () {
      $('.dash-aside-navbar').removeClass('show')
    })
  }

  $(window).on('load', function () {
    // makes sure the whole site is loaded

    // -------------------- Site Preloader
    $('#ctn-preloader').fadeOut() // will first fade out the loading animation
    $('#preloader').delay(350).fadeOut('slow') // will fade out the white DIV that covers the website.
    $('body').delay(350).css({ overflow: 'visible' })

    // ------------------------------- Scroll Animation
    var wow = new WOW({
      boxClass: 'wow', // animated element css class (default is wow)
      animateClass: 'animated', // animation css class (default is animated)
      offset: 0, // distance to the element when triggering the animation (default is 0)
      mobile: true, // trigger animations on mobile devices (default is true)
      live: true // act on asynchronously loaded content (default is true)
    })
    wow.init()

    // ------------------------------------- Fancybox
    var fancy = $('.fancybox')
    if (fancy.length) {
      fancy.fancybox({
        arrows: true,
        buttons: [
          'zoom',
          //"share",
          'slideShow',
          //"fullScreen",
          //"download",
          'thumbs',
          'close'
        ],
        animationEffect: 'zoom-in-out',
        transitionEffect: 'zoom-in-out'
      })
    }

    // ----------------------------- isotop gallery
    if ($('#isotop-gallery-wrapper').length) {
      var $grid = $('#isotop-gallery-wrapper').isotope({
        // options
        itemSelector: '.isotop-item',
        percentPosition: true,
        masonry: {
          // use element for option
          columnWidth: '.grid-sizer'
        }
      })

      // filter items on button click
      $('.isotop-menu-wrapper').on('click', 'li', function () {
        var filterValue = $(this).attr('data-filter')
        $grid.isotope({ filter: filterValue })
      })

      // change is-checked class on buttons
      $('.isotop-menu-wrapper').each(function (i, buttonGroup) {
        var $buttonGroup = $(buttonGroup)
        $buttonGroup.on('click', 'li', function () {
          $buttonGroup.find('.is-checked').removeClass('is-checked')
          $(this).addClass('is-checked')
        })
      })
    }
  }) //End On Load Function

})(jQuery)
