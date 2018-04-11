//Sends message to baclground script to make the extension active
chrome.runtime.sendMessage({message: "showPageAction"});


$(document).ready(function(){
  //Extracts the name, position and company
  var name =  $(".pv-top-card-section__name").text();
  var position = $(".pv-top-card-section__headline").text();
  var company = $("h3.pv-top-card-section__company").text();

  //Sends a message to background script to get company url
  chrome.runtime.sendMessage({message: 'getCompanyUrl',name: name, position: position, company: company},function(response){
    response.message = 'showData';
    chrome.runtime.sendMessage(response);
  });

});
