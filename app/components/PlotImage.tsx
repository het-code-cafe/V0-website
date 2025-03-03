"use client"

import Image from "next/image"
import { useState } from "react"
import Modal from "./ui/Modal"

interface PlotImageProps {
  name: string
  url: string
}

export default function PlotImage({ name, url }: PlotImageProps) {
  const [error, setError] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div
        className="border border-[#459578] rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="h-64 relative">
          {!error ? (
            <Image
              src={url || "/placeholder.svg"}
              alt={name}
              width={300}
              height={200}
              className="object-contain w-full h-full"
              onError={() => setError(true)}
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-200 text-gray-500">
              Failed to load image
            </div>
          )}
        </div>
        <p className="p-2 text-center truncate text-white">{name}</p>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} imageUrl={url}>
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold mb-4">{name}</h2>
          <div className="relative w-full max-h-[70vh]">
            <Image
              src={url || "/placeholder.svg"}
              alt={name}
              width={800}
              height={600}
              className="object-contain w-full h-full"
            />
          </div>
        </div>
      </Modal>
    </>
  )
}

