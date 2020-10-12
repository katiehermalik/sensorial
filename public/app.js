function loginModal() {
  if ($('.sign-up-modal').is(":visible")) {
    $('.sign-up-modal').fadeOut(1000);
  }
  $('.login-modal').fadeIn(1000);
}

function signUpModal() {
  if ($('.login-modal').is(":visible")) {
    $('.login-modal').fadeOut(1000);
  }
  $('.sign-up-modal').fadeIn(1000);
}

function modalSwitcharoo() {
  $('.sign-up-modal').fadeOut(1000);
  $('.login-modal').fadeIn(1000);
};

