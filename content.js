document.addEventListener("DOMContentLoaded", function() {
  console.log('=== load');
  // document.getElementById('copy').addEventListener('click', copy);
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    console.log('=== url :', url);
    document.getElementById("jiraTicket").innerHTML = "url";
  });
  function copy() {
    console.log('==copied');
  }
  
});