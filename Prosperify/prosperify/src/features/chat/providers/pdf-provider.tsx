"use client"

import React, { createContext, useContext, useState, useRef, useCallback, type ReactNode } from "react"
import { FuzzySearchEngine, type SearchResult } from "../lib/fuzzy-search"
import { eventBus } from "../lib/event-bus"

export interface PdfDocument {
  id: string
  name: string
  file: File
  pages: PdfPage[]
  totalPages: number
  isActive: boolean
}

export interface PdfPage {
  pageNumber: number
  text: string
  width: number
  height: number
  rendered?: boolean
}

interface PdfContextType {
  documents: PdfDocument[]
  activeDocument: PdfDocument | null
  currentPage: number
  searchEngine: FuzzySearchEngine
  addDocument: (file: File) => Promise<void>
  setActiveDocument: (id: string) => void
  setCurrentPage: (page: number) => void
  searchInDocuments: (query: string) => SearchResult[]
  goToCitation: (filename: string, page: number, highlight?: string) => void
}

const PdfContext = createContext<PdfContextType | null>(null)

export const usePdf = () => {
  const context = useContext(PdfContext)
  if (!context) {
    throw new Error("usePdf must be used within a PdfProvider")
  }
  return context
}

interface PdfProviderProps {
  children: ReactNode
}

export function PdfProvider({ children }: PdfProviderProps) {
  const [documents, setDocuments] = useState<PdfDocument[]>([])
  const [activeDocument, setActiveDocumentState] = useState<PdfDocument | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const searchEngineRef = useRef(new FuzzySearchEngine())

  const addDocument = useCallback(async (file: File): Promise<void> => {
    const id = `doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Simulation de l'extraction PDF (en réalité, utiliser pdf.js dans un web worker)
    const mockPages: PdfPage[] = Array.from({ length: 15 }, (_, i) => ({
      pageNumber: i + 1,
      text: `Contenu de la page ${i + 1} du document ${file.name}. Le présent contrat définit les modalités de collaboration entre les parties pour la réalisation des prestations définies en annexe.`,
      width: 595,
      height: 842,
      rendered: false,
    }))

    const newDocument: PdfDocument = {
      id,
      name: file.name,
      file,
      pages: mockPages,
      totalPages: mockPages.length,
      isActive: documents.length === 0,
    }

    // Index du texte pour la recherche
    mockPages.forEach((page, index) => {
      searchEngineRef.current.indexPage(index, page.text)
    })

    setDocuments((prev) => [...prev, newDocument])

    if (documents.length === 0) {
      setActiveDocumentState(newDocument)
    }
  }, [documents])

  const setActiveDocument = useCallback((id: string) => {
    setDocuments((prev) => prev.map((doc) => ({ ...doc, isActive: doc.id === id })))
    const doc = documents.find((d) => d.id === id)
    if (doc) {
      setActiveDocumentState(doc)
      setCurrentPage(1)
    }
  }, [documents])

  const searchInDocuments = useCallback((query: string): SearchResult[] => {
    return searchEngineRef.current.search(query, 10)
  }, [])

  const goToCitation = useCallback((filename: string, page: number, highlight?: string) => {
    const doc = documents.find((d) => d.name === filename)
    if (doc) {
      setActiveDocument(doc.id)
      setCurrentPage(page)
      eventBus.emit("pdf:goToCitation", { filename, page, highlight })
    }
  }, [documents, setActiveDocument])

  // Écouter les fichiers déposés
  React.useEffect(() => {
    const handleFilesDropped = (files: File[]) => {
      // sequentially add to keep ordering predictable
      ;(async () => {
        for (const file of files) {
          await addDocument(file)
        }
      })().catch(() => {
        // swallow errors to avoid unhandled rejections; could surface via UI
      })
    }

    eventBus.on("files:dropped", handleFilesDropped)
    return () => eventBus.off("files:dropped", handleFilesDropped)
  }, [addDocument])

  return (
    <PdfContext.Provider
      value={{
        documents,
        activeDocument,
        currentPage,
        searchEngine: searchEngineRef.current,
        addDocument,
        setActiveDocument,
        setCurrentPage,
        searchInDocuments,
        goToCitation,
      }}
    >
      {children}
    </PdfContext.Provider>
  )
}
