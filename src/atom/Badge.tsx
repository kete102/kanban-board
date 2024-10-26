import React from 'react'

// Tipos de prioridad
type Priority = 'low' | 'medium' | 'high'

// Propiedades del Badge
interface CustomBadgeProps {
  priority: Priority
}

// Componente CustomBadge
const Badge: React.FC<CustomBadgeProps> = ({ priority }) => {
  // Clases de TailwindCSS según la prioridad
  const badgeColor = {
    low: 'bg-green-500 text-white border-2 border-green-700', // Verde para baja prioridad
    medium: 'bg-yellow-500 text-white border-2 border-yellow-700', // Amarillo para prioridad media
    high: 'bg-red-500 text-white border-2 border-red-700' // Rojo para alta prioridad
  }

  return (
    <span
      className={`rounded-full px-3 py-1.5 text-xs font-bold ${badgeColor[priority]}`}
    >
      {priority.toUpperCase()}
    </span>
  )
}

export default Badge
