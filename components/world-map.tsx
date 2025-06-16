"use client"

export function WorldMap() {
  return (
    <div className="relative h-[200px] w-full">
      <svg className="h-full w-full" viewBox="0 0 800 450" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M156.7,200.9 L156.7,207.7 L157.7,210.6 L159.9,210.6 L161,208.6 L161,201.9 L159.9,200.9 L156.7,200.9 z"
          fill="#cbd5e1"
          stroke="#94a3b8"
          strokeWidth="1"
        />
        <path
          d="M394.8,339.5 L401.3,344.4 L414.4,344.4 L415.4,341.5 L415.4,337.5 L413.4,335.5 L408.4,335.5 L405.4,334.5 L402.4,334.5 L400.4,335.5 L398.4,335.5 L394.8,339.5 z"
          fill="#94a3b8"
          stroke="#64748b"
          strokeWidth="1"
        />
        {/* More map paths would go here */}
      </svg>

      {/* Tooltip example */}
      <div className="absolute right-12 top-24 max-w-[200px] rounded-md bg-black p-2 text-xs text-white">
        <p>Vel odio leo lacus, maecenas elit sagittis aliquam amet.</p>
        <div className="mt-2 flex items-center justify-between">
          <a href="#" className="text-blue-400 hover:underline">
            Link Action
          </a>
          <button className="rounded bg-blue-500 px-2 py-1 text-xs text-white">Button</button>
        </div>
      </div>
    </div>
  )
}
