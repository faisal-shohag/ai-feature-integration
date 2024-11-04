"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import NextImage from 'next/image'
import { useDropzone } from 'react-dropzone'

export default function ImageClassification() {
  const [file, setFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [detectedObjects, setDetectedObjects] = useState([])
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 })

 
  const getConfidenceColor = (score) => {
    if (score >= 0.9) return '#22c55e' 
    if (score >= 0.7) return '#3b82f6' 
    if (score >= 0.5) return '#eab308' 
    return '#ef4444' 
  }

  const handleFile = (selectedFile) => {
    setDetectedObjects([])
    setImageSize({ width: 0, height: 0 })

    if (selectedFile) {
      setFile(selectedFile)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result)
      }
      reader.readAsDataURL(selectedFile)

      const img = new Image()
      img.onload = () => {
        setImageSize({ width: img.width, height: img.height })
      }
      img.src = URL.createObjectURL(selectedFile)
    }
  }

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      handleFile(acceptedFiles[0])
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/classify', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        setDetectedObjects(data)
      } else {
        console.error('Classification failed')
      }
    } catch (error) {
      console.error('Error processing image:', error)
    }

    setUploading(false)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'image/gif': ['.gif'],
      'image/bmp': ['.bmp'],
      'image/webp': ['.webp'],
    },
    multiple: false,
  })

  // console.log()

  return (
    <Card className="w-full mt-5 custom-glass max-w-3xl mx-auto font-inter">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4">Image Classification</h2>
        <div className="space-y-4">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-6 cursor-pointer 
            ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p className="text-blue-500 text-center">Drop the image here...</p>
            ) : (
              <p className="text-gray-500 text-center">
                Drag & drop an image here, or click to select
              </p>
            )}
          </div>
          <div className=''>
            {previewUrl && (
              <div className="mt-4 relative flex justify-center">
                <NextImage
                  src={previewUrl}
                  alt="Preview"
                  width={600}
                  height={400}
                  className="rounded-lg object-contain"
                  unoptimized
                />
                {detectedObjects.map((obj, index) => (
                  <div
                    key={index}
                    style={{
                      position: 'absolute',
                      left: `${(obj.box.xmin / imageSize.width) * 100}%`,
                      top: `${(obj.box.ymin / imageSize.height) * 100}%`,
                      width: `${((obj.box.xmax - obj.box.xmin) / imageSize.width) * 100}%`,
                      height: `${((obj.box.ymax - obj.box.ymin) / imageSize.height) * 100}%`,
                      border: `2px solid ${getConfidenceColor(obj.score)}`,
                      boxSizing: 'border-box',
                    }}
                  >
                    <span 
                      className="absolute top-0 left-0 text-white text-xs px-1 rounded"
                      style={{ backgroundColor: getConfidenceColor(obj.score) }}
                    >
                      {obj.label} ({(obj.score * 100).toFixed(2)}%)
                    </span>
                  </div>
                ))}
              </div>
            )}
            <Button className="mt-5 w-full" onClick={handleUpload} disabled={!file || uploading}>
              {uploading ? 'Classifying...' : 'Classify Image'}
            </Button>
          </div>
          <div>
            {detectedObjects.length > 0 && (
              <div className="mt-4 space-y-3">
                <h3 className="text-xl font-semibold mb-2">Detected Objects:</h3>
                <div className="space-y-2">
                  {detectedObjects.map((obj, index) => (
                    <div key={index} className="relative">
                      <div className="flex justify-between mb-1">
                        <span>{obj.label}</span>
                        <span>{(obj.score * 100).toFixed(2)}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full transition-all duration-1000 ease-out"
                          style={{
                            width: `${obj.score * 100}%`,
                            backgroundColor: getConfidenceColor(obj.score),
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}