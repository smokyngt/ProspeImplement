"use client"

import { useState } from "react"
import ChatSidebar from "./chat-sidebar"
import { ChatMessages } from "./chat-messages"
import { EnhancedChatInput } from "./enhanced-chat-input"
import { Button } from "./buttonChat"
import { Menu, PanelRightClose, PanelRightOpen } from "lucide-react"


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

interface ChatInterfaceProps {
  onTogglePdfViewer: () => void
  isPdfViewerCollapsed: boolean
}

export function ChatInterface({ onTogglePdfViewer, isPdfViewerCollapsed }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content:
        "Bonjour ! Je peux vous aider à rechercher dans vos documents PDF indexés. Posez-moi une question sur vos documents.",
      timestamp: new Date(),
    },
  ])
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [conversations, setConversations] = useState([
    { id: "1", title: "contrat verdi", messages: [...messages] },
    { id: "2", title: "Budget Q4", messages: [] },
    { id: "3", title: "Procédures RH", messages: [] },
    { id: "4", title: "Rapport mensuel", messages: [] },
  ])
  const [activeConversationId, setActiveConversationId] = useState("1")
  const [isAssistantTyping, setIsAssistantTyping] = useState(false)

  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content,
      timestamp: new Date(),
    }

    // Simulate streaming/typing
    setIsAssistantTyping(true)
    const nextMessages = [...messages, userMessage]
    setMessages(nextMessages)
    setConversations((prev) => prev.map((conv) => (conv.id === activeConversationId ? { ...conv, messages: nextMessages } : conv)))

    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: `D'après le document "Guide d'intégration des Agents.pdf", page 10, La base de données partagée est votre premier point de contact en tant que nouvel agent. Elle vous donne accès aux plans de communication, aux modèles de vidéos, aux scripts de storytelling et aux coordonnées de nos partenaires pour des shootings photo professionnels ou des visites 3D. : "${content.slice(0, 50)}...". [1]`,
        timestamp: new Date(),
        pdfReference: {
          filename: "Guide d'intégration des Agents.pdf",
          page: 10,
          highlight: content.slice(0, 50),
        },
      }
      const finalMessages = [...nextMessages, assistantMessage]
      setMessages(finalMessages)
      setConversations((prev) => prev.map((conv) => (conv.id === activeConversationId ? { ...conv, messages: finalMessages } : conv)))
      setIsAssistantTyping(false)
    }, 1200)
  }

  const handleNewChat = () => {
    const newConversation = {
      id: Date.now().toString(),
      title: `Nouvelle conversation ${conversations.length + 1}`,
      messages: [
        {
          id: "1",
          type: "assistant" as const,
          content:
            "Bonjour ! Je peux vous aider à rechercher dans vos documents PDF indexés. Posez-moi une question sur vos documents.",
          timestamp: new Date(),
        },
      ],
    }

    setConversations((prev) => [newConversation, ...prev])
    setActiveConversationId(newConversation.id)
    setMessages(newConversation.messages)
  }

  const handleSelectConversation = (conversationId: string) => {
    const conversation = conversations.find((c) => c.id === conversationId)
    if (conversation) {
      setActiveConversationId(conversationId)
      setMessages(conversation.messages)
    }
  }

  return (
   
    <div className="h-full flex ">
      {/* Sidebar */}
      <div className={`transition-all duration-300 ${isSidebarOpen ? "w-80" : "w-0 overflow-hidden"}`}>
        <ChatSidebar
          onNewChat={handleNewChat}
          conversations={conversations}
          activeConversationId={activeConversationId}
          onSelectConversation={handleSelectConversation}
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-card">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="h-8 w-8 p-0">
              <Menu className="h-4 w-4" />
            </Button>
            <h1 className="font-semibold text-card-foreground">Assistant IA - Documents</h1>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={onTogglePdfViewer}
            className="h-8 w-8 p-0"
            title={isPdfViewerCollapsed ? "Afficher le PDF" : "Masquer le PDF"}
          >
            {isPdfViewerCollapsed ? <PanelRightOpen className="h-4 w-4" /> : <PanelRightClose className="h-4 w-4" />}
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-hidden">
          <ChatMessages messages={messages} isAssistantTyping={isAssistantTyping} />
        </div>

        {/* Input */}
        <div className="border-t bg-card p-4">
          <EnhancedChatInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
 
  )
}
