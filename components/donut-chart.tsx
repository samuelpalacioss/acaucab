"use client"

export function DonutChart() {
  return (
    <div className="relative h-[200px] w-[200px]">
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <circle cx="50" cy="50" r="40" fill="none" stroke="#e2e8f0" strokeWidth="20" />
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#64748b"
          strokeWidth="20"
          strokeDasharray="251.2"
          strokeDashoffset="50"
          transform="rotate(-90 50 50)"
        />
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#94a3b8"
          strokeWidth="20"
          strokeDasharray="251.2"
          strokeDashoffset="125"
          transform="rotate(-90 50 50)"
        />
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#cbd5e1"
          strokeWidth="20"
          strokeDasharray="251.2"
          strokeDashoffset="188"
          transform="rotate(-90 50 50)"
        />
        <circle cx="50" cy="50" r="30" fill="white" />
      </svg>
    </div>
  )
}
