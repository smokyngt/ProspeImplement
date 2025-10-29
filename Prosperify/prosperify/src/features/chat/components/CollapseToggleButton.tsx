import type { ComponentProps } from "react"
import { Button } from "./buttonChat"
import { PanelLeftClose, PanelLeftOpen } from "lucide-react"

type ButtonProps = ComponentProps<typeof Button>

type CollapseToggleButtonProps = Omit<ButtonProps, "onClick" | "children"> & {
  collapsed: boolean
  onToggle: () => void
  labelOpen?: string
  labelClose?: string
}

export default function CollapseToggleButton({
  collapsed,
  onToggle,
  labelOpen = "Afficher le panneau",
  labelClose = "Masquer le panneau",
  variant = "ghost",
  size = "sm",
  className = "h-8 w-8 p-0",
  ...rest
}: CollapseToggleButtonProps) {
  const label = collapsed ? labelOpen : labelClose
  return (
    <Button
      variant={variant}
      size={size}
      onClick={onToggle}
      aria-pressed={collapsed}
      aria-label={label}
      title={label}
      className={className}
      {...rest}
    >
      {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
    </Button>
  )
}