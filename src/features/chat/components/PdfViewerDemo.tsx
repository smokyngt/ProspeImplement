"use client"

import { type SetStateAction, useEffect, useRef, useState } from "react"
import { Button } from "./buttonChat"
import { Input } from "./InputChat"
import { ZoomIn, ZoomOut, Search, Download, RotateCw, BookOpen, Loader2 } from "lucide-react"
import { eventBus } from "../lib/event-bus"

export interface CitationBox {
  id: string
  tag: string
  filename: string
  page: number
  snippet?: string
  bbox?: { x: number; y: number; width: number; height: number } // percent coords
}

export function PdfViewerDemo() {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages] = useState(15)
  const [zoom, setZoom] = useState(100)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDownloading, setIsDownloading] = useState(false)
  const [citations, setCitations] = useState<CitationBox[]>([])
  const [focusedCitation, setFocusedCitation] = useState<string | null>(null)

  const viewerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handler = (data: any) => {
      if (data && data.filename) {
        // If the event contains bbox/tag info we add it to citations if not present
        if (data.tag) {
          setCitations((prev) => {
            if (prev.find((c) => c.tag === data.tag)) return prev
            return [
              ...prev,
              {
                id: `c_${Date.now()}`,
                tag: data.tag,
                filename: data.filename,
                page: data.page,
                snippet: data.highlight,
                bbox: data.bbox,
              },
            ]
          })
        }

        // focus the page and optionally a tag
        setCurrentPage(data.page || 1)
        if (data.tag) {
          setFocusedCitation(data.tag)
          setTimeout(() => setFocusedCitation(null), 3000)
        }
      }
    }

    eventBus.on("pdf:goToCitation", handler)
    return () => {
      eventBus.off("pdf:goToCitation", handler)
    }
  }, [])

  const documents = [
    { id: "1", name: "Performance_Ventes_Q2.pdf", pages: 15, active: true },
    { id: "2", name: "Rapport_Financier_Q4.pdf", pages: 23, active: false },
    { id: "3", name: "Specifications_Techniques.pdf", pages: 8, active: false },
  ]

  // helper to map percent bbox to style (assuming the white page container)
  const bboxToStyle = (bbox: CitationBox["bbox"]) => {
    if (!bbox) return {}
    return {
      left: `${bbox.x}%`,
      top: `${bbox.y}%`,
      width: `${bbox.width}%`,
      height: `${bbox.height}%`,
    } as React.CSSProperties
  }

  return (
    <div className="h-full flex flex-col bg-card">
      {/* Document Tabs */}
      <div className="border-b border-border bg-muted/30">
        <div className="flex overflow-x-auto ">
          {documents.map((doc) => (
            <button
              key={doc.id}
              className={`px-4 py-2 text-sm whitespace-nowrap border-b-2 transition-colors ${
                doc.active
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
            title={isDownloading ? 'Téléchargement…' : 'Télécharger'}
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
              onChange={(e: { target: { value: SetStateAction<string> } }) => setSearchTerm(e.target.value)}
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
            Page {currentPage} sur {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          >
            Suivant
          </Button>
        </div>
      </div>

      {/* PDF Content */}
      <div className="flex-1 overflow-auto bg-muted/20 p-4">
        <div className="max-w-full mx-auto">
          {/* Simulated PDF Page */}
          <div
            ref={viewerRef}
            className="bg-white shadow-lg mx-auto border relative"
            style={{
              width: `${(595 * zoom) / 100}px`,
              height: `${(842 * zoom) / 100}px`,
              transform: `scale(${zoom / 100})`,
              transformOrigin: "top center",
            }}
          >
         <div className="p-8 h-full">

<div className="space-y-4">
  <h1 className="text-2xl font-bold text-gray-900">Contrat Verdi.pdf</h1>
  <div className="h-px bg-gray-300" />

  <div className="space-y-3 text-gray-700">
    <p className="text-sm leading-relaxed">
      <span className="font-bold">PRÉAMBULE :</span> 
      Dans le cadre de leurs activités respectives, les Parties souhaitent collaborer afin de conduire des travaux de recherche et de développement. 
      Ce préambule illustre l’esprit de partenariat et guide l’interprétation des dispositions contractuelles.
    </p>

    <p className="text-sm leading-relaxed">
      <span className="font-bold">ARTICLE 1 – OBJET DU CONTRAT :</span> 
      Le présent Contrat a pour objet d’organiser la collaboration entre VERDI et le PARTENAIRE, incluant la définition de programmes de recherche, 
      la mise en commun de moyens matériels et humains, la production de rapports, ainsi que la valorisation des résultats obtenus.  
      Les Parties reconnaissent expressément que cette collaboration ne crée aucune relation de société ou de subordination, chacune conservant son indépendance juridique et financière.
    </p>

    {/* --- On place la durée plus tôt, au milieu --- */}
    <p className="text-sm leading-relaxed">
      <span className="font-bold">ARTICLE 6 – DURÉE :</span> 
      Le présent Contrat entre en vigueur à la date de signature pour 
      <span className="bg-yellow-200"> une durée initiale de trois (3) ans</span>.  
      Il pourra être renouvelé par accord exprès et écrit des Parties.  
      En cas de non-renouvellement, 
      <span className="bg-yellow-200"> les obligations relatives à la confidentialité et à la propriété intellectuelle resteront en vigueur</span>.  
      Cette disposition constitue une garantie de continuité, même au terme de la collaboration.
    </p>

    <p className="text-sm leading-relaxed">
      <span className="font-bold">ARTICLE 2 – DÉFINITIONS :</span> 
      « Résultats » désigne toute donnée, méthode, prototype, logiciel, rapport ou publication généré.  
      « Informations Confidentielles » s’entend de toute information écrite ou orale, identifiée comme telle ou dont la nature impose un caractère réservé.  
      « Propriété Intellectuelle Antérieure » couvre tout droit détenu par une Partie avant le présent Contrat.
    </p>

    <p className="text-sm leading-relaxed">
      <span className="font-bold">ARTICLE 3 – OBLIGATIONS DES PARTIES :</span> 
      VERDI s’engage à mettre à disposition ses compétences scientifiques, ses laboratoires et son personnel qualifié.  
      Le PARTENAIRE fournira les données, échantillons et informations techniques nécessaires et participera activement aux réunions de coordination.  
      Les Parties conviennent de consigner chaque étape du projet dans un calendrier partagé.  
      De plus, <span className="bg-yellow-200">les principes d’éthique scientifique et de sécurité</span> devront être respectés à tout moment.
    </p>

    <p className="text-sm leading-relaxed">
      <span className="font-bold">ARTICLE 4 – CONFIDENTIALITÉ :</span> 
      Les Parties s’engagent à garder confidentielles toutes les informations échangées, pendant la durée du Contrat et cinq ans après son terme.  
      Aucune communication externe ne pourra être effectuée sans accord écrit préalable.  
      Cette obligation ne s’applique pas aux informations tombées dans le domaine public ou déjà connues.
    </p>

    <p className="text-sm leading-relaxed">
      <span className="font-bold">ARTICLE 5 – PROPRIÉTÉ INTELLECTUELLE :</span> 
      Chaque Partie conserve la pleine propriété de ses droits antérieurs.  
      Les Résultats de la collaboration appartiendront conjointement aux Parties, sauf stipulation particulière.  
      Toute exploitation industrielle ou commerciale nécessitera un accord séparé définissant les conditions de partage des revenus et des responsabilités.  
      Sans cet accord, les Résultats resteront réservés à une utilisation interne par les Parties.
    </p>
  </div>
</div>


            </div>

            {/* Overlay bounding boxes */}
            {citations
              .filter((c) => c.page === currentPage && c.bbox)
              .map((c) => (
                <div
                  key={c.tag}
                  className={`absolute border-2 ${focusedCitation === c.tag ? "border-primary shadow-lg" : "border-accent/60"} bg-transparent pointer-events-none`}
                  style={{ ...bboxToStyle(c.bbox), zIndex: focusedCitation === c.tag ? 40 : 30 }}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
