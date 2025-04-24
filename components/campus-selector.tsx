"use client"

import type { Campus } from "@/lib/types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CampusSelectorProps {
  selectedCampus: Campus
  onCampusChange: (campus: Campus) => void
}

export function CampusSelector({ selectedCampus, onCampusChange }: CampusSelectorProps) {
  return (
    <Select value={selectedCampus} onValueChange={(value) => onCampusChange(value as Campus)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select campus" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="tai-tam">Tai Tam Campus</SelectItem>
        <SelectItem value="repulse-bay">Repulse Bay Campus</SelectItem>
      </SelectContent>
    </Select>
  )
}
