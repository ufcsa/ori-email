const { google } = require('googleapis');
const auth = require('../config/config');
const oauth2Client = new google.auth.OAuth2(
  auth.clientId,
  auth.clientSecret,
  ''
);

// Generate a url that asks permissions for Gmail scopes
const GMAIL_SCOPES = [
  'https://mail.google.com/',
  'https://www.googleapis.com/auth/gmail.modify',
  'https://www.googleapis.com/auth/gmail.compose',
  'https://www.googleapis.com/auth/gmail.send',
];

const url = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: GMAIL_SCOPES,
});

console.info(`authUrl: ${url}`);