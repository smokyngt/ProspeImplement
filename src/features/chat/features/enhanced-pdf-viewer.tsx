"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Button from "../components/button"
import { Input } from "../components/InputChat"
import { ZoomIn, ZoomOut, Search, Download, RotateCw, BookOpen, Loader2 } from "lucide-react"
import { usePdf } from "../providers/pdf-provider"
import { useCitations } from "../providers/citations-provider"
import { eventBus } from "../lib/event-bus"

export function EnhancedPdfViewer() {
  const { documents, activeDocument, currentPage, setCurrentPage, setActiveDocument } = usePdf()
  const { highlightedCitation, citations } = useCitations()
  const [zoom, setZoom] = useState(100)
  const [searchTerm, setSearchTerm] = useState("")
  const [highlightedArea, setHighlightedArea] = useState<{
    page: number
    bbox?: { x: number; y: number; width: number; height: number }
    text?: string
  } | null>(null)
  const viewerRef = useRef<HTMLDivElement>(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const [isRendering, setIsRendering] = useState(false)

  // Écouter les événements de navigation vers les citations
  useEffect(() => {
  const handleGoToCitation = (data: { filename: string; page: number; highlight?: string; bbox?: { x: number; y: number; width: number; height: number } }) => {
      if (activeDocument?.name === data.filename) {
        setCurrentPage(data.page)
        const next: { page: number; bbox?: { x: number; y: number; width: number; height: number }; text?: string } = {
          page: data.page,
        }
        if (data.bbox) next.bbox = data.bbox
        if (typeof data.highlight === "string") next.text = data.highlight
        setHighlightedArea(next)

        // Retirer le highlight après 3 secondes
        setTimeout(() => setHighlightedArea(null), 3000)
      }
    }

    eventBus.on("pdf:goToCitation", handleGoToCitation)
    return () => eventBus.off("pdf:goToCitation", handleGoToCitation)
  }, [activeDocument, setCurrentPage])

  const handleDocumentSwitch = useCallback(
    (docId: string) => {
      setActiveDocument(docId)
      setIsRendering(true)
      setTimeout(() => setIsRendering(false), 400)
    },
    [setActiveDocument],
  )

  const getCitationMarkersForPage = (pageNumber: number) => {
    return Object.entries(citations).filter(([, citation]) => citation.page === pageNumber)
  }

  if (!activeDocument) {
    return (
      <div className="h-full flex items-center justify-center bg-card">
        <div className="text-center">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Aucun document ouvert</h3>
          <p className="text-muted-foreground">Glissez-déposez un fichier PDF pour commencer</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-card">
      {/* Document Tabs */}
      <div className="border-b border-border bg-muted/30">
        <div className="flex overflow-x-auto items-center gap-2 px-2">
          {documents.map((doc) => (
            <button
              key={doc.id}
              onClick={() => handleDocumentSwitch(doc.id)}
              className={`px-4 py-2 text-sm whitespace-nowrap border-b-2 transition-colors ${
                doc.isActive
                  ? "border-accent text-orange-500 bg-transparent"
                  : "border-transparent text-muted-foreground text-black hover:text-foreground hover:bg-orange-50"
              }`}
            >
              <div className="flex items-center gap-2">
                <BookOpen className="h-3 w-3" />
                {doc.name}
              </div>
            </button>
          ))}
          {documents.length > 0 && isRendering && (
            <span className="ml-auto inline-flex items-center gap-2 text-xs text-muted-foreground">
              <Loader2 className="h-3 w-3 animate-spin" /> Rendu...
            </span>
          )}
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 border-b border-border bg-muted/30">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setZoom(Math.max(50, zoom - 25))}>
            <ZoomOut className="h-3 w-3" />
          </Button>
          <span className="text-sm font-medium min-w-[60px] text-center">{zoom}%</span>
          <Button variant="outline" size="sm" onClick={() => setZoom(Math.min(200, zoom + 25))}>
            <ZoomIn className="h-3 w-3" />
          </Button>
          <div className="w-px h-4 bg-border mx-2" />
          <Button variant="outline" size="sm">
            <RotateCw className="h-3 w-3" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setIsDownloading(true)
              setTimeout(() => setIsDownloading(false), 1200)
            }}
            disabled={isDownloading}
            title={isDownloading ? "Téléchargement…" : "Télécharger"}
          >
            {isDownloading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Download className="h-3 w-3" />}
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
            <Input
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 h-8 w-40 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Page Navigation */}
      <div className="flex items-center justify-between p-3 border-b border-border bg-muted/30">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          >
            Précédent
          </Button>
          <span className="text-sm">
            Page {currentPage} sur {activeDocument.totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === activeDocument.totalPages}
            onClick={() => setCurrentPage(Math.min(activeDocument.totalPages, currentPage + 1))}
          >
            Suivant
          </Button>
        </div>
      </div>

      {/* PDF Content avec surlignage */}
      <div className="flex-1 overflow-auto bg-muted/20 p-4" ref={viewerRef}>
        <div className="max-w-full mx-auto">
          <div
            className="bg-white shadow-lg mx-auto border relative"
            style={{
              width: `${(595 * zoom) / 100}px`,
              height: `${(842 * zoom) / 100}px`,
            }}
          >
            {isRendering && (
              <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] z-10 flex items-center justify-center">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" /> Rendu de la page…
                </div>
              </div>
            )}
            <div className="p-8 h-full">
              <div className="space-y-4">
                <h1 className="text-2xl font-bold text-gray-900">{activeDocument.name.replace(".pdf", "")}</h1>
                <div className="h-px bg-gray-300" />
                <div className="space-y-3 text-gray-700 relative">
                  <p className="text-sm leading-relaxed">
                    {highlightedArea?.page === currentPage && highlightedArea.text ? (
                      <span className="bg-yellow-200 px-1 animate-pulse">{highlightedArea.text}</span>
                    ) : (
                      <span className="bg-yellow-200 px-1">Le présent contrat définit les modalités de collaboration</span>
                    )}{" "}
                    entre les parties pour la réalisation des prestations définies en annexe. Les clauses générales
                    s&apos;appliquent à l&apos;ensemble des services fournis dans le cadre de cet accord.
                    {getCitationMarkersForPage(currentPage).map(([citationId]) => (
                      <sup key={citationId} className="ml-1">
                        <span
                          className={`inline-flex items-center justify-center w-5 h-5 text-xs font-bold rounded-full border-2 transition-all duration-300 ${
                            highlightedCitation === citationId
                              ? "bg-primary text-primary-foreground border-primary shadow-lg scale-110"
                              : "bg-accent text-accent-foreground border-accent hover:bg-primary/20 hover:border-primary"
                          }`}
                        >
                          [{citationId}]
                        </span>
                      </sup>
                    ))}
                  </p>
                </div>
              </div>
            </div>

            {/* Overlay pour les bounding boxes de citations */}
            {highlightedArea?.page === currentPage && highlightedArea.bbox && (
              <div
                className="absolute border-2 border-primary bg-primary/10 animate-pulse"
                style={{
                  left: `${highlightedArea.bbox.x * 100}%`,
                  top: `${highlightedArea.bbox.y * 100}%`,
                  width: `${highlightedArea.bbox.width * 100}%`,
                  height: `${highlightedArea.bbox.height * 100}%`,
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
