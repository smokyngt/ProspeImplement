import type { ReactNode } from "react"
import { DndProvider } from "./dnd-provider"
import { PdfProvider } from "./pdf-provider"
import { CitationsProvider } from "./citations-provider"

interface ChatWithProvidersProps {
  children: ReactNode
}

export function ChatWithProviders({ children }: ChatWithProvidersProps) {
  return (
    <DndProvider>
      <PdfProvider>
        <CitationsProvider>{children}</CitationsProvider>
      </PdfProvider>
    </DndProvider>
  )
}
export default ChatWithProviders