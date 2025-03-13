import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { question } = await request.json()
    const apiKey = process.env.API_KEY || 'xrhv1OwFqVuCNxDvhpAwlirWavsXxUVkGDFeC1bG1pg'
    const apiUrl = process.env.API_URL || 'https://chatbot-service-367407105478.asia-south1.run.app/getdatafromdocs'

    if (!question) {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 })
    }

    if (!apiKey || !apiUrl) {
      console.error('API_KEY or API_URL environment variables are not set.')
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }

    const payload = {
      question: question,
    }

    console.log('Request Payload:', payload)

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      console.error('API request failed:', response.status, response.statusText)
      let errorData
      try {
        errorData = await response.json() // Attempt to parse JSON error
      } catch (parseError) {
        console.error('Failed to parse API error response:', parseError)
        errorData = { error: 'API request failed with status: ' + response.status } // Fallback error
      }
      return NextResponse.json(errorData, { status: response.status })
    }

    const data = await response.json()
    console.log('API Response:', data)
    return NextResponse.json(data)
  } catch (error) {
    console.error('An unexpected error occurred:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
