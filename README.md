# HKIS Bus Finder

HKIS Bus Finder is a web application designed to help Hong Kong International School students, parents, and staff find the right school bus routes and stops. The application provides an interactive map interface to visualize bus stops, search for locations, and find nearby bus routes.

<img width="1170" alt="Screenshot 2025-04-24 at 9 35 50 AM" src="https://github.com/user-attachments/assets/a85996de-0392-4d71-b303-6abf853f3e0e" />
### Try it out!! 
https://v0-hkis-bus-finder.vercel.app/

## Features

- **Interactive Map**: Visualize all bus stops on a Google Maps interface
- **Campus Selection**: Toggle between Tai Tam and Repulse Bay campuses
- **Time Selection**: Choose between different bus departure times (3:15PM, 4:20PM, 5:00PM)
- **Location Search**: Search for locations in Hong Kong and find nearby bus stops
- **Bus Stop Information**: View detailed information about each bus stop, including bus numbers and schedules
- **Nearby Stops**: Find bus stops within a 5-minute walking distance of a searched location
- **Responsive Design**: Works on desktop and mobile devices

## Quick Start

### Prerequisites

- Node.js 14.x or higher
- npm or yarn
- Google Maps API key

### Installation

1. Clone the repository:
   git clone https://github.com/yourusername/hkis-bus-finder.git
   cd hkis-bus-finder

2. Install dependencies:
   > npm install 
   > yarn install
  

3. Create a `.env.local` file in the root directory and add your Google Maps API key:

   > NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
 

4. Start the development server:
   > npm run dev
   > yarn dev
  

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Deployment

To deploy the application to production:

1. Build the application:
   > npm run build
   or
   > yarn build

2. Start the production server:
   \`\`\`bash
   npm start
   # or
   yarn start
   \`\`\`

Alternatively, you can deploy to Vercel with a single command:
\`\`\`bash
npx vercel
\`\`\`

## Modifying Bus Data

The bus data is stored in the `lib/sample-data.ts` file. This file contains two main objects:

1. `sampleTaiTamData` - Contains all bus routes and stops for the Tai Tam campus
2. `sampleRepulseBayData` - Contains all bus routes and stops for the Repulse Bay campus

### Modifying Bus Stops

To modify a bus stop's location or details:

1. Open `lib/sample-data.ts`
2. Find the bus stop in either the `sampleTaiTamData.stops` or `sampleRepulseBayData.stops` array
3. Update the properties as needed:

\`\`\`typescript
{
  id: "elements-zara",
  name: "Elements Zara",              // Change the name here
  location: { 
    lat: 22.3048,                     // Change latitude here
    lng: 114.1609                     // Change longitude here
  },
  busNumbers: ["1", "31/51A"],        // Add or remove bus numbers here
}
\`\`\`

### Adding a New Bus Stop

To add a new bus stop:

1. Add a new entry to the appropriate `stops` array:

\`\`\`typescript
{
  id: "new-stop-id",                  // Unique identifier (kebab-case)
  name: "New Stop Name",              // Display name
  location: { lat: 22.XXXX, lng: 114.XXXX }, // Coordinates
  busNumbers: ["1", "3"]              // Bus numbers that stop here
}
\`\`\`

2. Update the relevant route(s) in the `routes` array to include this stop:

\`\`\`typescript
stops: [
  // ... existing stops
  { stopId: "new-stop-id", order: 4, estimatedTime: "3:40 PM" }
]
\`\`\`

### Adding a New Bus Route

To add a new bus route:

1. Add a new entry to the appropriate `routes` array:

\`\`\`typescript
{
  id: "10-3:15PM",                    // Unique identifier (format: "busNumber-departureTime")
  busNumber: "10",                    // Bus number
  departureTime: "3:15PM",            // Departure time
  campus: "tai-tam",                  // Campus ("tai-tam" or "repulse-bay")
  stops: [
    { stopId: "stop-1", order: 1, estimatedTime: "3:20 PM" },
    { stopId: "stop-2", order: 2, estimatedTime: "3:25 PM" },
    // Add more stops as needed
  ],
}
\`\`\`

### Finding Coordinates

You can find the correct coordinates for locations in Hong Kong using:

1. **Google Maps**: Right-click on a location and select "What's here?" to see the coordinates
2. **Online Map Tools**: Websites like [latlong.net](https://www.latlong.net/) allow you to search for locations and get their coordinates

## Converting Bus Schedule Data

The application includes a data conversion tool that can parse text-based bus schedules into the required JSON format:

1. Navigate to `/convert-data` in the application
2. Paste the bus schedule text data into the appropriate campus field
3. Click "Convert to JSON" to generate the structured data
4. Use the "Import to Application" button to use the data in the app

## Project Structure

\`\`\`
HKIS_Bus_Finder/
├── app/                  # Next.js app directory
│   ├── page.tsx          # Main application page
│   ├── layout.tsx        # Root layout component
│   ├── convert-data/     # Data conversion tool
│   └── import-data/      # Data import tool
├── components/           # React components
│   ├── bus-stop-list.tsx # Bus stop listing component
│   ├── campus-selector.tsx # Campus selection component
│   ├── faq-button.tsx    # FAQ dialog component
│   ├── google-maps-provider.tsx # Google Maps context provider
│   ├── map-view.tsx      # Map visualization component
│   ├── search-bar.tsx    # Search input component
│   ├── time-selector.tsx # Time selection component
│   └── ui/               # UI components (shadcn/ui)
├── lib/                  # Utility functions and data
│   ├── db-service.ts     # Data access service
│   ├── parse-bus-data.ts # Bus data parser
│   ├── sample-data.ts    # Sample bus data
│   ├── types.ts          # TypeScript type definitions
│   └── utils.ts          # Utility functions
├── scripts/              # Utility scripts
│   ├── convert-bus-data.tsx # Data conversion component
│   └── import-bus-data.tsx  # Data import component
├── .env.local            # Environment variables (not in repo)
├── .gitignore            # Git ignore file
├── next.config.js        # Next.js configuration
├── package.json          # Project dependencies
├── README.md             # Project documentation
└── tsconfig.json         # TypeScript configuration
\`\`\`

## Technologies Used

- **Next.js**: React framework for server-rendered applications
- **TypeScript**: Type-safe JavaScript
- **Google Maps API**: For map visualization and location search
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: UI component library
- **Lucide React**: Icon library

## Environment Variables

The application requires the following environment variables:

- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`: Google Maps API key with Maps JavaScript API and Places API enabled

Create a `.env.local` file in the root directory with these variables.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Hong Kong International School
- Kwoon Chung Motors Co. LTD for providing the bus schedule data
