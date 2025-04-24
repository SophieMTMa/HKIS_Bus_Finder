import type { BusRoute, BusStop } from "./types"

// Sample data for Tai Tam campus
export const sampleTaiTamData: { routes: BusRoute[]; stops: BusStop[] } = {
  routes: [
    // 3:15PM Routes
    {
      id: "1-3:15PM",
      busNumber: "1",
      departureTime: "3:15PM",
      campus: "tai-tam",
      stops: [
        { stopId: "elements-zara", order: 1, estimatedTime: "3:20 PM" },
        { stopId: "olympian-city", order: 2, estimatedTime: "3:25 PM" },
        { stopId: "middle-rd-ymca", order: 3, estimatedTime: "3:30 PM" },
        { stopId: "rosary-church", order: 4, estimatedTime: "3:35 PM" },
      ],
    },
    {
      id: "3-3:15PM",
      busNumber: "3",
      departureTime: "3:15PM",
      campus: "tai-tam",
      stops: [
        { stopId: "woodland-heights-bus-stop", order: 1, estimatedTime: "3:20 PM" },
        { stopId: "wong-nai-chung-gap-rd-8", order: 2, estimatedTime: "3:25 PM" },
        { stopId: "tung-shan-terrace-bus-stop", order: 3, estimatedTime: "3:30 PM" },
      ],
    },
    {
      id: "5-3:15PM",
      busNumber: "5",
      departureTime: "3:15PM",
      campus: "tai-tam",
      stops: [
        { stopId: "ocean-park", order: 1, estimatedTime: "3:20 PM" },
        { stopId: "luk-kwok-hotel", order: 2, estimatedTime: "3:25 PM" },
        { stopId: "central-pier-4", order: 3, estimatedTime: "3:30 PM" },
      ],
    },

    // 4:20PM Routes
    {
      id: "2-4:20PM",
      busNumber: "2",
      departureTime: "4:20PM",
      campus: "tai-tam",
      stops: [
        { stopId: "harbour-road", order: 1, estimatedTime: "4:25 PM" },
        { stopId: "central-pier-3", order: 2, estimatedTime: "4:30 PM" },
        { stopId: "marriott-hotel", order: 3, estimatedTime: "4:35 PM" },
      ],
    },
    {
      id: "4-4:20PM",
      busNumber: "4",
      departureTime: "4:20PM",
      campus: "tai-tam",
      stops: [
        { stopId: "repulse-bay-rd-102", order: 1, estimatedTime: "4:25 PM" },
        { stopId: "repulse-bay-hotel", order: 2, estimatedTime: "4:30 PM" },
        { stopId: "repulse-bay-rd-56", order: 3, estimatedTime: "4:35 PM" },
      ],
    },
    {
      id: "6-4:20PM",
      busNumber: "6",
      departureTime: "4:20PM",
      campus: "tai-tam",
      stops: [
        { stopId: "redhill-peninsula", order: 1, estimatedTime: "4:25 PM" },
        { stopId: "repulse-bay-rd-90", order: 2, estimatedTime: "4:30 PM" },
        { stopId: "south-bay-rd", order: 3, estimatedTime: "4:35 PM" },
      ],
    },

    // 5:00PM Routes
    {
      id: "7-5:00PM",
      busNumber: "7",
      departureTime: "5:00PM",
      campus: "tai-tam",
      stops: [
        { stopId: "shau-kei-wan", order: 1, estimatedTime: "5:05 PM" },
        { stopId: "taikoo-shing", order: 2, estimatedTime: "5:10 PM" },
        { stopId: "hung-hom-kcr-bus-stop", order: 3, estimatedTime: "5:15 PM" },
      ],
    },
    {
      id: "8-5:00PM",
      busNumber: "8",
      departureTime: "5:00PM",
      campus: "tai-tam",
      stops: [
        { stopId: "headland-rd", order: 1, estimatedTime: "5:05 PM" },
        { stopId: "wong-nai-chung-gap-rd", order: 2, estimatedTime: "5:10 PM" },
        { stopId: "woodland-heights-bus-stop", order: 3, estimatedTime: "5:15 PM" },
      ],
    },
    {
      id: "9-5:00PM",
      busNumber: "9",
      departureTime: "5:00PM",
      campus: "tai-tam",
      stops: [
        { stopId: "repulse-bay-rd-119a", order: 1, estimatedTime: "5:05 PM" },
        { stopId: "deep-water-bay-drive", order: 2, estimatedTime: "5:10 PM" },
        { stopId: "hong-kong-parkview", order: 3, estimatedTime: "5:15 PM" },
      ],
    },
  ],
  stops: [
    // Bus 1 stops
    {
      id: "elements-zara",
      name: "Elements Zara",
      location: { lat: 22.3048, lng: 114.1609 },
      busNumbers: ["1"],
    },
    {
      id: "olympian-city",
      name: "Olympian City (Bank of China Centre)",
      location: { lat: 22.3175, lng: 114.1603 },
      busNumbers: ["1"],
    },
    {
      id: "middle-rd-ymca",
      name: "Middle RD YMCA",
      location: { lat: 22.2995, lng: 114.1747 },
      busNumbers: ["1"],
    },
    {
      id: "rosary-church",
      name: "Rosary Church",
      location: { lat: 22.3068, lng: 114.1723 },
      busNumbers: ["1"],
    },

    // Bus 3 stops
    {
      id: "woodland-heights-bus-stop",
      name: "Woodland Heights Bus Stop",
      location: { lat: 22.267, lng: 114.191 },
      busNumbers: ["3", "8"],
    },
    {
      id: "wong-nai-chung-gap-rd-8",
      name: "Wong Nai Chung Gap Rd#8",
      location: { lat: 22.265, lng: 114.188 },
      busNumbers: ["3"],
    },
    {
      id: "tung-shan-terrace-bus-stop",
      name: "Tung Shan Terrace Bus Stop",
      location: { lat: 22.278, lng: 114.182 },
      busNumbers: ["3"],
    },

    // Bus 5 stops
    {
      id: "ocean-park",
      name: "Ocean Park",
      location: { lat: 22.2334, lng: 114.1733 },
      busNumbers: ["5"],
    },
    {
      id: "luk-kwok-hotel",
      name: "Luk Kwok Hotel",
      location: { lat: 22.2773, lng: 114.1733 },
      busNumbers: ["5"],
    },
    {
      id: "central-pier-4",
      name: "Central Pier 4",
      location: { lat: 22.2899, lng: 114.1598 },
      busNumbers: ["5"],
    },

    // Bus 2 stops
    {
      id: "harbour-road",
      name: "Harbour Road (Fire Station)",
      location: { lat: 22.2799, lng: 114.1698 },
      busNumbers: ["2"],
    },
    {
      id: "central-pier-3",
      name: "Central Pier #3",
      location: { lat: 22.2899, lng: 114.1588 },
      busNumbers: ["2"],
    },
    {
      id: "marriott-hotel",
      name: "Marriott Hotel",
      location: { lat: 22.2799, lng: 114.1647 },
      busNumbers: ["2"],
    },

    // Bus 4 stops
    {
      id: "repulse-bay-rd-102",
      name: "Repulse Bay Rd #102",
      location: { lat: 22.2359, lng: 114.1973 },
      busNumbers: ["4"],
    },
    {
      id: "repulse-bay-hotel",
      name: "Repulse Bay Hotel",
      location: { lat: 22.2359, lng: 114.1983 },
      busNumbers: ["4"],
    },
    {
      id: "repulse-bay-rd-56",
      name: "Repulse Bay Rd #56",
      location: { lat: 22.2359, lng: 114.1993 },
      busNumbers: ["4"],
    },

    // Bus 6 stops
    {
      id: "redhill-peninsula",
      name: "Redhill Peninsula (Main Gate)",
      location: { lat: 22.2469, lng: 114.2093 },
      busNumbers: ["6"],
    },
    {
      id: "repulse-bay-rd-90",
      name: "Repulse Bay Rd #90",
      location: { lat: 22.2603, lng: 114.1927 },
      busNumbers: ["6"],
    },
    {
      id: "south-bay-rd",
      name: "South Bay Rd",
      location: { lat: 22.2433, lng: 114.1939 },
      busNumbers: ["6"],
    },

    // Bus 7 stops
    {
      id: "shau-kei-wan",
      name: "Shau Kei Wan Gov Sec Sch B/S",
      location: { lat: 22.2909, lng: 114.2301 },
      busNumbers: ["7"],
    },
    {
      id: "taikoo-shing",
      name: "Taikoo Shing",
      location: { lat: 22.2861, lng: 114.2183 },
      busNumbers: ["7"],
    },
    {
      id: "hung-hom-kcr-bus-stop",
      name: "Hung Hom KCR Bus Stop",
      location: { lat: 22.303, lng: 114.1819 },
      busNumbers: ["7"],
    },

    // Bus 8 stops
    {
      id: "headland-rd",
      name: "Headland Rd",
      location: { lat: 22.2195, lng: 114.211 },
      busNumbers: ["8"],
    },
    {
      id: "wong-nai-chung-gap-rd",
      name: "Wong Nai Chung Gap Rd",
      location: { lat: 22.265, lng: 114.188 },
      busNumbers: ["8"],
    },

    // Bus 9 stops
    {
      id: "repulse-bay-rd-119a",
      name: "Repulse Bay Rd #119A",
      location: { lat: 22.2359, lng: 114.1963 },
      busNumbers: ["9"],
    },
    {
      id: "deep-water-bay-drive",
      name: "Deep Water Bay Drive",
      location: { lat: 22.2483, lng: 114.1839 },
      busNumbers: ["9"],
    },
    {
      id: "hong-kong-parkview",
      name: "Hong Kong Parkview",
      location: { lat: 22.2636, lng: 114.1974 },
      busNumbers: ["9"],
    },
  ],
}

// Sample data for Repulse Bay campus
export const sampleRepulseBayData: { routes: BusRoute[]; stops: BusStop[] } = {
  routes: [
    // 3:15PM Routes
    {
      id: "31/51-3:15PM",
      busNumber: "31/51",
      departureTime: "3:15PM",
      campus: "repulse-bay",
      stops: [
        { stopId: "hung-hom-kcr", order: 1, estimatedTime: "3:20 PM" },
        { stopId: "middle-rd-peninsula", order: 2, estimatedTime: "3:25 PM" },
        { stopId: "princess-margaret-rd", order: 3, estimatedTime: "3:30 PM" },
      ],
    },
    {
      id: "31/51A-3:15PM",
      busNumber: "31/51A",
      departureTime: "3:15PM",
      campus: "repulse-bay",
      stops: [
        { stopId: "element", order: 1, estimatedTime: "3:20 PM" },
        { stopId: "the-harbourside", order: 2, estimatedTime: "3:25 PM" },
        { stopId: "the-arch", order: 3, estimatedTime: "3:30 PM" },
      ],
    },
    {
      id: "33A/53A-3:15PM",
      busNumber: "33A/53A",
      departureTime: "3:15PM",
      campus: "repulse-bay",
      stops: [
        { stopId: "repulse-bay-rd-90-rb", order: 1, estimatedTime: "3:20 PM" },
        { stopId: "stubbs-rd-34", order: 2, estimatedTime: "3:25 PM" },
        { stopId: "pacific-place-3", order: 3, estimatedTime: "3:30 PM" },
      ],
    },
    {
      id: "35/55-3:15PM",
      busNumber: "35/55",
      departureTime: "3:15PM",
      campus: "repulse-bay",
      stops: [
        { stopId: "marymount-school", order: 1, estimatedTime: "3:20 PM" },
        { stopId: "mount-butler-rd", order: 2, estimatedTime: "3:25 PM" },
        { stopId: "tai-hang-rd", order: 3, estimatedTime: "3:30 PM" },
      ],
    },

    // 4:20PM Routes
    {
      id: "32/52-4:20PM",
      busNumber: "32/52",
      departureTime: "4:20PM",
      campus: "repulse-bay",
      stops: [
        { stopId: "harbour-rd-fire-station", order: 1, estimatedTime: "4:25 PM" },
        { stopId: "pier-3", order: 2, estimatedTime: "4:30 PM" },
        { stopId: "gpo", order: 3, estimatedTime: "4:35 PM" },
      ],
    },
    {
      id: "34/54-4:20PM",
      busNumber: "34/54",
      departureTime: "4:20PM",
      campus: "repulse-bay",
      stops: [
        { stopId: "repulse-bay-rd-67", order: 1, estimatedTime: "4:25 PM" },
        { stopId: "lower-stubbs", order: 2, estimatedTime: "4:30 PM" },
        { stopId: "kennedy-rd", order: 3, estimatedTime: "4:35 PM" },
      ],
    },
    {
      id: "36/56-4:20PM",
      busNumber: "36/56",
      departureTime: "4:20PM",
      campus: "repulse-bay",
      stops: [
        { stopId: "repulse-bay-rd-102-rb", order: 1, estimatedTime: "4:25 PM" },
        { stopId: "island-rd", order: 2, estimatedTime: "4:30 PM" },
        { stopId: "shouson-hill", order: 3, estimatedTime: "4:35 PM" },
      ],
    },

    // 5:00PM Routes
    {
      id: "51-5:00PM",
      busNumber: "51",
      departureTime: "5:00PM",
      campus: "repulse-bay",
      stops: [
        { stopId: "shau-kei-wan-rb", order: 1, estimatedTime: "5:05 PM" },
        { stopId: "taikoo-shing-rb", order: 2, estimatedTime: "5:10 PM" },
        { stopId: "hung-hom-kcr", order: 3, estimatedTime: "5:15 PM" },
      ],
    },
    {
      id: "53-5:00PM",
      busNumber: "53",
      departureTime: "5:00PM",
      campus: "repulse-bay",
      stops: [
        { stopId: "repulse-bay-rd-67", order: 1, estimatedTime: "5:05 PM" },
        { stopId: "lower-stubbs", order: 2, estimatedTime: "5:10 PM" },
        { stopId: "kennedy-rd", order: 3, estimatedTime: "5:15 PM" },
      ],
    },
    {
      id: "55-5:00PM",
      busNumber: "55",
      departureTime: "5:00PM",
      campus: "repulse-bay",
      stops: [
        { stopId: "repulse-bay-rd-19-27", order: 1, estimatedTime: "5:05 PM" },
        { stopId: "happy-valley", order: 2, estimatedTime: "5:10 PM" },
        { stopId: "po-leung-kuk", order: 3, estimatedTime: "5:15 PM" },
      ],
    },
  ],
  stops: [
    // Bus 31/51 stops
    {
      id: "hung-hom-kcr",
      name: "Hung Hom KCR Bus Stop",
      location: { lat: 22.303, lng: 114.1819 },
      busNumbers: ["31/51", "51"],
    },
    {
      id: "middle-rd-peninsula",
      name: "Middle Rd (Peninsula O/Twr)",
      location: { lat: 22.2995, lng: 114.1747 },
      busNumbers: ["31/51"],
    },
    {
      id: "princess-margaret-rd",
      name: "PrN Margaret Rd (Caltex Stn)",
      location: { lat: 22.3068, lng: 114.1723 },
      busNumbers: ["31/51"],
    },

    // Bus 31/51A stops
    {
      id: "element",
      name: "Element",
      location: { lat: 22.3048, lng: 114.1609 },
      busNumbers: ["31/51A"],
    },
    {
      id: "the-harbourside",
      name: "The Harbourside",
      location: { lat: 22.3018, lng: 114.1603 },
      busNumbers: ["31/51A"],
    },
    {
      id: "the-arch",
      name: "The Arch",
      location: { lat: 22.3038, lng: 114.1623 },
      busNumbers: ["31/51A"],
    },

    // Bus 33A/53A stops
    {
      id: "repulse-bay-rd-90-rb",
      name: "Repulse Bay Rd #90",
      location: { lat: 22.2603, lng: 114.1927 },
      busNumbers: ["33A/53A"],
    },
    {
      id: "stubbs-rd-34",
      name: "Stubbs Rd #34 (B/S)",
      location: { lat: 22.2697, lng: 114.1839 },
      busNumbers: ["33A/53A"],
    },
    {
      id: "pacific-place-3",
      name: "Pacific Place 3",
      location: { lat: 22.2773, lng: 114.1647 },
      busNumbers: ["33A/53A"],
    },

    // Bus 35/55 stops
    {
      id: "marymount-school",
      name: "Marymount Pr Sch (B/S)",
      location: { lat: 22.2885, lng: 114.2101 },
      busNumbers: ["35/55"],
    },
    {
      id: "mount-butler-rd",
      name: "Mt. Butler Rd",
      location: { lat: 22.2861, lng: 114.2083 },
      busNumbers: ["35/55"],
    },
    {
      id: "tai-hang-rd",
      name: "Tai Hang Rd",
      location: { lat: 22.2861, lng: 114.1983 },
      busNumbers: ["35/55"],
    },

    // Bus 32/52 stops
    {
      id: "harbour-rd-fire-station",
      name: "Harbour Rd (Fire Station)",
      location: { lat: 22.2799, lng: 114.1698 },
      busNumbers: ["32/52"],
    },
    {
      id: "pier-3",
      name: "Pier #3",
      location: { lat: 22.2899, lng: 114.1578 },
      busNumbers: ["32/52"],
    },
    {
      id: "gpo",
      name: "GPO",
      location: { lat: 22.2799, lng: 114.1598 },
      busNumbers: ["32/52"],
    },

    // Bus 34/54 stops
    {
      id: "repulse-bay-rd-67",
      name: "Repulse Bay Rd #67",
      location: { lat: 22.2359, lng: 114.1953 },
      busNumbers: ["34/54", "53"],
    },
    {
      id: "lower-stubbs",
      name: "Lower Stubbs",
      location: { lat: 22.2697, lng: 114.1829 },
      busNumbers: ["34/54", "53"],
    },
    {
      id: "kennedy-rd",
      name: "Kennedy Rd",
      location: { lat: 22.2773, lng: 114.1637 },
      busNumbers: ["34/54", "53"],
    },

    // Bus 36/56 stops
    {
      id: "repulse-bay-rd-102-rb",
      name: "Repulse Bay Rd #102",
      location: { lat: 22.2359, lng: 114.1973 },
      busNumbers: ["36/56"],
    },
    {
      id: "island-rd",
      name: "Island Rd",
      location: { lat: 22.2433, lng: 114.1839 },
      busNumbers: ["36/56"],
    },
    {
      id: "shouson-hill",
      name: "Shouson Hill",
      location: { lat: 22.2483, lng: 114.1739 },
      busNumbers: ["36/56"],
    },

    // Bus 51 stops (additional)
    {
      id: "shau-kei-wan-rb",
      name: "Shau Kei Wan Gov Sec Sch",
      location: { lat: 22.2909, lng: 114.2301 },
      busNumbers: ["51"],
    },
    {
      id: "taikoo-shing-rb",
      name: "Taikoo Shing",
      location: { lat: 22.2861, lng: 114.2183 },
      busNumbers: ["51"],
    },

    // Bus 55 stops (additional)
    {
      id: "repulse-bay-rd-19-27",
      name: "Repulse Bay Rd #19-27",
      location: { lat: 22.2359, lng: 114.1943 },
      busNumbers: ["55"],
    },
    {
      id: "happy-valley",
      name: "Happy Valley",
      location: { lat: 22.2697, lng: 114.1839 },
      busNumbers: ["55"],
    },
    {
      id: "po-leung-kuk",
      name: "Po Leung Kuk",
      location: { lat: 22.2773, lng: 114.1737 },
      busNumbers: ["55"],
    },
  ],
}
