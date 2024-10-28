import { MongoClient } from 'mongodb';

const {
  RATE_LIMIT_DURATION,
  MAX_REQUESTS_PER_IP,
  MONGODB_URI,
  MONGODB_DB_NAME,
  MONGODB_RATE_LIMITER_COLLECTION_NAME,
} = process.env;

let client;

async function connectToMongo() {
  if (!client) {
    client = await MongoClient.connect(MONGODB_URI);
  }
  return client
    .db(MONGODB_DB_NAME)
    .collection(MONGODB_RATE_LIMITER_COLLECTION_NAME);
}

export default defineEventHandler(async (event) => {
  const { req, res } = event.node;

  if (!req.url.includes('/api/validate-url')) {
    return;
  }

  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const collection = await connectToMongo();

  const currentTime = Date.now();
  const requestRecord = await collection.findOne({ ip });

  if (requestRecord) {
    const { requestCount, lastRequestTime } = requestRecord;

    // Check if the time difference is less than the rate limit duration
    if (currentTime - lastRequestTime < RATE_LIMIT_DURATION) {
      if (requestCount >= MAX_REQUESTS_PER_IP) {
        res.statusCode = 429;

        return {
          status: 429,
          message: 'Too many requests, please try again after an hour',
        };
      }

      // Increment the request count and update the record
      await collection.updateOne(
        { ip },
        {
          $set: {
            requestCount: requestCount + 1,
            lastRequestTime: currentTime,
          },
        }
      );
    } else {
      // Reset the request count if the time difference exceeds the rate limit duration
      await collection.updateOne(
        { ip },
        { $set: { requestCount: 1, lastRequestTime: currentTime } }
      );
    }
  } else {
    // Create a new record for the IP address
    await collection.insertOne({
      ip,
      requestCount: 1,
      lastRequestTime: currentTime,
    });
  }
});
