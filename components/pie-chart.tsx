"use client"

export function PieChart() {
  return (
    <div className="relative h-[200px] w-[200px]">
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <path d="M50,50 L50,10 A40,40 0 0,1 85,65 Z" fill="#64748b" />
        <path d="M50,50 L85,65 A40,40 0 0,1 15,65 Z" fill="#94a3b8" />
        <path d="M50,50 L15,65 A40,40 0 0,1 50,10 Z" fill="#cbd5e1" />
      </svg>
    </div>
  )
}
