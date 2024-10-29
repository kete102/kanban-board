interface Priority {
  level: string
  bg: string
  text: string
  checkedBg: string
  checkedText: string
  fill: string
}

export const priorities: Priority[] = [
  {
    level: 'low',
    bg: 'bg-green-100',
    text: 'text-green-800',
    checkedBg: 'bg-green-600',
    checkedText: 'text-white',
    fill: 'fill-green-600'
  },
  {
    level: 'medium',
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    checkedBg: 'bg-yellow-500',
    checkedText: 'text-white',
    fill: 'fill-yellow-500'
  },
  {
    level: 'high',
    bg: 'bg-red-100',
    text: 'text-red-800',
    checkedBg: 'bg-red-500 ',
    checkedText: 'text-white',
    fill: 'fill-red-500'
  }
]
