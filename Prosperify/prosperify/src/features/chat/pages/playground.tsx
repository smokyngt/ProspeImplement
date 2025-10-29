"use client"

import React from "react"
import { useState, useRef, useCallback } from "react"
import { ChatInterface } from "@/features/chat/components/chat-interface"

import ChatWithProviders from "@/features/chat/providers/chat-dnd-provider"
import { EnhancedPdfViewer } from "@/features/chat/features/enhanced-pdf-viewer"
import { PdfViewerDemo } from "../components/PdfViewerDemo"

const Playground: React.FC = () => {
  const [leftWidth, setLeftWidth] = useState(50)
  const [isPdfViewerCollapsed, setIsPdfViewerCollapsed] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)
  }, [])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing || !containerRef.current) return

      const containerRect = containerRef.current.getBoundingClientRect()
      const newLeftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100

      const clampedWidth = Math.min(Math.max(newLeftWidth, 20), 80)
      setLeftWidth(clampedWidth)
    },
    [isResizing],
  )

  const handleMouseUp = useCallback(() => {
    setIsResizing(false)
  }, [])

  React.useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      document.body.style.cursor = ""
      document.body.style.userSelect = ""
    
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.body.style.cursor = ""
      document.body.style.userSelect = ""
      document.body.style.pointerEvents = ""
    }
  }, [isResizing, handleMouseMove, handleMouseUp])

  return (
    <ChatWithProviders>
    <div ref={containerRef} className="h-screen flex">
      <div
        className="min-w-0 transition-all duration-300 ease-out"
        style={{ width: isPdfViewerCollapsed ? "100%" : `${leftWidth}%` }}
      >
        <ChatInterface
          onTogglePdfViewer={() => setIsPdfViewerCollapsed(!isPdfViewerCollapsed)}
          isPdfViewerCollapsed={isPdfViewerCollapsed}
        />
      </div>

      {!isPdfViewerCollapsed && (
        <div
          className={`w-2 bg-border hover:bg-accent cursor-col-resize transition-all duration-200 flex-shrink-0 relative group ${
            isResizing ? "bg-primary" : ""
          }`}
          onMouseDown={handleMouseDown}
          style={{ pointerEvents: isResizing ? "none" : "auto" }}
        >
          <div className="absolute inset-y-0 -left-2 -right-2 group-hover:bg-accent/30 transition-colors duration-200" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-8 bg-muted-foreground/30 rounded-full group-hover:bg-accent-foreground/50 transition-colors duration-200" />
        </div>
      )}

      {!isPdfViewerCollapsed && (
        <div className="min-w-0 transition-all duration-300 ease-out" style={{ width: `${100 - leftWidth}%` }}>
          {/* <EnhancedPdfViewer /> */}
          <PdfViewerDemo />
        </div>
      )}
    </div>
    </ChatWithProviders>
  )
}

export default Playground