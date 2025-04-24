"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { parseBusRouteData } from "@/lib/parse-bus-data"
import type { Campus } from "@/lib/types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Loader, Download, Copy, Check } from "lucide-react"

export default function ImportBusDataPage() {
  const [taiTamData, setTaiTamData] = useState("")
  const [repulseBayData, setRepulseBayData] = useState("")
  const [taiTamResult, setTaiTamResult] = useState<string>("")
  const [repulseBayResult, setRepulseBayResult] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [activeTab, setActiveTab] = useState<string>("tai-tam")
  const [copied, setCopied] = useState<{ [key: string]: boolean }>({
    "tai-tam": false,
    "repulse-bay": false,
  })

  const handleImport = (campus: Campus) => {
    setIsProcessing(true)

    try {
      const data = campus === "tai-tam" ? taiTamData : repulseBayData
      const { routes, stops } = parseBusRouteData(data, campus)

      const result = JSON.stringify({ routes, stops }, null, 2)

      if (campus === "tai-tam") {
        setTaiTamResult(result)
      } else {
        setRepulseBayResult(result)
      }
    } catch (error) {
      console.error(`Error parsing ${campus} data:`, error)
      if (campus === "tai-tam") {
        setTaiTamResult(`Error: ${error}`)
      } else {
        setRepulseBayResult(`Error: ${error}`)
      }
    } finally {
      setIsProcessing(false)
    }
  }

  const handleCopy = (campus: Campus) => {
    const result = campus === "tai-tam" ? taiTamResult : repulseBayResult
    navigator.clipboard.writeText(result).then(() => {
      setCopied({ ...copied, [campus]: true })
      setTimeout(() => {
        setCopied({ ...copied, [campus]: false })
      }, 2000)
    })
  }

  const handleDownload = (campus: Campus) => {
    const result = campus === "tai-tam" ? taiTamResult : repulseBayResult
    const blob = new Blob([result], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${campus}-bus-data.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">HKIS Bus Data Import Tool</h1>

      <Tabs defaultValue="tai-tam" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="tai-tam">Tai Tam Campus</TabsTrigger>
          <TabsTrigger value="repulse-bay">Repulse Bay Campus</TabsTrigger>
        </TabsList>

        <TabsContent value="tai-tam">
          <Card>
            <CardHeader>
              <CardTitle>Tai Tam Campus Bus Data</CardTitle>
              <CardDescription>
                Paste the Tai Tam campus bus schedule data below to convert it to a structured format.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tai-tam-input">Bus Schedule Data</Label>
                  <Textarea
                    id="tai-tam-input"
                    value={taiTamData}
                    onChange={(e) => setTaiTamData(e.target.value)}
                    placeholder="Paste Tai Tam bus schedule data here..."
                    className="min-h-[200px]"
                  />
                </div>

                {taiTamResult && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="tai-tam-result">Parsed Data</Label>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCopy("tai-tam")}
                          disabled={isProcessing}
                        >
                          {copied["tai-tam"] ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                          {copied["tai-tam"] ? "Copied" : "Copy"}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownload("tai-tam")}
                          disabled={isProcessing}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                    <pre className="p-4 bg-muted rounded-md overflow-auto max-h-[300px] text-xs">{taiTamResult}</pre>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => handleImport("tai-tam")}
                disabled={isProcessing || !taiTamData.trim()}
                className="w-full"
              >
                {isProcessing && activeTab === "tai-tam" ? (
                  <>
                    <Loader className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Parse Tai Tam Data"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="repulse-bay">
          <Card>
            <CardHeader>
              <CardTitle>Repulse Bay Campus Bus Data</CardTitle>
              <CardDescription>
                Paste the Repulse Bay campus bus schedule data below to convert it to a structured format.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="repulse-bay-input">Bus Schedule Data</Label>
                  <Textarea
                    id="repulse-bay-input"
                    value={repulseBayData}
                    onChange={(e) => setRepulseBayData(e.target.value)}
                    placeholder="Paste Repulse Bay bus schedule data here..."
                    className="min-h-[200px]"
                  />
                </div>

                {repulseBayResult && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="repulse-bay-result">Parsed Data</Label>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCopy("repulse-bay")}
                          disabled={isProcessing}
                        >
                          {copied["repulse-bay"] ? (
                            <Check className="h-4 w-4 mr-1" />
                          ) : (
                            <Copy className="h-4 w-4 mr-1" />
                          )}
                          {copied["repulse-bay"] ? "Copied" : "Copy"}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownload("repulse-bay")}
                          disabled={isProcessing}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                    <pre className="p-4 bg-muted rounded-md overflow-auto max-h-[300px] text-xs">
                      {repulseBayResult}
                    </pre>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => handleImport("repulse-bay")}
                disabled={isProcessing || !repulseBayData.trim()}
                className="w-full"
              >
                {isProcessing && activeTab === "repulse-bay" ? (
                  <>
                    <Loader className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Parse Repulse Bay Data"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8 p-4 bg-muted rounded-md">
        <h2 className="text-lg font-semibold mb-2">Instructions</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Paste the bus schedule data for the respective campus in the text area.</li>
          <li>Click the "Parse Data" button to convert the data into a structured format.</li>
          <li>Review the parsed data in the result section.</li>
          <li>Use the Copy or Download buttons to save the parsed data.</li>
          <li>Import the data into your application's database.</li>
        </ol>
      </div>
    </div>
  )
}
