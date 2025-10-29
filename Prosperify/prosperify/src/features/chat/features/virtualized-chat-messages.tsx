"use client"

import { memo, type CSSProperties } from "react"
import  { List } from "react-window"
import { Button } from "../components/buttonChat"
import { FileText, ExternalLink } from "lucide-react"
import { InlineCitationText } from "./inline-citation-text"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  pdfReference?: {
    filename: string
    page: number
    highlight: string
  }
}

interface VirtualizedChatMessagesProps {
  messages: Message[]
  height: number
}

const MessageItem = memo(({ index, style, data }: { index: number; style: CSSProperties; data: Message[] }) => {
  const message = data[index]
  if (!message) return null

  const handlePdfReference = (reference: Message["pdfReference"]) => {
    if (reference) {
      console.log(`Ouvrir ${reference.filename} à la page ${reference.page}`)
    }
  }

  return (
    <div style={style} className="px-4 py-3">
      <div className={`flex gap-4 ${message.type === "user" ? "justify-end" : "justify-start"}`}>
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
    </div>
  )
})

MessageItem.displayName = "MessageItem"

export function VirtualizedChatMessages({ messages, height }: VirtualizedChatMessagesProps) {
  const itemSize = 120 // Hauteur estimée par message

  return (
    <List
      height={height}
      width={800} // Set an appropriate width value
      itemCount={messages.length}
      itemSize={itemSize}
      itemData={messages}
      className="scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent"
    >
      {MessageItem}
    </List>
  )
}
