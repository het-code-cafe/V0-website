"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import Link from "next/link"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  imageUrl?: string | null
}

export default function Modal({ isOpen, onClose, children, imageUrl }: ModalProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(isOpen)
  }, [isOpen])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50" onClick={onClose}>
      <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100">
          <X className="h-6 w-6" />
        </button>
        <div className="p-6 max-h-[80vh] overflow-y-auto">{children}</div>
        <div className="p-4 bg-gray-100 rounded-b-lg flex justify-between items-center">
          {imageUrl && (
            <Link href={imageUrl} target="_blank" rel="noopener noreferrer" className="text-[#459578] hover:underline">
              Open image in new tab
            </Link>
          )}
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#459578] text-white rounded hover:bg-[#3a7c64] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

