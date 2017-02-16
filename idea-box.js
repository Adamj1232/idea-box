var $ideaTitle = $('#title');
var $ideaBody = $('#body');


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
   <button class="up">Upvote</button>
   <button class="down">Downvote</button>
   <p>quality:</p>
   <span class="quality">${idea.quality}</span>
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

// $('.idea-field').on('click', '.up', function() {
//   var status = $(this).siblings('.quality').text();
//   if (status === 'swill') {
//     $(this).siblings('.quality').text('plausible');
//   } else if (status === 'plausible') {
//     $(this).siblings('.quality').text('genius');
//   }
//
//   var id = $(this).closest('entry').attr('id');
//   var updated = JSON.parse(localStorage.getItem(id));
//   var currentStatus = $(this).siblings('.quality').text();
//   updated.quality = currentStatus;
//   // localStorage.setItem(id, JSON.stringify(currentStatus));
//   returnToStorage(id, updated);
// })

$('.idea-field').on('click', '.up', function (){
 var status = $(this).siblings('span').text();
 if (status === "swill") {
     status = "plausible";
     $(this).siblings('span').text("plausible");
     newStatus(this, status);
 }else if (status === "plausible") {
      status = "genius";
        $(this).siblings('span').text("genius");
          newStatus(this, status);
   }

})

/******FUNCTIONS******/

function newStatus (voteInput, status) {
 var parentId = $(voteInput).parent().attr('id');
 var getCard = JSON.parse(localStorage.getItem(parentId));
 console.log(parentId);
 console.log(getCard);
 getCard.quality = status;
 console.log(getCard.quality)
 localStorage.setItem(parentId, JSON.stringify(getCard));

}

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

function returnToStorage(id, object) {
  localStorage.setItem(id, JSON.stringify(object));
}

function retrieveIdea() {
 var storeBody = $('#body').val();
 var storeTitle = $('#title').val();
 var idea = new Idea (storeTitle, storeBody)
}
