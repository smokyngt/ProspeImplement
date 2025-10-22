"use client"

import { createContext, useContext, useRef, useState, useEffect, type ReactNode } from "react"
import { createPortal } from "react-dom"
import { eventBus } from "../lib/event-bus"

interface DndContextType {
  isDragging: boolean
  droppedFiles: File[]
}

const DndContext = createContext<DndContextType>({
  isDragging: false,
  droppedFiles: [],
})

export const useDnd = () => useContext(DndContext)

interface DndProviderProps {
  children: ReactNode
}

export function DndProvider({ children }: DndProviderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [droppedFiles, setDroppedFiles] = useState<File[]>([])
  const dragCounterRef = useRef(0)

  useEffect(() => {
    const handleDragEnter = (e: DragEvent) => {
      e.preventDefault()
      dragCounterRef.current++
      if (dragCounterRef.current === 1) {
        setIsDragging(true)
      }
    }

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault()
    }

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault()
      dragCounterRef.current--
      if (dragCounterRef.current === 0) {
        setIsDragging(false)
      }
    }

    const handleDrop = (e: DragEvent) => {
      e.preventDefault()
      dragCounterRef.current = 0
      setIsDragging(false)

      const files = Array.from(e.dataTransfer?.files || [])
      const pdfFiles = files.filter((file) => file.type === "application/pdf")

      if (pdfFiles.length > 0) {
        setDroppedFiles(pdfFiles)
        eventBus.emit("files:dropped", pdfFiles)
      }
    }

    window.addEventListener("dragenter", handleDragEnter)
    window.addEventListener("dragover", handleDragOver)
    window.addEventListener("dragleave", handleDragLeave)
    window.addEventListener("drop", handleDrop)

    return () => {
      window.removeEventListener("dragenter", handleDragEnter)
      window.removeEventListener("dragover", handleDragOver)
      window.removeEventListener("dragleave", handleDragLeave)
      window.removeEventListener("drop", handleDrop)
    }
  }, [])

  return (
    <DndContext.Provider value={{ isDragging, droppedFiles }}>
      {children}
      {isDragging &&
        typeof window !== "undefined" &&
        createPortal(
          <div className="fixed inset-0 z-50 bg-primary/10 border-2 border-dashed border-primary flex items-center justify-center">
            <div className="bg-card p-8 rounded-lg shadow-lg border">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Déposer vos fichiers PDF</h3>
                <p className="text-muted-foreground">Relâchez pour ajouter les documents à votre collection</p>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </DndContext.Provider>
  )
}
