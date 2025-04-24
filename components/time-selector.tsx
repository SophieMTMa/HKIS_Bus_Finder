"use client"

import { Button } from "@/components/ui/button"

interface TimeSelectorProps {
  selectedTime: string
  onTimeChange: (time: string) => void
}

export function TimeSelector({ selectedTime, onTimeChange }: TimeSelectorProps) {
  const times = ["3:15PM", "4:20PM", "5:00PM"]

  return (
    <div className="flex items-center gap-1">
      {times.map((time) => (
        <Button
          key={time}
          variant={selectedTime === time ? "default" : "outline"}
          size="sm"
          onClick={() => onTimeChange(time)}
          className="text-xs"
        >
          {time}
        </Button>
      ))}
    </div>
  )
}
