var $ideaTitle = $('#title');
var $ideaBody = $('#body');
var $submit = $('.submit');

$('#submit').prop('disabled', true);

$('.submit').on('click', function(){

  $('.idea-field').prepend(
    '<article class="entry" id="${idea.id}">' +
      '<h3 class="title">' + $ideaTitle.val() + '</h3>' + '<button class="delete">Delete</button>' +
      '<section><p>' + $ideaBody.val() + '</p></section>' +
      '<button class="up"></button>' +
      '<button class="down"></button>' +
      '<p class="quality">Quality: Swill</p>' +
    '</article>'
  );
  Input();
  sendToStorage();
  clearField();
  disableSubmit();
})

$('.idea-field').on('click', '.delete', function(){
  $(this).parent('.entry').remove();
})

$('input[type=text]').on('keyup', function () {
  if ($ideaTitle.val() !== "" && $ideaBody.val() !== ""){
    $('#submit').prop('disabled', false);
  } else {
    $('#submit').prop('disabled', true);
  }
})

function disableSubmit() {
  $('#submit').prop('disabled', true);
}

function clearField() {
  {
    $ideaTitle.val("");
    $ideaBody.val("");
  }
}

function Idea(title, body) {
  this.title = $ideaTitle.val();
  this.body = $ideaBody.val();
  this.quality = 'swill';
  this.id = Date.now();
  console.log(title, body)
}

function sendToStorage(id, object) {
  localStorage.setItem(id, JSON.stringify(object));
}

function retrieveIdea() {
  var userIdea = Idea(ideaTitle, ideaBody);
  addIdea(userIdea);
  sendToStorage(Idea.id, userIdea);
}
