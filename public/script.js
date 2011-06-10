$(window).load(function() {
  $shadow = $('.shadow');
  $shadow.each(function(i, e) {
    $(e).css('width', $(e).next().css('width'));
    $(e).css('height', $(e).next().css('height'));
  });
});

$().ready(function() {
  $('img.with-shadow').wrap('<div class=wraper />').before('<div class=shadow></div>');

  $('#send').click(send);
});

function send(event) {
  var valid = true;
  valid = validName();
  valid = validEmail() && valid;
  valid = validMessage() && valid;
  if (valid) {
    $('#send').after('<span class=ok>Sending...</span>');
    $.post($SCRIPT_ROOT + '/', {
      name: $('#name').val(),
      email: $('#email').val(),
      message: $('#message').val()
    }, function(response) {
      var data = JSON.parse(response);
      console.log(response);
      $('#send').next().remove();
      $('#send').after('<span class=' + data.class + '>' + data.msg + '</span>');
      $("input[type='text'], textarea").val('');
      $('#send').next().delay(2000).fadeOut(3000);
    }),
    'json'
  }
  return false;
}
function validEmail() {
  var errors = [];
  var $email = $('#email');
  if (!$email.val().match(/.+@.+/)) {  errors.push('*incorrect format'); }
  if ($email.val().length == 0) { errors.push('*cannot be empty'); }
  printErrors($email, errors);
  return errors.length == 0;
}

function validName() {
  var errors = [];
  var $name = $('#name');
  if ($name.val().length == 0) { errors.push('*cannot be empty'); }
  printErrors($name, errors);
  return errors.length == 0;
}

function validMessage() {
  var errors = [];
  var $message = $('#message');
  if ($message.val().length == 0) { errors.push('*cannot be empty'); }
  printErrors($message, errors);
  return errors.length == 0;
}

function printErrors($field, errors) {
  $field.siblings('.error').remove();
  for (var i=0; i<errors.length; i++) {
    $field.after('<span class=error>' + errors[i] + '</span>');
  }
}
