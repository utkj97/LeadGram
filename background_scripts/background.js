chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  if(request.message == "showPageAction"){
    chrome.tabs.query({active: true, currentWindow: true},function(tabs){
        chrome.pageAction.show(tabs[0].id);
    });
  }
  if(request.message == "getCompanyUrl"){
    var comp_name = request.company;
    console.log(comp_name);
    var full_name = request.name;
    console.log(full_name);
    var comp_domain;
    var c_name = comp_name.replace(" Inc.","");
    c_name = c_name.replace(" Inc","");
    c_name = c_name.replace(" LLC","");
    $.trim(c_name);
    full_name = full_name.replace(" ","%20");
    $.ajax({
      type: 'GET',
      url: "https://company.clearbit.com/v1/domains/find?name=" + c_name,
      headers: {'Authorization': 'Bearer sk_957549c4f720b59450c97194685b15bf'},
      success: function(output, status, xhr){
        comp_domain = output.domain;
        console.log(output.domain);
        getEmailData(full_name, comp_domain);
      }
    });

  }
});

var getEmailData = function(full_name, comp_domain){
  $.ajax({
    type: 'GET',
    url:'http://api.emailcrawlr.com/v2/email/find?full_name=' + full_name +'&domain=' + comp_domain,
    dataType: 'json',
    headers: {'x-api-key': '9c184b5d5c219a259a281e156c715552'},
    success:  function(output, status, xhr){
      console.log(JSON.stringify(output));
      console.log('Working');
    },
    cache: false
  });
}
