import React, { useState } from 'react'

interface ButtonProps {
  onClick: () => void;
  text: string;
  buttonColor?: string; // Prop pour la couleur du bouton
  disabled?: boolean; // Prop pour gérer l'état disabled
}

const Button: React.FC<ButtonProps> = ({ onClick, text, buttonColor = 'blue', disabled = false }) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    if (disabled) return
    setIsLoading(true)
    try {
      await onClick()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      type="button"
      className={`py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-md border border-transparent bg-${buttonColor}-600 text-white hover:bg-${buttonColor}-700 disabled:opacity-50 disabled:pointer-events-none`}
      onClick={handleClick}
      disabled={isLoading || disabled}
    >
      {isLoading ? 'Loading...' : text}
    </button>
  )
}

export default Button
