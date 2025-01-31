window._ = require('lodash');
window.Popper = require('popper.js').default;
window.toastr = require('toastr');

//Doesnt't require JQuery
let SVG = require('svg.js');
require('svg.draggable.js');
require('svg.select.js');
require('svg.resize.js');
//require('svg.panzoom.js');

/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

try
{
  window.$ = window.jQuery = require('jquery');
  require('bootstrap');
}
catch (e)
{}

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */

let token = document.head.querySelector('meta[name="csrf-token"]');

if (token)
{
  window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
}
else
{
  console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}


/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo'

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.MIX_PUSHER_APP_KEY,
//     cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//     encrypted: true
// });


// COPY TO CLIPBOARD
// Attempts to use .execCommand('copy') on a created text field
// Falls back to a selectable alert if not supported
// Attempts to display status in Bootstrap tooltip
// ------------------------------------------------------------------------------

function deselectAll() {
  var element = document.activeElement;

  if (element && /INPUT|TEXTAREA/i.test(element.tagName)) {
    if ('selectionStart' in element) {
      element.selectionEnd = element.selectionStart;
    }
    element.blur();
  }

  if (window.getSelection) { // All browsers, except IE <=8
    window.getSelection().removeAllRanges();
  } else if (document.selection) { // IE <=8
    document.selection.empty();
  }
}

function copyToClipboard(text, el)
{
  let copyTest = document.queryCommandSupported('copy');
  let elOriginalText = el.attr('data-original-title');

  if (copyTest === true)
  {
    let copyTextArea = document.getElementById('input-copy');
    copyTextArea.select();
    try
    {
      let successful = document.execCommand('copy');
      let msg = successful ? 'Copied!' : 'Whoops, not copied!';
      el.attr('data-original-title', msg).tooltip('show');
    }
    catch (err)
    {
      console.log('Oops, unable to copy');
    }
    deselectAll();
    el.attr('data-original-title', elOriginalText);
  }
  else
  {
    // Fallback if browser doesn't support .execCommand('copy')
    window.prompt("Copy to clipboard: Ctrl+C or Command+C, Enter", text);
  }
}

$(document).ready(function()
{
  // Tooltips
  // Requires Bootstrap 3 for functionality
  $('.js-tooltip').tooltip();

  // Copy to clipboard
  // Grab any text in the attribute 'data-copy' and pass it to the
  // copy function
  $('.js-copy').click(function()
  {
    let text = $(this).attr('data-copy');
    let el = $(this);
    copyToClipboard(text, el);
  });
});
