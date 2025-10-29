"use client"
import { Button } from "./buttonChat"
import { FileText, ExternalLink } from "lucide-react"
import { InlineCitationText } from "../features/inline-citation-text"
// import GeneralPfp from "@/assets/avatars/general.svg"
// import LegalPfp from "@/assets/avatars/legal.svg"
// import FinancePfp from "@/assets/avatars/finance.svg"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  assistantId?: string
  pdfReference?: {
    filename: string
    page: number
    highlight: string
  }
}

interface ChatMessagesProps {
  messages: Message[]
  isAssistantTyping?: boolean
}

export function ChatMessages({ messages, isAssistantTyping = false }: ChatMessagesProps) {
  const handlePdfReference = (reference: Message["pdfReference"]) => {
    if (reference) {
      // Ici on pourrait déclencher l'ouverture du PDF à la page spécifiée
      console.log(`Ouvrir ${reference.filename} à la page ${reference.page}`)
    }
  }

  return (
    <div className="h-full overflow-y-auto p-4 space-y-6 ">
      {messages.map((message) => (
        <div key={message.id} className={`flex gap-4 ${message.type === "user" ? "justify-end" : "justify-start"}`}>
          {message.type === "assistant" && (
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
              <span className="text-accent-foreground text-sm font-medium">IA</span>
            </div>
          )}

          <div className={`max-w-2xl ${message.type === "user" ? "order-first" : ""}`}>
            <div
              className={`p-4 rounded-lg ${
                message.type === "user"
                  ? "bg-primary text-primary-foreground ml-auto"
                  : "bg-card text-card-foreground border"
              }`}
            >
              <div className="text-sm leading-relaxed">
                <InlineCitationText text={message.content} />
              </div>

              {message.pdfReference && (
                <div className="mt-3 p-3 bg-muted rounded-lg border-l-4 border-accent">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-accent" />
                      <div>
                        <p className="text-xs font-medium text-muted-foreground">{message.pdfReference.filename}</p>
                        <p className="text-xs text-muted-foreground">Page {message.pdfReference.page}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handlePdfReference(message.pdfReference)}
                      className="h-8 w-8 p-0"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <p className="text-xs text-muted-foreground mt-2">
              {message.timestamp.toLocaleTimeString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>

          {message.type === "user" && (
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
              <span className="text-secondary-foreground text-sm font-medium">U</span>
            </div>
          )}
        </div>
      ))}
      {isAssistantTyping && (
        <div className="flex gap-4 justify-start">
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
            <span className="text-accent-foreground text-sm font-medium">IA</span>
          </div>
          <div className="max-w-2xl">
            <div className="p-4 rounded-lg bg-card text-card-foreground border">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="sr-only">Assistant en train d&apos;écrire…</span>
                <span className="inline-flex items-center gap-2">
                  <span className="inline-block h-3 w-3 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:0ms]"></span>
                  <span className="inline-block h-3 w-3 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:150ms]"></span>
                  <span className="inline-block h-3 w-3 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:300ms]"></span>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
