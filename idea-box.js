
var $ideaTitle = $('#title');
var $ideaBody = $('#body');
var $submit = $('.submit');


$(document).ready(function(){
  for (var i = 0; i < localStorage.length; i++) {
    prepend(JSON.parse(localStorage.getItem(localStorage.key(i))))
  }
});

$('#submit').prop('disabled', true);

function prepend(idea) {
  $('.idea-field').prepend(`
  <article class="entry" id="${idea.id}">
    <h3 class="title" contenteditable="true"> ${idea.title} </h3>
    <button class="delete"> Delete </button>
    <p class="ideaEdit" contenteditable="true"> ${idea.body}</p>
    <button class="up"></button>
    <button class="down"></button>
    <p class="quality">quality: ${idea.quality}</p>
  </article>
  `)
}

$('.submit').on('click', function(){
  var storeBody = $('#body').val();
  var storeTitle = $('#title').val();
  var idea = new Idea (storeTitle, storeBody)
    prepend(idea);
    sendToStorage();
    disableSubmit();
    clearField();
})

$('.idea-field').on('focusout', '.title', function(){
  var editId = $(this).parent().attr('id');
  var editTitle = $(this).closest('.title').html();
  var updated = JSON.parse(localStorage.getItem(editId));
  updated.title = editTitle;
  localStorage.setItem(editId, JSON.stringify(updated));
})

$('.idea-field').on('focusout', '.ideaEdit', function(){
  var editId = $(this).parent().attr('id');
  var editBody = $(this).closest('.ideaEdit').html();
  var updated = JSON.parse(localStorage.getItem(editId));
  updated.body = editBody;
  localStorage.setItem(editId, JSON.stringify(updated))
})

$('.idea-field').on('click', '.delete', function(){
  var rmvId = $(this).parent().attr('id');
  $(this).parent('.entry').remove();
  localStorage.removeItem(rmvId);
})

$('input[type=text]').on('keyup', function () {
  if ($ideaTitle.val() !== "" && $ideaBody.val() !== ""){
    $('#submit').prop('disabled', false);
  } else {
    $('#submit').prop('disabled', true);
  }
})


$('#search').on('keyup', function() {
  var searchInput = $(this).val().toLowerCase();
  var ideaBoxes = $('.entry');

  ideaBoxes.each(function(i, idea) {
    var ideaText = $(idea).text().toLowerCase();
    var matchedIdea = ideaText.indexOf(searchInput) !== -1;
    $(idea).toggle(matchedIdea);
  })
})

function disableSubmit() {
  $('#submit').prop('disabled', true);
}

function clearField() {
    $ideaTitle.val("");
    $ideaBody.val("");
}

function Idea(title, body) {
  this.title = title;
  this.body = body;
  this.quality = 'swill';
  this.id = Date.now();
}

function sendToStorage(idea) {
  var storeBody = $('#body').val();
  var storeTitle = $('#title').val();
  var idea = new Idea (storeTitle, storeBody)
  localStorage.setItem(idea.id, JSON.stringify(idea))
}

function retrieveIdea() {
  var storeBody = $('#body').val();
  var storeTitle = $('#title').val();
  var idea = new Idea (storeTitle, storeBody)
}
