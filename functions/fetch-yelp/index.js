const fetch = require('node-fetch');
require('dotenv').config({ path: `.env.development.local` });

const handler = async (event) => {
  // add code here to fetch data from yelp API
  // be sure to include the parameters from event.queryStringParameters
  const { zip, search } = event.queryStringParameters;

  try {
    const response = await fetch(
      `https://api.yelp.com/v3/businesses/search?location=${zip}&term=${search}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.YELP_API_KEY}`,
        },
      }
    );
    // console.log(response);
    const data = await response.json();
    const json = JSON.stringify(data);

    return { statusCode: 200, body: json };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to fetch data' }) };
  }
};

module.exports = { handler };
