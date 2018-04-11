chrome.runtime.sendMessage({message: "showPageAction"});
$(document).ready(function(){
  var name =  $(".pv-top-card-section__name").text();
  var position = $(".pv-top-card-section__headline").text();
  var company = $("h3.pv-top-card-section__company").text();

  chrome.runtime.sendMessage({message: 'getCompanyUrl',name: name, position: position, company: company});

  chrome.runtime.onMessage.addListener(function(request, response, sendResponse){
    if(request.message == "SendData"){
      console.log("response");
      sendResponse({name: name, position: position, company: company});
      return true;
    }
    return true;
  });
});
