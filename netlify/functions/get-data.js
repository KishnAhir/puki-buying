exports.handler = async (event) => {
  const table = event.queryStringParameters.table || 'Inventory';
  const params = event.queryStringParameters.params || 'maxRecords=100';
  const key = process.env.AIRTABLE_KEY;
  const base = process.env.AIRTABLE_BASE || 'appeTUjJNY2unQhne';

  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${base}/${encodeURIComponent(table)}?${params}`,
      { headers: { 'Authorization': `Bearer ${key}` } }
    );
    const data = await response.json();
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(data)
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
