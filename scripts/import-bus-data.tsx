"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { parseBusRouteData } from "@/lib/parse-bus-data"
import type { Campus } from "@/lib/types"

export default function ImportBusData() {
  const [busData, setBusData] = useState("")
  const [campus, setCampus] = useState<Campus>("tai-tam")
  const [result, setResult] = useState<string>("")

  const handleImport = () => {
    try {
      const { routes, stops } = parseBusRouteData(busData, campus)
      setResult(JSON.stringify({ routes, stops }, null, 2))
    } catch (error) {
      setResult(`Error: ${error}`)
    }
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Import Bus Data</h1>

      <div className="mb-4">
        <label className="block mb-2">Campus:</label>
        <select value={campus} onChange={(e) => setCampus(e.target.value as Campus)} className="p-2 border rounded">
          <option value="tai-tam">Tai Tam Campus</option>
          <option value="repulse-bay">Repulse Bay Campus</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Bus Data:</label>
        <Textarea
          value={busData}
          onChange={(e) => setBusData(e.target.value)}
          className="h-64"
          placeholder="Paste bus route data here..."
        />
      </div>

      <Button onClick={handleImport}>Import Data</Button>

      {result && (
        <div className="mt-4">
          <h2 className="text-lg font-bold mb-2">Result:</h2>
          <pre className="p-4 bg-muted rounded overflow-auto max-h-96">{result}</pre>
        </div>
      )}
    </div>
  )
}
