$(function(){

  //Message recieved after the data retrieval by the background scripts to display on extension popup
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if(request.message == 'showData'){
      $('#name').text(request.name);
      $('#domain').text(request.domain);
      $('#email').text(request.emails[0].email);
      var numbers = request.emails[0].numbers;
      var list;

      //Creates a list to show on the popup
      $.each(numbers, function(index,value){
        list+='<li>'+value+'</li>';
      });
      $('#number-list').append(list);
    }
  });
});
