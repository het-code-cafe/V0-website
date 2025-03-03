"use client"

import { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import Image from "next/image"
import Modal from "./ui/Modal"

interface MermaidDiagramProps {
  name: string
  content: string
  svgUrl: string | null
}

export default function MermaidDiagram({ name, content, svgUrl }: MermaidDiagramProps) {
  const [markdownContent, setMarkdownContent] = useState<string>("")
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (content) {
      const decodedContent = atob(content)
      setMarkdownContent(decodedContent)
    }
  }, [content])

  return (
    <>
      <div
        className="border border-[#459578] rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow h-full"
        onClick={() => setIsModalOpen(true)}
      >
        {svgUrl ? (
          <div className="h-96 p-4">
            <Image
              src={svgUrl || "/placeholder.svg"}
              alt={name}
              width={400}
              height={300}
              className="object-contain w-full h-full"
            />
          </div>
        ) : (
          <div className="p-4 text-red-500">SVG not found for this diagram</div>
        )}
        <div className="p-4 border-t border-[#459578] max-h-48 overflow-y-auto">
          <ReactMarkdown>{markdownContent}</ReactMarkdown>
        </div>
        <p className="p-2 text-center truncate text-white bg-[#459578]">{name}</p>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} imageUrl={svgUrl}>
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold mb-4">{name}</h2>
          {svgUrl && (
            <div className="w-full mb-4">
              <Image
                src={svgUrl || "/placeholder.svg"}
                alt={name}
                width={800}
                height={600}
                className="object-contain w-full"
              />
            </div>
          )}
          <div className="w-full">
            <ReactMarkdown>{markdownContent}</ReactMarkdown>
          </div>
        </div>
      </Modal>
    </>
  )
}

