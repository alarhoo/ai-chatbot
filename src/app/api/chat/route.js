import { NextResponse } from 'next/server'

export async function POST(request) {
  const { question } = await request.json()
  const apiKey = process.env.API_KEY
  const payload = {
    question: question,
  }
  console.log(payload)

  const response = await fetch(process.env.API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': `${process.env.API_KEY}`,
    },
    body: JSON.stringify(payload),
  })

  const data = await response.json()
  console.log(data)
  return NextResponse.json(data)
}
