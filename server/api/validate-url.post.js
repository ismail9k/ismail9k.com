import fetch from 'node-fetch';

const { GOOGLE_SAFE_BROWSING_API_KEY: apiKey } = process.env;

export default defineEventHandler(async (event) => {
  try {
    // Extract URL from request body
    const body = await readBody(event);
    const { url } = body;

    if (!url) {
      return { error: 'URL is required' };
    }

    // Validate the URL via Google Safe Browsing API
    const validationResult = await validateUrlSafety(url);
    return validationResult;
  } catch (error) {
    return error;
  }
});

async function validateUrlSafety(url) {
  const apiUrl = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`;

  const body = {
    client: {
      clientId: 'ismail9k',
      clientVersion: '1.0',
    },
    threatInfo: {
      threatTypes: [
        'MALWARE',
        'SOCIAL_ENGINEERING',
        'UNWANTED_SOFTWARE',
        'POTENTIALLY_HARMFUL_APPLICATION',
      ],
      platformTypes: ['ANY_PLATFORM'],
      threatEntryTypes: ['URL'],
      threatEntries: [{ url }],
    },
  };

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (data.error) {
    return { status: 'ERROR', message: 'Error validating URL', data };
  }

  if (data.matches) {
    return { status: 'UNSAFE', message: 'Unsafe URL detected', data };
  }

  return { status: 'SAFE', message: 'Safe URL', data };
}
