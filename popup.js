document.addEventListener("DOMContentLoaded", function() {
  console.log('=== load');
  document.getElementById('copy').addEventListener('click', copy);
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    console.log('=== url :', url);
    var urlArr = url.split('/');
    var jiraTicket = urlArr[urlArr.length -1];
    console.log('=== jiraTicket :', jiraTicket);
    var jiraTicketStr = jiraTicket + ' #comment ';
    document.getElementById("jiraTicket").value = jiraTicketStr;
  });
  function copy() {
    console.log('==copied');
  }
  
});