import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Features() {
  const features = [
    {
      title: "DDoS Protection",
      description: "Built-in DDoS protection helps keep your services online during attacks. Traffic is filtered automatically, reducing downtime and protecting applications from network threats."
    },
    {
      title: "Premium Equipment",
      description: "Our servers run on modern, high quality hardware designed for constant load. Enterprise grade components ensure stable operation, fast data processing, and consistent performance for demanding tasks, including databases, applications, and game servers running around the clock."
    },
    {
      title: "Round-The-Clock Support",
      description: "Our support team is available 24/7 to help with technical questions and operational issues. We respond quickly, assist with server configuration and troubleshooting, and provide clear guidance when issues occur, so you are not left alone dealing with infrastructure challenges."
    },
    {
      title: "Global Region Coverage",
      description: "Choose from multiple server regions to reduce latency and meet your needs. Deploy services closer to users, improve response times, and balance workloads across locations."
    }
  ];

  return (
    <section className="w-full bg-black text-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-6">Why Our Service?</h2>
          <p className="text-gray-400 max-w-2xl">
            We focus on reliability, security, and consistent operation for real projects. Our infrastructure is designed for long-term workloads, protection against common risks, and stable performance under load. You get a dependable environment and support that helps you stay focused on your product, not server issues.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-gray-900/50 rounded-xl p-8 border border-gray-800 hover:border-blue-600/50 transition group"
            >
              <div className="w-16 h-16 bg-blue-600/20 rounded-lg mb-6 flex items-center justify-center text-3xl group-hover:bg-blue-600/30 transition">
                {index === 0 && "🛡️"}
                {index === 1 && "⚙️"}
                {index === 2 && "🎧"}
                {index === 3 && "🌍"}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
