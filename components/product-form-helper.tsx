"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { HelpCircle } from "lucide-react"

interface ProductFormHelperProps {
  title: string
  children: React.ReactNode
}

export function ProductFormHelper({ title, children }: ProductFormHelperProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full">
          <HelpCircle className="h-4 w-4" />
          <span className="sr-only">Ayuda</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-2 text-sm">{children}</div>
      </DialogContent>
    </Dialog>
  )
}
