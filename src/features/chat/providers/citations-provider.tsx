"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { eventBus } from "../lib/event-bus"

export interface Citation {
  id: string
  tag: string // [1], [2], etc.
  filename: string
  page: number
  snippet: string
  bbox?: { x: number; y: number; width: number; height: number }
}

interface CitationsContextType {
  citations: Citation[]
  addCitation: (citation: Omit<Citation, "id">) => string
  getCitation: (tag: string) => Citation | undefined
  goToCitation: (tag: string) => void
  highlightedCitation: string | null
}

const CitationsContext = createContext<CitationsContextType | null>(null)

export const useCitations = () => {
  const context = useContext(CitationsContext)
  if (!context) {
    throw new Error("useCitations must be used within a CitationsProvider")
  }
  return context
}

interface CitationsProviderProps {
  children: ReactNode
}

export function CitationsProvider({ children }: CitationsProviderProps) {
  const [citations, setCitations] = useState<Citation[]>([])
  const [highlightedCitation, setHighlightedCitation] = useState<string | null>(null)

  const addCitation = (citation: Omit<Citation, "id">): string => {
    const id = `citation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const newCitation: Citation = { ...citation, id }

    setCitations((prev) => [...prev, newCitation])
    return id
  }

  const getCitation = (tag: string): Citation | undefined => {
    return citations.find((c) => c.tag === tag)
  }

  const goToCitation = (tag: string) => {
    const citation = getCitation(tag)
    if (citation) {
      setHighlightedCitation(tag)
      eventBus.emit("pdf:goToCitation", {
        filename: citation.filename,
        page: citation.page,
        highlight: citation.snippet,
        bbox: citation.bbox,
      })

      // Retirer le highlight après 3 secondes
      setTimeout(() => setHighlightedCitation(null), 3000)
    }
  }

  return (
    <CitationsContext.Provider
      value={{
        citations,
        addCitation,
        getCitation,
        goToCitation,
        highlightedCitation,
      }}
    >
      {children}
    </CitationsContext.Provider>
  )
}
