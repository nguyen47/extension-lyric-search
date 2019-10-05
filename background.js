chrome.contextMenus.create({
  id: "1",
  title: "Search Lyric",
  contexts: ["all"]
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  window.word = info.selectionText;
  chrome.windows.create(
    { url: chrome.extension.getURL("popup.html") },
    function() {
      console.log("Open Background");
    }
  );
});
