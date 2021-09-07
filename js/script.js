$(function () {
  $("#success").css("display", "none");

  var scrolloffset = 55; //variable for menu height

  // When Scrollspy Detects a change
  $(window).on('activate.bs.scrollspy', function () {
    var hash = $('.site-nav')
      .find('a.active')
      .attr('href');

    if (hash !== '#page-about') {
      $('header nav').addClass('inbody');
    } else {
      $('header nav').removeClass('inbody');
    }

    // Animate Contact Layout when it passes scroll
    $('.animated-group').css(
      'visibility: hidden;'
    );

    if (hash === '#page-contact') {
      $('#page-contact .animated-group').addClass(
        'animated fadeInRight'
      );
    }
    if (hash === '#page-projects') {
      $('#page-projects .animated-group').addClass(
        'animated fadeInRight'
      );
    }
    if (hash === '#page-contact') {
      $('#page-projects .animated-group').addClass(
        'animated fadeInRight'
      );
    }
  });

  // Modifies modal and injects high resolution image
  $('#site-modal').on('show.bs.modal', function (event) {
    $(this)
      .find('.modal-content img')
      .attr('src', $(event.relatedTarget).data('highres'));
  });

  //Use smooth scrolling when clicking on navigation
  $('.site-nav a:not(.dropdown-toggle)').click(
    function () {
      if (
        location.pathname.replace(/^\//, '') ===
        this.pathname.replace(/^\//, '') &&
        location.hostname === this.hostname
      ) {
        var target = $(this.hash);
        target = target.length
          ? target
          : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html,body').animate(
            {
              scrollTop: target.offset().top - scrolloffset
            },
            500
          );
          return false;
        } //target.length
      } //click function
    }
  ); //smooth scrolling

  // contact form
  $('form button').click(function (e) {
    e.preventDefault();

    let name = $('form .name input').val();
    if (!name) {
      alert("Please enter a name.")
      return;
    }

    let email = $('form .email input').val();

    if (!validateEmail(email)) {
      alert("Please enter a valid email.")
      return;
    }

    let subject = $('form .subject input').val();
    if (!subject) {
      subject = "Portfolio Question";
    }

    let message = $('form .message textarea').val();
    if (!message) {
      alert("Please enter a message.")
      return;
    }

    $.ajax({
      type: 'POST',
      url: 'php/emailer.php',
      data: {
        name, email, subject, message
      }
    });

    $('form').collapse();
    $('#success').css("display", "block");
    $('#success').addClass('fadeIn');

    return false;
  });
}); // Make sure Document loaded

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}