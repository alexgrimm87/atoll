'use strict';

/**
* Check scroll-bar width
* exemple ->   let scroll = $.scrollbarWidth();
*/
$.scrollbarWidth = function () {
    var a, b, c;if (c === undefined) {
        a = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body');b = a.children();c = b.innerWidth() - b.height(99).innerWidth();a.remove();
    }return c;
};

/**
* Scroll to the block
* @param {block} str - For what we click
* @param {targetBlock} str - to what we should scroll
*/
function scrollUp(block, targetBlock) {
    $(block).click(function (e) {
        var target = $(targetBlock).offset().top;

        $('body,html').stop().animate({ scrollTop: target }, 800);
        return false;

        e.preventDefault();
    });
}

/**
* Scroll animation
* @param {item} jquery obj - Wrapper for class 'animate-it';
*/
function animationBlock(item) {

    $(window).scroll(function () {
        checkForAnimate();
    });

    function checkForAnimate() {
        var bottomCheck = $(window).height() + $(window).scrollTop();
        var windowTop = $(window).scrollTop() + $(window).height() / 1.5;
        item.each(function () {
            if (windowTop > $(this).offset().top || bottomCheck > $('body').height() * 0.98) {

                var itemSect = $(this);
                var point = 0;
                itemSect.find('.animate-it').addClass('animated');

                var timer = setInterval(function () {
                    itemSect.find('.animate-delay').eq(point).addClass('animated');
                    point++;
                    if (itemSect.find('.animate-delay').length == point) {
                        clearInterval(timer);
                    }
                }, 200);
            }
        });
    }
    checkForAnimate();
}

/**
* GO TO href (smooth)
*/
function goTo() {
    $('.js-landNav a').click(function (e) {
        e.preventDefault();
        $('.js-landNav a').removeClass('active');
        $(this).addClass('active');
        var href = $(this).attr('href');
        var target = $(href).offset().top;
        $('body,html').animate({ scrollTop: target }, 500);
    });
}

/**
* Cut text script
* (Add to  div class "cut-text" width data-attr "data-cut"(length letters to show) )
*/
function cutText() {
    var filler = '...';
    var filler_length = filler.length;
    $('.cut-text').each(function () {
        var value = $(this).data('cut') - filler_length;
        var text = $.trim($(this).text());
        if (text.length > value && value > 0) {
            var newText = text.substring(0, value) + filler;
            $(this).text(newText);
        }
    });
};

/**
* Functional header butter
* @param {menuMobile} jquery obj - For what we click
* @param {toggleMenu} jquery obj - to what menu we will slideToggle
*/
function headeButer(menuMobile, toggleMenu) {
    if (menuMobile) {
        menuMobile.click(function (event) {
            if ($(window).width() < 1024 - $.scrollbarWidth()) {
                $(this).toggleClass('active');
                toggleMenu.stop().slideToggle();
            }
        });

        $(document).on('click touchstart', function (event) {
            if ($(window).width() < 1024 - $.scrollbarWidth()) {
                var div = toggleMenu;
                if (!div.is(event.target) && div.has(event.target).length === 0 && !menuMobile.is(event.target) && menuMobile.has(event.target).length === 0) {
                    toggleMenu.slideUp();
                    menuMobile.removeClass('active');
                }
            }
        });
    }
}

/**
* Expresion for numbers with spaces
* @param {x} number
* @return {string}
*/
function numberWithSpaces(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(".");
}

getOS();
function getOS() {
    var userAgent = window.navigator.userAgent,
        platform = window.navigator.platform,
        macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
        windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
        iosPlatforms = ['iPhone', 'iPad', 'iPod'],
        os = null;

    if (macosPlatforms.indexOf(platform) !== -1) {
        os = 'MacOS';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
        os = 'iOS';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
        os = 'Windows';
    } else if (/Android/.test(userAgent)) {
        os = 'Android';
    } else if (!os && /Linux/.test(platform)) {
        os = 'Linux';
    }

    $('html').addClass(os);

    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('safari') != -1) {
        if (ua.indexOf('chrome') > -1) {
            $('html').addClass('chrome-br'); // Chrome
        } else {
            $('html').addClass('safari-br'); // Safari
        }
    }
}

$(document).ready(function () {

    $('.footer_placeholder').height($('.footer').outerHeight());

    cutText();

    goTo();
});

$(window).resize(function () {

    $('.footer_placeholder').height($('.footer').outerHeight());
});
'use strict';

function headerSlider(selector) {
  $(selector).slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    autoplay: true,
    autoplaySpeed: 4000
  });
};

function reviewsSlider(selector) {
  $(selector).slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    draggable: false,
    asNavFor: '.js-reviewsNav'
  });
};

function reviewsSliderNav(selector, prev, next) {
  $(selector).slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    vertical: true,
    asNavFor: '.js-reviews',
    dots: false,
    arrows: false,
    focusOnSelect: true,
    verticalSwiping: true,
    responsive: [{
      breakpoint: 801,
      settings: {
        vertical: false,
        verticalSwiping: false
      }
    }, {
      breakpoint: 512,
      settings: {
        vertical: false,
        verticalSwiping: false,
        slidesToShow: 2
      }
    }]
  });

  $(prev).on('click', function (e) {
    e.preventDefault();
    $(selector).slick('slickPrev');
  });

  $(next).on('click', function (e) {
    e.preventDefault();
    $(selector).slick('slickNext');
  });
};

function servicesSlider(selector, prev, next) {
  $(selector).slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    draggable: false,
    asNavFor: '.js-servicesNav'
  });

  $(prev).on('click', function (e) {
    e.preventDefault();
    $(selector).slick('slickPrev');
  });

  $(next).on('click', function (e) {
    e.preventDefault();
    $(selector).slick('slickNext');
  });

  $(selector).on('afterChange', function () {
    sliderCount('.services-slider__item', '.js-servicesCurent', '.js-servicesLength');
  });
};

function servicesSliderNav(selector, prev, next) {
  $(selector).slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    vertical: true,
    asNavFor: '.js-services',
    dots: false,
    arrows: false,
    focusOnSelect: true,
    verticalSwiping: true,
    responsive: [{
      breakpoint: 1222,
      settings: {
        vertical: false,
        verticalSwiping: false
      }
    }, {
      breakpoint: 545,
      settings: {
        focusOnSelect: true,
        verticalSwiping: true
      }
    }]
  });

  $(prev).on('click', function (e) {
    e.preventDefault();
    $(selector).slick('slickPrev');
  });

  $(next).on('click', function (e) {
    e.preventDefault();
    $(selector).slick('slickNext');
  });
};

function clientsSlider(selector, prev, next) {
  $(selector).slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    fade: false,
    responsive: [{
      breakpoint: 1441,
      settings: {
        slidesToShow: 3
      }
    }, {
      breakpoint: 1153,
      settings: {
        slidesToShow: 2
      }
    }, {
      breakpoint: 720,
      settings: {
        slidesToShow: 1
      }
    }]
  });

  $(prev).on('click', function (e) {
    e.preventDefault();
    $(selector).slick('slickPrev');
  });

  $(next).on('click', function (e) {
    e.preventDefault();
    $(selector).slick('slickNext');
  });
};

function projectSlider(selector, prev, next) {
  $(selector).slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    dots: false,
    arrows: false,
    verticalSwiping: true,
    infinite: false,
    responsive: [{
      breakpoint: 1119,
      settings: {
        vertical: false,
        verticalSwiping: false
      }
    }]
  });

  $(prev).on('click', function (e) {
    e.preventDefault();
    $(selector).slick('slickPrev');
  });

  $(next).on('click', function (e) {
    e.preventDefault();
    $(selector).slick('slickNext');
  });

  $(selector).on('afterChange', function () {
    sliderCount('.js-projectSlider li', '.js-projectCurent', '.js-projectLength');
  });
};

function pricesSlider(selector, prev, next) {
  $(selector).slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: false,
    infinite: false
  });

  $(prev).on('click', function (e) {
    e.preventDefault();
    $(selector).slick('slickPrev');
  });

  $(next).on('click', function (e) {
    e.preventDefault();
    $(selector).slick('slickNext');
  });

  $(selector).on('afterChange', function () {
    sliderCount('.price-design .prices-slider__slide', '.js-designCurent', '.js-designLength');
    sliderCount('.price-engine .prices-slider__slide', '.js-engineCurent', '.js-engineLength');
    sliderCount('.price-repairs .prices-slider__slide', '.js-repairsCurent', '.js-repairsLength');
  });
};

function clientsWrapSlider(selector) {
  $(selector).slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [{
      breakpoint: 1187,
      settings: {
        slidesToShow: 3
      }
    }, {
      breakpoint: 1025,
      settings: {
        slidesToShow: 2
      }
    }, {
      breakpoint: 801,
      settings: {
        slidesToShow: 1,
        arrows: false
      }
    }]
  });
};

function sliderCount(item, current, length) {
  var index = parseInt($(item + '.slick-current.slick-active').attr('data-slick-index')) + 1;
  var number = $(item).length;
  $(current).text('0' + index);
  $(length).text('0' + number);
}

function onScroll(event) {
  var scrollPos = $(document).scrollTop() + 500;
  if ($('.services').css('display') == 'none') {
    $('.js-landNav li:nth-child(3)').hide();
    $('.js-landNav li').not(':nth-child(3)').find('a').each(function () {
      var currLink = $(this);
      var refElement = $(currLink.attr('href'));
      if (refElement.position().top <= scrollPos) {
        $('.js-landNav a').removeClass('active');
        currLink.addClass('active');
      } else {
        currLink.removeClass("active");
      }
    });
  } else {
    $('.js-landNav li:nth-child(3)').show();
    $('.js-landNav a').each(function () {
      var currLink = $(this);
      var refElement = $(currLink.attr('href'));
      if (refElement.position().top <= scrollPos) {
        $('.js-landNav a').removeClass('active');
        currLink.addClass('active');
      } else {
        currLink.removeClass("active");
      }
    });
  }
}

function tabs() {
  $('.tab-content__item').not(':first').hide();
  $('.js-tab .tabs-list__item').click(function () {
    $('.js-tab .tabs-list__item').removeClass('active').eq($(this).index()).addClass('active');
    $('.js-tab .tab-content__item').hide().eq($(this).index()).fadeIn();
    $('.js-pricesSlider').slick('setPosition');
  }).eq(0).addClass('active');
}

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: mapCenterY, lng: mapCenterX },
    scrollwheel: false,
    zoom: mapZoom,
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false
  });

  var marker = new google.maps.Marker({
    position: { lat: mapMarkerY, lng: mapMarkerX },
    map: map
  });
}

$(document).ready(function () {

  $('.js-menuLink').on('click', function (event) {
    event.preventDefault();
    $('.js-menu').addClass('active');
    return false;
  });

  $('.js-menuClose').on('click', function () {
    $('.js-menu').removeClass('active');
  });

  $(document).on('scroll', onScroll);

  tabs();

  //sliders
  headerSlider('.js-headerSlider');
  reviewsSlider('.js-reviews');
  reviewsSliderNav('.js-reviewsNav', '.js-reviewsPrev', '.js-reviewsNext');
  servicesSlider('.js-services', '.js-servicesPrev', '.js-servicesNext');
  servicesSliderNav('.js-servicesNav', '.js-servicesPrev', '.js-servicesNext');
  clientsWrapSlider('.clients__wrap');
  clientsSlider('.js-clients', '.js-clientsPrev', '.js-clientsNext');
  projectSlider('.js-projectSlider', '.js-projectPrev', '.js-projectNext');
  pricesSlider('.js-pricesSlider', '.js-pricesPrev', '.js-pricesNext');

  sliderCount('.services-slider__item', '.js-servicesCurent', '.js-servicesLength');
  sliderCount('.js-projectSlider li', '.js-projectCurent', '.js-projectLength');
  sliderCount('.price-design .prices-slider__slide', '.js-designCurent', '.js-designLength');
  sliderCount('.price-engine .prices-slider__slide', '.js-engineCurent', '.js-engineLength');
  sliderCount('.price-repairs .prices-slider__slide', '.js-repairsCurent', '.js-repairsLength');

  $('.js-categoryBtn').on('click', function (e) {
    e.preventDefault();
    $('.services').addClass('active');
    var page = $('html, body');
    var categoryIndex = $(this).closest('.category__item').index();
    var categoryEl = $(this).attr('href');
    $('.js-services').slick('unslick');
    servicesSlider('.js-services', '.js-servicesPrev', '.js-servicesNext');
    $('.js-servicesNav').slick('unslick');
    servicesSliderNav('.js-servicesNav', '.js-servicesPrev', '.js-servicesNext');
    $('.js-servicesNav').slick('setPosition');
    $('.js-services').slick('slickGoTo', categoryIndex);

    page.on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function () {
      page.stop();
    });
    page.animate({ scrollTop: $(categoryEl).offset().top }, 1000, function () {
      page.off("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove");
    });
    return false;
  });

  //category
  $('.js-category li').mouseenter(function () {
    $(this).addClass('active');
    $('.js-category').children().not($(this)).addClass('little');
  }).mouseleave(function () {
    $(this).removeClass('active');
    $('.js-category').children().not($(this)).removeClass('little');
  });

  //autocomplete
  var searchTags = ["ActionScript", "AppleScript", "Asp", "BASIC", "C", "C++", "Clojure", "COBOL", "ColdFusion", "Erlang", "Fortran", "Groovy", "Haskell", "Java", "JavaScript", "Lisp", "Perl", "PHP", "Python", "Ruby", "Scala", "Scheme"];

  $('.js-search').autocomplete({
    source: searchTags
  });

  $('.js-select').on('change', function () {
    $('.js-searchForm').submit();
  });

  $('.js-select').styler();

  //popups
  $('.js-сallPopup').click(function (e) {
    e.preventDefault();
    var page = $(this).attr('data-page');
    $('.сall-order input[name="page"]').val(page);
    $.fancybox.open({
      src: "#сall-order"
    });
  });

  $('.js-servicePopup').click(function (e) {
    e.preventDefault();
    var page = $(this).attr('data-page');
    var plan = $(this).closest('.prices-item').find('.prices-item__title h2').text();
    $('.service-order input[name="plan"]').val(plan);
    $('.service-order input[name="page"]').val(page);
    $.fancybox.open({
      src: "#service-order"
    });
  });

  $('a[href="#search-popup"]').on('click', function (event) {
    $('#search-popup').addClass('open');
  });

  $('#search-popup, .js-searchClose').on('click', function (event) {
    if (event.target == this) {
      $(this).removeClass('open');
    }
  });

  $('.js-searchClose').on('click', function (event) {
    $('#search-popup').removeClass('open');
  });

  $('.js-searchClear').on('click', function (event) {
    event.preventDefault();
    $('#main-search').val('');
  });

  //map
  if ($('.contacts').length) {
    initMap();
  }

  // main menu scripts
  $(document).click(function (e) {
    if ($(e.target).closest('.menu__wrap-second').length) return;
    $('.js-menu').removeClass('active');
    $('.menu-second-level').removeClass('active');
    e.stopPropagation();
  });

  $('.menu-list>li>a').hover(function (e) {
    var that = $(this);
    if (that.next().is('ul')) {
      $('.menu-second-level').empty();
      var menu = that.next().clone(true);

      $('.menu-second-level').append(menu).addClass('active');
      roundAligncalc();
    } else {
      setTimeout(function () {
        console.info("that", that);
        if ($('.menu-second-level').is(':hover')) {
          console.log('eyp');
        } else {
          if (!that.next().is('ul')) {
            console.log('check');
            $('.menu-second-level').removeClass('active');
          }
        }
        //$('.menu-second-level').removeClass('active');
      }, 600);
    }
  }, function () {});

  //mobile arrow
  $('.menu-list>li').each(function (i, item) {
    if ($(item).find('>ul').length > 0) {
      $(item).prepend('<div class="mobile-arrow"></div>');
    }
  });
  $(document).on('click', '.menu-list .mobile-arrow', function () {
    $(this).toggleClass('active');
  });

  function roundAligncalc() {
    var needWidth = $('.menu-second-level').outerWidth() - $('.menu__wrap-second').outerWidth();

    var items = $('.menu-second-level li');
    items.width(needWidth * 0.58);
    var itemsLength = items.length;

    var itemsLengthHalf = itemsLength / 2;
    var coefWidth = 0;
    var magicCoef = 0.8;
    var magicCoefSecond = 0.8;

    switch (itemsLength) {
      case (1, 2, 3, 4, 5):
        magicCoef = 2.5;
        magicCoefSecond = 2.5;
        break;
      case 6:
        magicCoef = 0.4;
        magicCoefSecond = 0.8;
        break;
      case 7:
        break;
      case 8:
        magicCoef = 0.4;
        magicCoefSecond = 0.33;
        break;
    }

    if (itemsLength > 4) {
      items.each(function (i, item) {
        if (i < itemsLengthHalf) {
          if (coefWidth == 0) {
            coefWidth = needWidth;
          }
          coefWidth = coefWidth / (itemsLengthHalf * magicCoef);
          $(item).css({ 'margin-left': '-' + coefWidth + 'px' });
        } else {
          coefWidth = coefWidth * (itemsLengthHalf * magicCoefSecond);
          $(item).css({ 'margin-left': '-' + coefWidth + 'px' });
        }
      });
    }
  }
});

$(window).load(function () {});

$(window).resize(function () {});