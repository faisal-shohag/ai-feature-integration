'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'

export default function ImageUploader() {
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        setUploadedImageUrl(data.url)
      } else {
        console.error('Upload failed')
      }
    } catch (error) {
      console.error('Error:', error)
    }

    setUploading(false)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4">Image Uploader</h2>
        <div className="space-y-4">
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
          />
          {previewUrl && (
            <div className="mt-4">
              <Image
                src={previewUrl}
                alt="Preview"
                width={300}
                height={200}
                className="rounded-lg object-cover"
              />
            </div>
          )}
          <Button onClick={handleUpload} disabled={!file || uploading}>
            {uploading ? 'Uploading...' : 'Upload Image'}
          </Button>
          {uploadedImageUrl && (
            <div className="mt-4">
              <p className="text-green-600 font-semibold">Image uploaded successfully!</p>
              <p className="break-all">URL: {uploadedImageUrl}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}