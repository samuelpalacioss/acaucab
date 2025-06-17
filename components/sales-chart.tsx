"use client"

export function SalesChart() {
  return (
    <div className="w-full h-[80px] flex items-end gap-1">
      {[40, 25, 35, 45, 30, 55, 35, 60, 45, 40, 50, 45].map((height, i) => (
        <div
          key={i}
          className="flex-1 bg-primary/20 hover:bg-primary/40 transition-colors rounded-t"
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  )
}
