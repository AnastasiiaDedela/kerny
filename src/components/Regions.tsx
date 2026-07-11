import { Badge } from "@/components/ui/badge";

export default function Regions() {
  const regions = {
    Africa: [{ name: "Johannesburg", code: "ZA" }],
    Asia: [
      { name: "Bangalore", code: "IN" },
      { name: "Delhi NCR", code: "IN" },
      { name: "Mumbai", code: "IN" },
      { name: "Osaka", code: "JP" },
      { name: "Seoul", code: "KR" },
      { name: "Singapore", code: "SG" },
      { name: "Tel Aviv", code: "IL" },
      { name: "Tokyo", code: "JP" }
    ],
    Australia: [
      { name: "Melbourne", code: "AU" },
      { name: "Sydney", code: "AU" }
    ],
    Europe: [
      { name: "Amsterdam", code: "NL" },
      { name: "Frankfurt", code: "DE" },
      { name: "London", code: "GB" },
      { name: "Madrid", code: "ES" },
      { name: "Manchester", code: "GB" },
      { name: "Milan", code: "IT" },
      { name: "Paris", code: "FR" },
      { name: "Stockholm", code: "SE" },
      { name: "Warsaw", code: "PL" }
    ],
    "North America": [
      { name: "Atlanta", code: "US" },
      { name: "Chicago", code: "US" },
      { name: "Dallas", code: "US" },
      { name: "Honolulu", code: "US" },
      { name: "Los Angeles", code: "US" },
      { name: "Mexico City", code: "MX" },
      { name: "Miami", code: "US" },
      { name: "New Jersey", code: "US" },
      { name: "Seattle", code: "US" },
      { name: "Silicon Valley", code: "US" },
      { name: "Toronto", code: "CA" }
    ],
    "South America": [
      { name: "Santiago", code: "CL" },
      { name: "São Paulo", code: "BR" }
    ]
  };

  return (
    <section className="w-full bg-black text-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-16 text-center">33 Cloud Data Center Regions</h2>
        
        <div className="space-y-12">
          {Object.entries(regions).map(([continent, cities]) => (
            <div key={continent}>
              <h3 className="text-2xl font-semibold mb-6 text-blue-400">{continent}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {cities.map((city, idx) => (
                  <div 
                    key={idx}
                    className="bg-gray-900/50 rounded-lg p-4 border border-gray-800 hover:border-blue-600 transition flex flex-col items-center justify-center text-center group cursor-pointer"
                  >
                    <div className="text-3xl mb-2 group-hover:scale-110 transition">📍</div>
                    <p className="font-medium text-white">{city.name}</p>
                    <p className="text-sm text-gray-500">{city.code}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
