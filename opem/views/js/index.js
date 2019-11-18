$(document).ready(function() {
  
  // let's hide the whole document for a second when it's loaded
  // setTimeout(function() {
  //   $('body').css('visibility', 'visible');
  // }, 500);
  $('body').fadeIn('slow');
  
  // makes navbar dropdown
  $('.user-menu').on('mouseenter', function() { $('.dropdown').addClass('drop'); });
  $('.dropdown').on('mouseenter', function() { $('.user-menu').addClass('darken'); });
  $('.user-menu').on('mouseleave', function() { $('.dropdown').removeClass('drop'); });
  $('.dropdown').on('mouseleave', function() { $('.user-menu').removeClass('darken'); });

  // highlights active sidebar link
  $('.sidebar__item').on('click', function(event) {
    $('.sidebar__item').removeClass('sidebar__active');
    $(this).addClass('sidebar__active');
  });
  
  $('.logo-container').click(function(event) {
    $('.sidebar__item').removeClass('sidebar__active');
    $('.sidebar__item').first().addClass('sidebar__active');
  });

  // populates navbar with user info
  axios.get('/opem/user').then(function(response) {
    var user = response.data;
    user.gravatar += '?d=identicon';
    $('#user-photo').attr('src', user.gravatar);
    document.getElementById('user-name').innerText = user.username;
  });
});