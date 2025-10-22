"use client"

import type React from "react"
import { useRef, useState, useCallback } from "react"
import { Textarea } from "../components/textareaChat"
import Button from "../components/button"
import { Paperclip, FileText, X } from "lucide-react"
import { usePdf } from "../providers/pdf-provider"
import { cn } from "../lib/utils"

interface UploadTextareaProps {
  value: string
  onChange: (value: string) => void
  onFiles?: (files: File[]) => void
  placeholder?: string
  className?: string
  onKeyDown?: (e: React.KeyboardEvent) => void
}

export function UploadTextarea({ value, onChange, onFiles, placeholder, className, onKeyDown }: UploadTextareaProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [attachedFiles, setAttachedFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dragCounterRef = useRef(0)
  const { addDocument } = usePdf()

  const handleFiles = useCallback(
    async (files: File[]) => {
      const pdfFiles = Array.from(files).filter((file) => file.type === "application/pdf")

      if (pdfFiles.length > 0) {
        setAttachedFiles((prev) => [...prev, ...pdfFiles])
        onFiles?.(pdfFiles)

        // Ajouter automatiquement au provider PDF
        for (const file of pdfFiles) {
          await addDocument(file)
        }
      }
    },
    [addDocument, onFiles],
  )

  const handlePaste = useCallback(
    (e: React.ClipboardEvent) => {
      const items = Array.from(e.clipboardData.items)
      const files = items
        .filter((item) => item.kind === "file")
        .map((item) => item.getAsFile())
        .filter((file): file is File => file !== null)

      if (files.length > 0) {
        e.preventDefault()
  void handleFiles(files)
      }
    },
    [handleFiles],
  )

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounterRef.current++
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounterRef.current--
    if (dragCounterRef.current === 0) {
      setIsDragOver(false)
    }
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      dragCounterRef.current = 0
      setIsDragOver(false)

      const files = Array.from(e.dataTransfer.files)
  void handleFiles(files)
    },
    [handleFiles],
  )

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || [])
  void handleFiles(files)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    },
    [handleFiles],
  )

  const removeFile = useCallback((index: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index))
  }, [])

  return (
    <div className="space-y-3">
      <div className="relative">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          onPaste={handlePaste}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          placeholder={placeholder}
          className={cn(
            "min-h-[60px] max-h-32 resize-none pr-12 bg-input border-border transition-colors",
            isDragOver && "border-primary bg-primary/5",
            className,
          )}
        />
        <div className="absolute bottom-2 right-2 flex gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => fileInputRef.current?.click()}
          >
            <Paperclip className="h-4 w-4" />
          </Button>
        </div>

        <input ref={fileInputRef} type="file" accept=".pdf" multiple className="hidden" onChange={handleFileInput} />
      </div>

      {/* Fichiers attachés */}
      {attachedFiles.length > 0 && (
        <div className="space-y-2">
          {attachedFiles.map((file, index) => (
            <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded-lg border">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground flex-1 truncate">{file.name}</span>
              <span className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(1)} MB</span>
              <Button type="button" variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => removeFile(index)}>
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
