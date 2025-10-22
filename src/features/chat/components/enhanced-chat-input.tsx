"use client"

import type React from "react"
import { useState } from "react"
import Button from "./button"
import { Send } from "lucide-react"
import { UploadTextarea } from "../features/upload-textarea"

interface EnhancedChatInputProps {
  onSendMessage: (message: string) => void
}

export function EnhancedChatInput({ onSendMessage }: EnhancedChatInputProps) {
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage(message.trim())
      setMessage("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleFiles = (files: File[]) => {
    console.log(
      "Fichiers reçus:",
      files.map((f) => f.name),
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <UploadTextarea
        value={message}
        onChange={setMessage}
        onFiles={handleFiles}
        onKeyDown={handleKeyDown}
        placeholder="Posez une question sur vos documents... (vous pouvez glisser-déposer des PDFs)"
        className="min-h-[60px] max-h-32"
      />

      <div className="flex justify-between items-center">
        <p className="text-xs text-muted-foreground">
          Appuyez sur Entrée pour envoyer, Maj+Entrée pour une nouvelle ligne
        </p>
        <Button
          type="submit"
          disabled={!message.trim()}
          className="bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          <Send className="h-4 w-4 mr-2" />
          Envoyer
        </Button>
      </div>
    </form>
  )
}
