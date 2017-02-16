
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
    <h3 class="title" contenteditable="true"> ${idea.title} </h3><span><input type="image" src="images/delete.svg" alt="image of a delete button" class="delete"> </input></span>

    <p class="ideaEdit" contenteditable="true"> ${idea.body}</p>
    <input type="image" src="images/upvote.svg" alt="image of an up arrow" class="up"></input>
    <input type="image" src="images/downvote.svg" alt="image of a down arrow" class="down"><span class="quality">quality: ${idea.quality}</span></input>

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
