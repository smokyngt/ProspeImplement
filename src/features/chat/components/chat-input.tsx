"use client"

import type React from "react"
import { useState } from "react"
import Button from "./button"
import { Textarea } from "./textareaChat"
import { Send, Paperclip } from "lucide-react"

interface ChatInputProps {
  onSendMessage: (message: string) => void
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
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

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="relative">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Posez une question sur vos documents..."
          className="min-h-[60px] max-h-32 resize-none pr-12 bg-input border-border"
        />
        <div className="absolute bottom-2 right-2 flex gap-1">
          <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Button
            type="submit"
            disabled={!message.trim()}
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            <Send className="h-4 w-4 mr-2" />
            Envoyer
          </Button>
        </div>
      </div>
    </form>
  )
}
