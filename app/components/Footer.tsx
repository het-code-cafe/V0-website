import Link from "next/link"

export default function Footer() {
  return (
    <footer className="mt-8 py-4 text-center text-white bg-[#113428]/50 rounded-lg">
      <p>
        This website was created by{" "}
        <Link
          href="https://www.code-cafe.nl"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#459578] hover:underline"
        >
          CodeCafé
        </Link>{" "}
        as an experiment using Vercel's AI.
      </p>
      <p className="mt-2">
        Check out the original plots, code and other tools on <Link
          href="https://github.com/het-code-cafe/AI-tools-learning"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#459578] hover:underline"
        >
          GitHub
        </Link>
      </p>
    </footer>
  )
}

