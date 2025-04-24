"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { parseBusRouteData } from "@/lib/parse-bus-data"
import type { Campus } from "@/lib/types"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Loader, Download, Copy, Check } from "lucide-react"

export default function ConvertBusData() {
  const [taiTamData, setTaiTamData] = useState(`TIME: 4:00PM 
BusRoute
1Elements Zara - Olympian City (Bank of China Centre) - Middle RD YMCA - 
Rosary Church  - Pr Margaret Rd Gr Fld Ter B/S - Pr Margaret Rd Gas Stn (Opp Police Stn)  - 
Fat Kwong Street Nga Man Hse B/S  -Waterloo Rd#81 B/S  - 
Oxford Rd (Mkt Place)  - Tat Chee Avenue (HKPC Bldg) 
3Woodland Heights Bus Stop - Wong Nai Chung Gap Rd#8  - Tung Shan Terrace Bus Stop  - 
Queen's Road Wah Yan Bus Stop -Kennedy Rd 9A(opp), 48, 58,54,78,88,128 - 
Robinson Rd # 1 - Robinson 10(opp),31,55,70(Opp) - Robinson Rd 95,97,101  - 
Lyttelton Rd#1(Opp) - Lyttelton West End Park (Opp) - Robinson/Oaklands Ave B/S  - 
Kotewall Rd  - Po Shan Rd  - Conduit Rd (even numbers)
5Ocean Park CarPark Bus Stop  - Luk Kwok Hotel  - Central Pier 4 - GPO  - 
Macdonnell Rd - Kennedy Rd 34, 28, 10  - Caine Rd 
9Black's Lk/WNC Gap Rd-B/S -  Repusle Bay Rd 3,5  - HK Parkview  - 
Blue Pool Rd  - Ventris Rd  - Leighton Hill  - 
Po Leung Kuk-Vicwood KT Chong Kinderdgn  - Broadwood Rd  - 
Jardine's Lookout  - The Colonnade  - Tai Hang Rd  -
Fontana Gardens Bus Stop  - Moreton Terrace-Bay View Mansion 
11Taikoo Shing  - Healthy Street West (Ruby Court) - Cloudview Rd  - 
Braemar Hill -Pui Kiu Middle Sch - Pacific Palisades  - Tin Hau Temple Rd - 
Le Sommet (Main Rd)  - Fortress Hill MTR  - Nina Hotel (Lau Sin St) 
13*South Bay Rd  - Bel Air  - Baguio Villa  - Bisney Road  - Scenic Villa  -
Victoria Rd  - Mt. Davis Rd 
15*119A Repulse Bay Rd  - Rep Bay Rd #56  - Island Rd  - Deepwater Bay Rd  - 
Deepwater Bay Dr  - 11 Shouson Hill Rd East(Main Rd)  - Chi Fu  -  
Pokfulam Rd  - Belcher's  - Bonham Rd
16Repulse Bay Road #101, 109  - Shouson Hill Rd  -  
Wong Chuk Hang Rd (#38-AXA Bus Stop)  - Sham Wan Tower  - Larvotto  - 
Marina South - South Horizons 
17Tai Tam Rd  - Redhill Peninsula 
1998, 102 (Opp), 127, 129 Repulse Bay Rd  - Headland Rd  - Chung Hom Kok  - 
Stanley Village Rd - Stanley Beach Rd  - Tung Tau Wan Rd  -  Regalia Bay 
22*Upper Stubbs Rd  - Peak Area - Magagzine Gap Rd # 17,11,9  - 
Magazine Gap Rd/Brewin Path - 1 May Rd  - Tregunter Path - Old Peak Rd  - 
5,11,12 May Rd  - Magazine Gap Rd #1 
24*Belleview Drivie  - Rep Bay Rd # 93, 69, 67, 65, 63, 45(Opp),43(Opp),41(Opp), 37(Opp),  
36, 19-27, 11 (Opp) - Shiu Fai Terrace  -Estoril Court - Bowen Rd  - 
Borrett Rd - Marriott 
*Mini Bus
KWOON CHUNG MOTORS CO. LTD.
3/F, 8 CHONG FU ROAD, CHAI WAN, HONG KONG
    Tel : 3913 9383  /   Email : hkis@kcm.com.hk
HONG KONG INTERNATIONAL SCHOOL 2022/2023
LOWER/UPPER PRIMARY (REPULSE BAY SCHOOL) - RETURN SCHEDULE

TIME: 3:15PM - Buses depart from Middle School
31/51*Hung Hom KCR Bus Stop - Middle Rd (Peninsula O/Twr) - PrN Margaret Rd (Caltex Stn) - Waterloo Rd # 93 - Oxford Rd - Devon Rd/Dorset St - Tat Chee Avenue (HKPC Bldg)
31/51AElement - The Harbourside - The Arch - The Waterfront - Austin MTR Exit D2 - Cullinan West (Sham Mong Rd Bus Stop) - Olympian City (Bank of China Centre) - 
Imperial Cullinan (Bus Stop) - The Hermitage (Hoi Ting Rd) - Harbour Green (Bus Stop) - 
32A/52AHarbour Rd Taxi Stand - Conduit Rd - Hatton Rd Jnt - Po Shan Rd - Kotewall Rd -  Robinson Rd/Oaklands Ave - Lyttleton Rd/West End Pk - Lyttelton Rd#1 - 
Robinson Rd# 80 - Castle Rd /Seymour Rd Jnt - Caine Rd#11(Bus Stop)
32B/52BCentral Pier # 3 - GPO - Robinson Rd #1, 11, 55, 70 (opp.), 95 - Bonham Rd #78, HKU
33A/53ARepulse Bay Rd #90, 117 (opp),119A (opp), 109, 56, 43 (opp),37 (opp),11 (opp) - Stubbs Rd#34 (B/S) - Lwr Stubbs (Tung Shan/Shiu Fai Terr) - Pacific Place 3 - Pacific Place Apt 
33B/53BRepulse Bay Road #65, 67(opp), 36 - Queen's Rd E Wah Yan B/S - Along Kennedy Rd - Along MacDonnell Rd 
35/55Marymount Pr Sch (B/S) - Mt. Bulter Rd - Moorsom Rd - Chun Fai Rd - Tai Hang Drive Jnt - Tai Hang Rd -  Cloudview Rd - Braemar Hill - Pacific Palisades - Tin Hau Temple Rd
36A/56A*8 Deep Water Bay Rd (Opp) 51 Deep Water Bay Rd - 9 Welfare Rd - Bel-Air Phase 1 - Sha Wan Drive - Scenic Villa - Pokfulam Rd # 140, 116, 92, 88 
36B/56BOcean Court - Bel-Air Phase 4 - Upr/Lwr Baguio Villa - Sassoon Rd Jnt -  Victoria Rd Fire Stn - Victoria Rd 216, 192, 313 - Belcher's Bus Stop - Bonham/Hospital Rd
37/57Cape Rd - Cape Rd / Cape Dr Jnt - Cape Rd / Chung Hom Kok Rd Jnt - Chung Ham Kok Rd - Ching Sau Lane - Horizons Drive - South Bay Close
38A/58ATai Tam Rd #25, 33, 12,8 - Tung Tau Wan Rd - Regalia Bay
38B/58BTai Tam Rd Amercian Club, Pacific View - Stanley Beach Rd - Stanley Village Rd
39/59Shau Kei Wan Gov Ses Sch - Taikoo Shing - King's Rd (Healthy Garden Bus Stop) - Fortress Hill MTR - Lau Sin Street (L'Hotel) 
40/60*Rep Bay Rd #19-27- Stubbs Rd 41, 41A, 41D, 43, 43A, 51 - Barker Rd - Peak Rd 
40/60A*Magazine Gap Rd#17, 5-7 - Old Peak Road(#6, 5 (Opp) - Garden Terrace T1(Main Rd) - Hillsborough Court - Dynasty Court - Queen's Garden
40/60A1*May Rd #1 - Tregunter Path / May Rd Junt - May Rd #5-7 (Opp), 11 12 - Magazine Gap Rd#1 - Magazine Gap Rd/Brewin Path
41/61A*Headland Rd - Belleview Drive - Repulse Bay Rd #81 - Estoril Court - Bowen Rd
41B/61BWongnaichung Gap#12, 8 - Woodland Height B/S -  Blue Pool Rd - Sing Woo Rd - Village Rd - Ventris Rd Jnt - Leighton Hill (Link Rd) - Po Leung Kuk - 
Broadwood Rd - Broadwood/Tai Hang Rd Jnt
42/62Rep Bay Rd # 101 - Repulse Bay Road #11, 5, 3 (Opp) - Hong Kong Parkview
44A/64AIsland Rd(Car Park) - Shouson Hill Rd - B/S Opp Ocean Park - WCH Spt Ctr - Aberdeen Spt Gr - WCH Rec Gr - Remex - Sham Wan Twr - Larvotto - Marina South -  South Horizons 
45/65*Redhill Highrise (Main Gate) - Cedar Drive - Palm Drive - Pak Pat Shan Rd -  South Bay Rd 
TIME: 4:20PM - Buses depart from Middle School
Bus No.Route
31/51ShauKeiWan Gov Sec Sch B/S - Taikoo Shing - Hung Hom KCR Bus Stop - Middle Rd - Princess Margaret Rd Caltex Station - Waterloo Rd - Oxford Rd - Dorset Rd - Tat Chee Ave
32/52Harbour Rd (Fire Station) - Pier # 3 - GPO (for West Kln-Olympian City) - Marriott - Old Peak Rd - Conduit Rd - Po Shan Rd - Kotewall Rd - Lyttleton Rd - 
Robinson Rd - Castle Rd - Seymour Rd - Bonham Rd
33/53Along Rep Bay Rd (OPP)# 67, 63, 43, 41, 37,11 - Lower Stubbs - Along Kennedy Rd (including Macdonnell Rd's students) - Estoril Court - Bowen Rd
36/56Repulse Bay Rd#102 - Opp Rep Bay Hotel - 56 Repulse Bay Rd(Lay-by for Belleview Drive) - Island Rd - Shouson Hill (Inlude Shouson Hill E Jnt for Deep Water Bay Rd) -  
Wong Chuk Hang Road (for 9 Welfare Rd) - South Horizons - ApLeiChau Larvotto - Pokfulam Rd #140,142,131 (opp) - Sassoon Rd Roundabout - 
Lwr Baguio #41/Mini Bus Stop  - Upr Baguio-Mini Bus Stop - Bel Air Phase 1/4 - Sha Wan Drive #23, 25 -  Scenic Villa-Mini Bus Stop - Victoria Rd-Fire Stn Opp - 
Victoria Rd #216, 192 -Pokfulam Rd# 92,88(opp) - The Belcher's Bus Stop
37/57Redhill Peninsula (Main Gate ) - Repulse Rd # 90 - South Bay Rd 
38/58Tai Tam Rd - Stanley Area - Chung Hom Kok
39/59*Rep Bay Rd #19-27 - Happy Valley(Blue Pool/Ventris/Link/Broadwood Rd) - Po Leung Kuk - Fortress Hill MTR - Lau Sin Street (Nina Hotel)
40/60*Headland Rd - Wongnaichung Gap Rd(Gas Stn B/S) - Woodland Height Bus Stop - Upper Stubbs - Peak Area - Magazine Gap Rd - May Rd
42/62Repulse Rd # 119A - Deep Water Bay Drive #7-9, 8 - Hong Kong Parkview - Jardine's Lookout - Tai Hang Rd - Braemar Hill - Tin Hau Temple Rd (Fly Dragon)
TIME: 5:00PM - Buses depart from Middle School
Bus No.Route
51ShauKeiWan Gov Sec Sch B/S - Taikoo Shing - Hung Hom KCR Bus Stop - Middle Rd - Princess Margaret Rd Caltex Station - Waterloo Rd - Oxford Rd - Dorset Rd - Tat Chee Ave
52*Harbour Rd (Fire Station) - Pier # 3 - GPO (for West Kln-Olympian City) - Marriott - Old Peak Rd - Conduit Rd - Po Shan Rd - Kotewall Rd - Lyttleton Rd - 
Robinson Rd - Castle Rd - Seymour Rd - Bonham Rd
53*Along Rep Bay Rd (OPP)# 67, 63, 43, 41, 37,11 - Lower Stubbs - Along Kennedy Rd (including Macdonnell Rd's students) - Estoril Court - Bowen Rd
56Repulse Bay Rd#102 - Opp Rep Bay Hotel - 56 Repulse Bay Rd(Lay-by for Belleview Drive) - Island Rd - Shouson Hill (Inlude Shouson Hill E Jnt for Deep Water Bay Rd) -  
Wong Chuk Hang Road (for 9 Welfare Rd) - South Horizons - ApLeiChau Larvotto - Pokfulam Rd #140,142,131 (opp) - Sassoon Rd Roundabout - 
Lwr Baguio #41/Mini Bus Stop  - Upr Baguio-Mini Bus Stop - Bel Air Phase 1/4 - Sha Wan Drive #23, 25 -  Scenic Villa-Mini Bus Stop - Victoria Rd-Fire Stn Opp - 
Victoria Rd #216, 192 -Pokfulam Rd# 92,88(opp) - The Belcher's Bus Stop
57Redhill Peninsula (Main Gate ) - Repulse Rd # 90 - South Bay Rd 
58Tai Tam Rd - Stanley Area - Chung Hom Kok
59Rep Bay Rd #19-27 - Happy Valley(Blue Pool/Ventris/Link/Broadwood Rd) - Po Leung Kuk - Fortress Hill MTR - Lau Sin Street (Nina Hotel)
60*Headland Rd - Wongnaichung Gap Rd(Gas Stn B/S) - Woodland Height Bus Stop - Upper Stubbs - Peak Area - Magazine Gap Rd - May Rd
62Repulse Rd # 119A - Deep Water Bay Drive #7-9, 8 - Hong Kong Parkview - Jardine's Lookout - Tai Hang Rd - Braemar Hill - Tin Hau Temple Rd (Fly Dragon)
*Mini Buses
KWOON CHUNG MOTORS CO. LTD
3/F, 8 CHONG FU ROAD, CHAI WAN, HONG KONG
Tel : 3193 9383   |  Email : hkis@kcm.com.hk   |  Online Registration/Communication System:    https://school.kcm.com.hk/hkis/
HONG KONG INTERNATIONAL SCHOOL - TAI TAM CAMPUS (2022-2023)
Middle School / High School Bus Schedule
Afterschool Bus Schedule`)

  const [repulseBayData, setRepulseBayData] = useState(`HONG KONG INTERNATIONAL SCHOOL 2022/2023
LOWER/UPPER PRIMARY (REPULSE BAY SCHOOL) - RETURN SCHEDULE

TIME: 3:15PM - Buses depart from Middle School
31/51*Hung Hom KCR Bus Stop - Middle Rd (Peninsula O/Twr) - PrN Margaret Rd (Caltex Stn) - Waterloo Rd # 93 - Oxford Rd - Devon Rd/Dorset St - Tat Chee Avenue (HKPC Bldg)
31/51AElement - The Harbourside - The Arch - The Waterfront - Austin MTR Exit D2 - Cullinan West (Sham Mong Rd Bus Stop) - Olympian City (Bank of China Centre) - 
Imperial Cullinan (Bus Stop) - The Hermitage (Hoi Ting Rd) - Harbour Green (Bus Stop) - 
32A/52AHarbour Rd Taxi Stand - Conduit Rd - Hatton Rd Jnt - Po Shan Rd - Kotewall Rd -  Robinson Rd/Oaklands Ave - Lyttleton Rd/West End Pk - Lyttelton Rd#1 - 
Robinson Rd# 80 - Castle Rd /Seymour Rd Jnt - Caine Rd#11(Bus Stop)
32B/52BCentral Pier # 3 - GPO - Robinson Rd #1, 11, 55, 70 (opp.), 95 - Bonham Rd #78, HKU
33A/53ARepulse Bay Rd #90, 117 (opp),119A (opp), 109, 56, 43 (opp),37 (opp),11 (opp) - Stubbs Rd#34 (B/S) - Lwr Stubbs (Tung Shan/Shiu Fai Terr) - Pacific Place 3 - Pacific Place Apt 
33B/53BRepulse Bay Road #65, 67(opp), 36 - Queen's Rd E Wah Yan B/S - Along Kennedy Rd - Along MacDonnell Rd 
35/55Marymount Pr Sch (B/S) - Mt. Bulter Rd - Moorsom Rd - Chun Fai Rd - Tai Hang Drive Jnt - Tai Hang Rd -  Cloudview Rd - Braemar Hill - Pacific Palisades - Tin Hau Temple Rd
36A/56A*8 Deep Water Bay Rd (Opp) 51 Deep Water Bay Rd - 9 Welfare Rd - Bel-Air Phase 1 - Sha Wan Drive - Scenic Villa - Pokfulam Rd # 140, 116, 92, 88 
36B/56BOcean Court - Bel-Air Phase 4 - Upr/Lwr Baguio Villa - Sassoon Rd Jnt -  Victoria Rd Fire Stn - Victoria Rd 216, 192, 313 - Belcher's Bus Stop - Bonham/Hospital Rd
37/57Cape Rd - Cape Rd / Cape Dr Jnt - Cape Rd / Chung Hom Kok Rd Jnt - Chung Ham Kok Rd - Ching Sau Lane - Horizons Drive - South Bay Close
38A/58ATai Tam Rd #25, 33, 12,8 - Tung Tau Wan Rd - Regalia Bay
38B/58BTai Tam Rd Amercian Club, Pacific View - Stanley Beach Rd - Stanley Village Rd
39/59Shau Kei Wan Gov Ses Sch - Taikoo Shing - King's Rd (Healthy Garden Bus Stop) - Fortress Hill MTR - Lau Sin Street (L'Hotel) 
40/60*Rep Bay Rd #19-27- Stubbs Rd 41, 41A, 41D, 43, 43A, 51 - Barker Rd - Peak Rd 
40/60A*Magazine Gap Rd#17, 5-7 - Old Peak Road(#6, 5 (Opp) - Garden Terrace T1(Main Rd) - Hillsborough Court - Dynasty Court - Queen's Garden
40/60A1*May Rd #1 - Tregunter Path / May Rd Junt - May Rd #5-7 (Opp), 11 12 - Magazine Gap Rd#1 - Magazine Gap Rd/Brewin Path
41/61A*Headland Rd - Belleview Drive - Repulse Bay Rd #81 - Estoril Court - Bowen Rd
41B/61BWongnaichung Gap#12, 8 - Woodland Height B/S -  Blue Pool Rd - Sing Woo Rd - Village Rd - Ventris Rd Jnt - Leighton Hill (Link Rd) - Po Leung Kuk - 
Broadwood Rd - Broadwood/Tai Hang Rd Jnt
42/62Rep Bay Rd # 101 - Repulse Bay Road #11, 5, 3 (Opp) - Hong Kong Parkview
44A/64AIsland Rd(Car Park) - Shouson Hill Rd - B/S Opp Ocean Park - WCH Spt Ctr - Aberdeen Spt Gr - WCH Rec Gr - Remex - Sham Wan Twr - Larvotto - Marina South -  South Horizons 
45/65*Redhill Highrise (Main Gate) - Cedar Drive - Palm Drive - Pak Pat Shan Rd -  South Bay Rd`)

  const [taiTamResult, setTaiTamResult] = useState<string>("")
  const [repulseBayResult, setRepulseBayResult] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [activeTab, setActiveTab] = useState<string>("tai-tam")
  const [copied, setCopied] = useState<{ [key: string]: boolean }>({
    "tai-tam": false,
    "repulse-bay": false,
  })

  const handleConvert = (campus: Campus) => {
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

  const handleImportToApp = (campus: Campus) => {
    try {
      const result = campus === "tai-tam" ? taiTamResult : repulseBayResult
      const data = JSON.parse(result)

      // Store in localStorage for easy access
      localStorage.setItem(`${campus}-bus-data`, result)

      alert(`${campus.charAt(0).toUpperCase() + campus.slice(1)} bus data has been imported to the application!`)
    } catch (error) {
      console.error(`Error importing ${campus} data:`, error)
      alert(`Error importing ${campus} data: ${error}`)
    }
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Convert Bus Data to JSON</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tai Tam Campus */}
        <Card>
          <CardHeader>
            <CardTitle>Tai Tam Campus</CardTitle>
            <CardDescription>Convert Tai Tam campus bus schedule data to JSON format</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="tai-tam-input">Bus Schedule Data</Label>
                <Textarea
                  id="tai-tam-input"
                  value={taiTamData}
                  onChange={(e) => setTaiTamData(e.target.value)}
                  className="min-h-[200px]"
                />
              </div>

              {taiTamResult && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="tai-tam-result">Converted JSON</Label>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleCopy("tai-tam")} disabled={isProcessing}>
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
          <CardFooter className="flex flex-col gap-2">
            <Button
              onClick={() => handleConvert("tai-tam")}
              disabled={isProcessing || !taiTamData.trim()}
              className="w-full"
            >
              {isProcessing && activeTab === "tai-tam" ? (
                <>
                  <Loader className="h-4 w-4 mr-2 animate-spin" />
                  Converting...
                </>
              ) : (
                "Convert to JSON"
              )}
            </Button>
            {taiTamResult && (
              <Button variant="secondary" onClick={() => handleImportToApp("tai-tam")} className="w-full">
                Import to Application
              </Button>
            )}
          </CardFooter>
        </Card>

        {/* Repulse Bay Campus */}
        <Card>
          <CardHeader>
            <CardTitle>Repulse Bay Campus</CardTitle>
            <CardDescription>Convert Repulse Bay campus bus schedule data to JSON format</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="repulse-bay-input">Bus Schedule Data</Label>
                <Textarea
                  id="repulse-bay-input"
                  value={repulseBayData}
                  onChange={(e) => setRepulseBayData(e.target.value)}
                  className="min-h-[200px]"
                />
              </div>

              {repulseBayResult && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="repulse-bay-result">Converted JSON</Label>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopy("repulse-bay")}
                        disabled={isProcessing}
                      >
                        {copied["repulse-bay"] ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
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
                  <pre className="p-4 bg-muted rounded-md overflow-auto max-h-[300px] text-xs">{repulseBayResult}</pre>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button
              onClick={() => handleConvert("repulse-bay")}
              disabled={isProcessing || !repulseBayData.trim()}
              className="w-full"
            >
              {isProcessing && activeTab === "repulse-bay" ? (
                <>
                  <Loader className="h-4 w-4 mr-2 animate-spin" />
                  Converting...
                </>
              ) : (
                "Convert to JSON"
              )}
            </Button>
            {repulseBayResult && (
              <Button variant="secondary" onClick={() => handleImportToApp("repulse-bay")} className="w-full">
                Import to Application
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>

      <div className="mt-8 p-4 bg-muted rounded-md">
        <h2 className="text-lg font-semibold mb-2">Instructions</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>The bus schedule data is pre-filled for both campuses.</li>
          <li>Click the "Convert to JSON" button to parse the data into a structured format.</li>
          <li>Review the converted JSON data in the result section.</li>
          <li>Use the Copy or Download buttons to save the JSON data.</li>
          <li>Click "Import to Application" to use the data in the bus finder app.</li>
        </ol>
      </div>
    </div>
  )
}
