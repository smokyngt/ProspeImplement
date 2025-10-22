
import Button from "../components/button"
import { useCitations } from "../providers/citations-provider"
import { useState } from "react"

interface InlineCitationTextProps {
  text: string
  className?: string
}

export function InlineCitationText({ text, className }: InlineCitationTextProps) {
  const { goToCitation, getCitation, highlightedCitation } = useCitations()
  const [hoveredCitation, setHoveredCitation] = useState<string | null>(null)

  // Parser simple pour détecter les citations [1], [2], etc.
  const parseText = (text: string) => {
    const parts: (string | { type: "citation"; tag: string })[] = []
    const citationRegex = /\[(\d+)\]/g
    let lastIndex = 0
    let match

    while ((match = citationRegex.exec(text)) !== null) {
      // Ajouter le texte avant la citation
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index))
      }

  // Ajouter la citation
  parts.push({ type: "citation", tag: String(match[1] ?? "") })
      lastIndex = match.index + match[0].length
    }

    // Ajouter le texte restant
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex))
    }

    return parts
  }

  const parts = parseText(text)

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (typeof part === "string") {
          return <span key={index}>{part}</span>
        }

        const citation = getCitation(part.tag)
        const isHighlighted = highlightedCitation === part.tag

        return (
          <span key={index} className="relative inline-block">
            <sup>
              <Button
                variant="ghost"
                size="sm"
                className={`h-6 w-auto px-2 py-0 text-xs font-bold rounded-md border transition-all duration-200 ${
                  isHighlighted
                    ? "bg-primary text-primary-foreground border-primary shadow-md"
                    : "bg-accent/80 text-accent-foreground border-accent hover:bg-primary/20 hover:border-primary hover:text-primary hover:shadow-sm"
                }`}
                onClick={() => goToCitation(part.tag)}
                onMouseEnter={() => setHoveredCitation(part.tag)}
                onMouseLeave={() => setHoveredCitation(null)}
                aria-label={
                  citation
                    ? `Aller à la citation ${part.tag} (${citation.filename}, page ${citation.page})`
                    : `Citation ${part.tag}`
                }
              >
                [{part.tag}]
              </Button>
            </sup>

            {hoveredCitation === part.tag && citation && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50">
                <div className="bg-popover text-popover-foreground px-3 py-2 rounded-md shadow-lg border text-xs whitespace-nowrap">
                  <div className="font-medium">{citation.filename}</div>
                  <div className="text-muted-foreground">Page {citation.page}</div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-popover"></div>
                </div>
              </div>
            )}
          </span>
        )
      })}
    </span>
  )
}
