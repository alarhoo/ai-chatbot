export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  console.log(process.env.API_URL)
  try {
    const response = await fetch(process.env.API_URL, {
      method: 'POST',
      headers: {
        'x-api-key': `${process.env.API_KEY}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch search results')
    }

    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
