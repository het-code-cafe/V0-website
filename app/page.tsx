import { Octokit } from "@octokit/rest"
import Image from "next/image"
import Tabs from "./components/Tabs"
import Footer from "./components/Footer"

const octokit = new Octokit()

async function getFiles(path: string) {
  try {
    const response = await octokit.repos.getContent({
      owner: "het-code-cafe",
      repo: "AI-tools-learning",
      path: path,
    })

    if (Array.isArray(response.data)) {
      if (path === "plots") {
        return response.data
          .filter((file) => file.type === "file" && file.name.match(/\.(jpg|jpeg|png|gif|svg|webp)$/i))
          .map((file) => ({
            name: file.name,
            url: file.download_url,
          }))
      } else {
        const mdFiles = response.data.filter((file) => file.name.endsWith(".md"))

        return await Promise.all(
          mdFiles.map(async (file) => {
            const svgName = file.name.replace(".md", ".svg")
            const svgFile = response.data.find((f) => f.name === svgName)

            const contentResponse = await octokit.repos.getContent({
              owner: "het-code-cafe",
              repo: "AI-tools-learning",
              path: `${path}/${file.name}`,
            })

            return {
              name: file.name,
              content: contentResponse.data.content,
              svgUrl: svgFile ? svgFile.download_url : null,
            }
          }),
        )
      }
    }
    return []
  } catch (error) {
    console.error(`Error fetching files from ${path}:`, error)
    return []
  }
}

export default async function Home() {
  const plots = await getFiles("plots")
  const mermaidFiles = await getFiles("mermaid")

  return (
    <main className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-8">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ADx5yQ6qkkIB2zEsjd1Jso165izdzQ.png"
          alt="CodeCafe Logo"
          width={200}
          height={50}
          className="object-contain"
        />
        <h1 className="text-3xl font-bold text-white">AI Plots and Diagrams</h1>
      </div>
      <Tabs plots={plots} mermaidFiles={mermaidFiles} />
      <Footer />
    </main>
  )
}

