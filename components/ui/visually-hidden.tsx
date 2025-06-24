"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const VisuallyHidden = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      "absolute w-[1px] h-[1px] p-0 -m-[1px] overflow-hidden whitespace-nowrap border-0",
      "[clip:rect(0,0,0,0)]",
      className
    )}
    style={{
      position: "absolute",
      width: "1px",
      height: "1px",
      padding: 0,
      margin: "-1px",
      overflow: "hidden",
      clip: "rect(0, 0, 0, 0)",
      whiteSpace: "nowrap",
      borderWidth: 0,
    }}
    {...props}
  />
))
VisuallyHidden.displayName = "VisuallyHidden"

export { VisuallyHidden } 