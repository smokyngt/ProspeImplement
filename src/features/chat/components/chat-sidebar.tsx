"use client"

import { useState } from "react"
import { MessageSquare, Search, Filter, History, Settings, X, ChevronDown } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Input } from "./InputChat"
import Button from "./button"
import Logo from "@/assets/Asset 1.png"

interface ConversationMessage { content: string }
interface Conversation {
  id: string
  title: string
  messages: ConversationMessage[]
}

interface Assistant {
  id: string
  name: string
  description: string
  icon: string
}

interface SidebarProps {
  onNewChat: () => void
  conversations: Conversation[]
  activeConversationId: string
  onSelectConversation: (id: string) => void
  selectedAssistant?: Assistant
  onSelectAssistant?: (assistant: Assistant) => void
}

export default function ChatSidebar({
  onNewChat,
  conversations,
  activeConversationId,
  onSelectConversation,
  selectedAssistant,
  onSelectAssistant,
}: SidebarProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isAssistantDropdownOpen, setIsAssistantDropdownOpen] = useState(false)

  const assistants: Assistant[] = [
    {
      id: "general",
      name: "Assistant Intégration",
      description: "Assistant intégration pour toutes vos questions",
      icon: "🤖",
    },
    {
      id: "it-copilot",
      name: "IT Copilot",
      description: "Spécialisé en développement et technologies",
      icon: "💻",
    },
    {
      id: "design-assistant",
      name: "Design Assistant",
      description: "Expert en design UI/UX et créativité",
      icon: "🎨",
    },
    {
      id: "business-advisor",
      name: "Business Advisor",
      description: "Conseils en stratégie et gestion d'entreprise",
      icon: "📊",
    },
    {
      id: "content-writer",
      name: "Content Writer",
      description: "Rédaction et création de contenu",
      icon: "✍️",
    },
  ]

  const currentAssistant = selectedAssistant || assistants[0]

  const filteredConversations = conversations.filter((conv) => {
    const term = searchTerm.toLowerCase()
    if (conv.title.toLowerCase().includes(term)) return true
    return conv.messages.some((msg) => msg.content.toLowerCase().includes(term))
  })

  const menuItems = [
    {
      icon: Search,
      label: "Rechercher",
      onClick: () => setIsSearchOpen(!isSearchOpen),
    },
    { icon: Filter, label: "Filtres" },
    { icon: History, label: "Historique" },
    { icon: Settings, label: "Parammètres", onClick: () => { const navigate = useNavigate(); navigate('/assistant/:id/settings'); } },
  ]

  return (
    <div className="w-full h-screen bg-background border-r border-border flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3 mb-6 justify-center">
             <img src={Logo} alt="Prosperify Logo" className="mb-4 w-auto h-14 " />
        </div>
        <div className="mb-4 relative">
          <button
            onClick={() => setIsAssistantDropdownOpen(!isAssistantDropdownOpen)}
            className="w-full flex items-center justify-between gap-2 px-3 py-3 text-sm bg-muted rounded-lg hover:bg-accent transition-colors"
          >
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <span className="text-lg flex-shrink-0">{currentAssistant.icon}</span>
              <div className="text-left min-w-0 flex-1">
                <div className="font-medium text-foreground truncate">{currentAssistant.name}</div>
                <div className="text-xs text-muted-foreground truncate hidden sm:block">
                  {currentAssistant.description}
                </div>
              </div>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-muted-foreground transition-transform flex-shrink-0 ${isAssistantDropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isAssistantDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
              {assistants.map((assistant) => (
                <button
                  key={assistant.id}
                  onClick={() => {
                    onSelectAssistant?.(assistant)
                    setIsAssistantDropdownOpen(false)
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-3 text-sm hover:bg-accent transition-colors ${
                    currentAssistant.id === assistant.id ? "bg-accent text-accent-foreground" : "text-foreground"
                  }`}
                >
                  <span className="text-lg flex-shrink-0">{assistant.icon}</span>
                  <div className="text-left flex-1 min-w-0">
                    <div className="font-medium truncate">{assistant.name}</div>
                    <div className="text-xs text-muted-foreground truncate hidden sm:block">
                      {assistant.description}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={onNewChat}
          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground bg-muted rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <MessageSquare className="w-4 h-4" />
          Nouvelle conversation
        </button>
      </div>

      {isSearchOpen && (
        <div className="p-4 border-b border-border bg-muted/30">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher dans les conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-10"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchTerm("")
                setIsSearchOpen(false)
              }}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      )}

      {/* Menu */}
      <div className="flex-1 p-6 space-y-8 overflow-y-auto">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={item.onClick}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </div>

        <div>
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
            Conversations {searchTerm && `(${filteredConversations.length})`}
          </h3>
          <div className="space-y-1">
            {filteredConversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => onSelectConversation(conversation.id)}
                className={`w-full text-left px-4 py-3 text-sm rounded-lg transition-colors truncate ${
                  conversation.id === activeConversationId
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {conversation.title}
                {searchTerm && (
                  <div className="text-xs text-muted-foreground mt-1 truncate">
                    {conversation.messages.length} messages
                  </div>
                )}
              </button>
            ))}
            {filteredConversations.length === 0 && searchTerm && (
              <div className="text-center py-8 text-muted-foreground text-sm">Aucune conversation trouvée</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
