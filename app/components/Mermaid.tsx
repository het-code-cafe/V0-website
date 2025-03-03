"use client"

import { useEffect, useRef } from "react"
import mermaid from "mermaid"

interface MermaidProps {
  chart: string
}

export default function Mermaid({ chart }: MermaidProps) {
  const mermaidRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    mermaid.initialize({ startOnLoad: false, securityLevel: "loose" })
    if (mermaidRef.current) {
      mermaidRef.current.innerHTML = ""
      mermaid.render("mermaid-diagram", chart).then(({ svg }) => {
        if (mermaidRef.current) {
          mermaidRef.current.innerHTML = svg
        }
      })
    }
  }, [chart])

  return <div ref={mermaidRef} className="p-4" />
}

