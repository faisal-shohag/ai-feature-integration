import { HfInference } from '@huggingface/inference'
import { NextResponse } from 'next/server'

const hf = new HfInference("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")

export async function POST(request) {
  const data = await request.formData()
  const file = data.get('file')
  // console.log("Classifying....")

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  try {
    // Perform object detection directly on the buffer
    const result = await hf.objectDetection({
      model: 'facebook/detr-resnet-50',
      data: buffer,
    })
    // console.log("Result:", result)

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Error processing image' }, { status: 500 })
  }
}