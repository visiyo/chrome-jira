/* globals chrome, $ */

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('copy').addEventListener('click', copy);

  function copy() {
    var copyText = document.getElementById('jiraTicket');
    copyText.select();
    document.execCommand('copy');

    var message = document.querySelector('#message');
    message.innerText = 'copied';
  }
});

chrome.runtime.onMessage.addListener(function(request, sender) { // eslint-disable-line no-unused-vars
  if (request.action === 'getSource') {
    var html = request.source;
    var elements = $(html);
    var found = elements.filter('title');
    var ticketStr = '';
    if (found && found.text() && found.text().indexOf('[') > -1) {
      ticketStr = found.text().replace('[', '').replace(']', ' #comment');
      document.getElementById('jiraTicket').value = ticketStr;
      var message = document.querySelector('#message');
      message.innerText = 'Click Copy';
    } else { // popup
      chrome.tabs.getSelected(null, function(tab) {
        /* not work
        var storyLinkArr = elements.filter('#field-copy-text').val().split('/');
        var idStory = storyLinkArr[storyLinkArr.length -1];
        */
        /*
        var tabUrl1 = tab.url.split('TAO-')[1];
        var idStory = 'TAO-' + tabUrl1.split('&')[0];
        */
       var tabUrlArr = tab.url.split('selectedIssue=');
       if (tabUrlArr.length < 2) {
         alert('can not get ticket id');
         return;
       }
       var tabUrl = tabUrlArr[1];
       var idStory = tabUrl.split('&')[0];
       
        ticketStr = idStory + ' #comment ';

        var parser = new DOMParser();
        var doc = parser.parseFromString(html, 'text/html');
        var allH1 = doc.querySelectorAll('h1');
        allH1.forEach(function(h1) {
          if (h1.className && h1.innerHTML !== 'Flag notifications') {
            ticketStr += h1.innerHTML;
          }
        });
        document.getElementById('jiraTicket').value = ticketStr;

        var idMessage = document.querySelector('#message');
        idMessage.innerText = 'Click Copy';
      });
    }
  }
});

function onWindowLoad() {
  var message = document.querySelector('#message');

  chrome.tabs.executeScript(null, {
    file: 'app/getPagesSource.js'
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  });

}

window.onload = onWindowLoad;
