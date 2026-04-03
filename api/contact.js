export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { firstName, lastName, email, company, service, message } = req.body;

  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Contacts`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: {
            'First Name': firstName || '',
            'Last Name':  lastName  || '',
            'Email':      email     || '',
            'Company':    company   || '',
            'Service':    service   || '',
            'Message':    message   || '',
          },
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      return res.status(500).json({ error: err });
    }

    return res.status(200).json({ status: 'ok' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
