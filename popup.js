document.addEventListener("DOMContentLoaded", function() {
  document.getElementById('copy').addEventListener('click', copy);

  function copy() {
    var copyText = document.getElementById("jiraTicket");
    copyText.select();
    document.execCommand("copy");

    var message = document.querySelector('#message');
    message.innerText = 'copied';
  }
  
});

chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    var html = request.source;
    var htmlTitle1 = html.split('</title>')[0];
    var htmlTitle2 = htmlTitle1.split('<title>')[1];
    var title = htmlTitle2.replace('[', '').replace(']', ' #comment');
    document.getElementById("jiraTicket").value = title;

    var message = document.querySelector('#message');
    message.innerText = 'Click Copy';
  }
});

function onWindowLoad() {

  var message = document.querySelector('#message');

  chrome.tabs.executeScript(null, {
    file: "getPagesSource.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  });

}

window.onload = onWindowLoad;
