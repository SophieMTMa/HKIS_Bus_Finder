"use client"

import { useState } from "react"
import { HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { getFAQs } from "@/lib/db"

export function FAQButton() {
  const [open, setOpen] = useState(false)
  const faqs = getFAQs()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <HelpCircle className="h-4 w-4" />
          <span className="sr-only">Open FAQ</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Bus FAQ</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          {faqs.map((faq, index) => (
            <div key={index} className="space-y-1">
              <h3 className="font-medium">{faq.question}</h3>
              <p className="text-sm text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
          <div className="pt-2 border-t">
            <p className="text-xs text-muted-foreground">
              For more information, contact Kwoon Chung Motors Co. LTD at 3913 9383 or hkis@kcm.com.hk
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
