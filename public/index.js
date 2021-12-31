let myDynamicManifest = {
  "short_name": "Task Tracker",
  "name": "Task Tracker",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "logo192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "logo512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "display": "fullscreen",
  "orientation" : "portrait",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
let search = window.location.search;
let params = new URLSearchParams(search);
let listId = params.get('query');
myDynamicManifest.start_url = `./query?${listId}`;
const stringManifest = JSON.stringify(myDynamicManifest);
const blob = new Blob([stringManifest], {type: 'application/json'});
const manifestURL = URL.createObjectURL(blob);
document.querySelector('#my-manifest-placeholder').setAttribute('href', manifestURL);