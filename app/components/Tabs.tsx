"use client"

import { useState } from "react"
import PlotImage from "./PlotImage"
import MermaidDiagram from "./MermaidDiagram"

interface TabsProps {
  plots: Array<{ name: string; url: string }>
  mermaidFiles: Array<{ name: string; content: string; svgUrl: string | null }>
}

export default function Tabs({ plots, mermaidFiles }: TabsProps) {
  const [activeTab, setActiveTab] = useState("plots")

  return (
    <div className="bg-[#113428]/50 p-4 rounded-lg">
      <div className="flex mb-4">
        <button
          className={`mr-2 px-4 py-2 rounded-t-lg ${
            activeTab === "plots"
              ? "bg-[#459578] text-white font-semibold"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("plots")}
        >
          Plots ({plots.length})
        </button>
        <button
          className={`px-4 py-2 rounded-t-lg ${
            activeTab === "mermaid"
              ? "bg-[#459578] text-white font-semibold"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("mermaid")}
        >
          Mermaid Diagrams ({mermaidFiles.length})
        </button>
      </div>
      <div className="bg-[#113428] p-4 rounded-b-lg">
        {activeTab === "plots" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {plots.length > 0 ? (
              plots.map((plot) => <PlotImage key={plot.name} name={plot.name} url={plot.url} />)
            ) : (
              <p className="col-span-3 text-center text-gray-300">No plots found.</p>
            )}
          </div>
        )}
        {activeTab === "mermaid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mermaidFiles.length > 0 ? (
              mermaidFiles.map((file) => (
                <MermaidDiagram key={file.name} name={file.name} content={file.content} svgUrl={file.svgUrl} />
              ))
            ) : (
              <p className="col-span-2 text-center text-gray-300">No Mermaid diagrams found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

