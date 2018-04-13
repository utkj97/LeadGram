//Listener to respond to messages
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){

  //If message is for activating the extension
  if(request.message == "showPageAction"){
    chrome.tabs.query({active: true, currentWindow: true},function(tabs){
        chrome.pageAction.show(tabs[0].id);
    });
  }

  //If message if to r=get company's url
  if(request.message == "getCompanyUrl"){
    var comp_name = request.company;
    console.log(comp_name);
    var full_name = request.name;
    console.log(full_name);
    var comp_domain;

    //Extracts the name of the company
    var c_name = comp_name.replace(" Inc.","");
    c_name = c_name.replace(" Inc","");
    c_name = c_name.replace(" LLC","");
    $.trim(c_name);

    //API call to clearbit to retrieve comapany url
    $.ajax({
      type: 'GET',
      url: "https://company.clearbit.com/v1/domains/find?name=" + c_name,
      headers: {'Authorization': 'Bearer sk_957549c4f720b59450c97194685b15bf'},
      success: function(output, status, xhr){
        comp_domain = output.domain;
        console.log(output.domain);

        //Fucntion call to get email and numbers and other data related to the lead and comapany
        var result = getEmailData(full_name, comp_domain, function(result){

          if(!result.error_mssg){
            sendResponse(result);
            return true;
          }
          else
            console.log(result.error_mssg);

        });
      },
      cache: false
    });
    return true;
  }
});

var getEmailData = function(full_name, comp_domain, respond){

  //API call to emailcrawlr to retrieve the email
  $.ajax({
    type: 'GET',
    url:'http://api.emailcrawlr.com/v2/email/find?full_name=' + full_name +'&domain=' + comp_domain,
    headers: {'x-api-key': '9c184b5d5c219a259a281e156c715552'},
    success:  function(output, status, xhr){
      console.log(JSON.stringify(output));
      respond(output);
    },
    error: function(xhr, status, err){
      respond({error_mssg: 'Error occured'});
    },
    cache: false
  });
};
