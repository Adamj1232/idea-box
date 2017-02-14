var $ideaTitle = $('#title');
var $ideaBody = $('#body');
var $submit = $('.submit');
var tb = $('#body').val();
var bt = $('#title').val();
titleBody = new Idea();

$('#submit').prop('disabled', true);

function prepend(idea) {
  $('.idea-field').prepend(
    '<article class="entry" id="${idea.id}">' +
    '<h3 class="title">' + ${idea.title} + '</h3>' + '<button class="delete">Delete</button>' +
    '<section><p>' + $ideaBody.val() + '</p></section>' +
    '<button class="up"></button>' +
    '<button class="down"></button>' +
    '<p class="quality">Quality: Swill</p>' +
    '</article>'

}

$('.submit').on('click', function(){
    prepend()

  );


var titleBody = new Idea(bt, tb);
  console.log(titleBody);
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
}

function sendToStorage(id, titleBody) {
  localStorage.setItem(id, JSON.stringify(titleBody));
}

function retrieveIdea() {
  // var ideaTitle = $('#title');
  // var ideaBody = $('#body');
  var userIdea = new Idea($ideaTitle.val(), $ideaBody.val());
  sendToStorage(Idea.id, titelBody);
}
