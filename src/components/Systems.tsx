import { Badge } from "@/components/ui/badge";

export default function Systems() {
  const systems = [
    "Linux",
    "Windows",
    "Ubuntu",
    "CentOS",
    "Debian",
    "Rocky Linux",
    "AlmaLinux",
    "FreeBSD"
  ];

  return (
    <section className="w-full bg-gray-950 text-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-center">Easy Operation Systems</h2>
        <p className="text-gray-400 text-center mb-12">
          Compatible with all major operating systems and distributions
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {systems.map((system, index) => (
            <div 
              key={index}
              className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-blue-500 transition flex flex-col items-center justify-center cursor-pointer"
            >
              <div className="text-4xl mb-3">💿</div>
              <Badge variant="secondary" className="bg-blue-600/20 text-blue-300 hover:bg-blue-600/30">
                {system}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
