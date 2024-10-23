import fetch from 'node-fetch';
import memoryCache from 'memory-cache';

const RATE_LIMIT_DURATION = 3600000; // 1 hour in milliseconds
const MAX_REQUESTS_PER_IP = 5;

function rateLimit(req) {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const requestCount = memoryCache.get(ip) || 0;

  if (requestCount >= MAX_REQUESTS_PER_IP) {
    return {
      status: 429,
      message: 'Too many QR scans, please try again after an hour',
    };
  }

  // Increment request count and store it in cache for 1 hour
  memoryCache.put(ip, requestCount + 1, RATE_LIMIT_DURATION);
  return { status: 200 };
}

// Google Safe Browsing API key
const apiKey = process.env.GOOGLE_SAFE_BROWSING_API_KEY;

// Call the Google Safe Browsing API to validate URLs
async function validateUrlSafety(url) {
  const apiUrl = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`;

  const body = {
    client: {
      clientId: 'ismail9k',
      clientVersion: '1.0',
    },
    threatInfo: {
      threatTypes: ['MALWARE', 'SOCIAL_ENGINEERING', 'UNWANTED_SOFTWARE'],
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

  if (data.matches) {
    return { status: 'Unsafe', message: 'Unsafe URL detected' };
  }

  return { status: 'Safe', message: 'Safe URL' };
}

export default defineEventHandler(async (event) => {
  const { req } = event.node;

  // Apply rate limiting
  const rateLimitResult = rateLimit(req);

  if (rateLimitResult.status === 429) {
    setResponseStatus(event, 429);
    return { error: rateLimitResult.message };
  }

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
    return { error: 'Error validating URL' };
  }
});
