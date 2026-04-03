/**
 * Sorian Systems — Contact Form → Google Forms Proxy
 *
 * HOW TO DEPLOY:
 * 1. Go to https://script.google.com and create a new project.
 * 2. Delete any existing code and paste this entire file.
 * 3. Click Deploy → New deployment → Web app.
 * 4. Set "Execute as" = Me, "Who has access" = Anyone.
 * 5. Click Deploy and copy the web app URL.
 * 6. In contact.html, replace PASTE_YOUR_APPS_SCRIPT_URL_HERE with that URL.
 * 7. Commit and push (or redeploy to Vercel).
 */

var FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScH57g16Ze27HI2EOdcdpXeUJMkFfa_2JjHtP9mQ5CcyBRVLg/formResponse';

var FIELD_IDS = {
  firstName: 'entry.430073066',
  lastName:  'entry.1399762612',
  email:     'entry.1603203587',
  company:   'entry.329756637',
  service:   'entry.1600795187',
  message:   'entry.509473494',
};

function doPost(e) {
  var result = { status: 'ok' };

  try {
    var body = JSON.parse(e.postData.contents);

    var payload = {};
    payload[FIELD_IDS.firstName] = body.firstName || '';
    payload[FIELD_IDS.lastName]  = body.lastName  || '';
    payload[FIELD_IDS.email]     = body.email     || '';
    payload[FIELD_IDS.company]   = body.company   || '';
    payload[FIELD_IDS.service]   = body.service   || '';
    payload[FIELD_IDS.message]   = body.message   || '';
    payload['fvv']         = '1';
    payload['fbzx']        = String(Date.now());
    payload['pageHistory'] = '0';

    UrlFetchApp.fetch(FORM_URL, {
      method: 'post',
      payload: payload,
      followRedirects: true,
      muteHttpExceptions: true,
    });

  } catch (err) {
    result = { status: 'error', error: err.message };
  }

  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

// Handles CORS preflight
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
