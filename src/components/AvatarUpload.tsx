'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function AvatarUpload({
  currentAvatar,
  name,
  onUpload,
}: {
  currentAvatar?: string
  name: string
  onUpload: (url: string) => void
}) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(currentAvatar ?? '')

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)

    const formData = new FormData()
    formData.append('file', file)

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    const data = await res.json()

    if (data.url) {
      setPreview(data.url)
      onUpload(data.url)
    }

    setUploading(false)
  }

  return (
    <div className="flex items-center gap-6">
      <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200 flex items-center justify-center">
        {preview ? (
          <img src={preview} alt="Avatar" className="w-full h-full object-cover" />
        ) : (
          <span className="text-3xl font-bold text-gray-400">
            {name.charAt(0).toUpperCase()}
          </span>
        )}
      </div>
      <div>
        <label className="cursor-pointer bg-black text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-800 transition">
          {uploading ? 'Uploading...' : 'Upload Photo'}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFile}
            disabled={uploading}
          />
        </label>
        <p className="text-xs text-gray-400 mt-2">JPG, PNG up to 5MB</p>
      </div>
    </div>
  )
}