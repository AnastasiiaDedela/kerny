import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="w-full bg-gradient-to-b from-blue-950 via-blue-900 to-black text-white py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap gap-3 mb-8">
          <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/50 text-blue-300 text-sm">
            #Reliability
          </span>
          <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/50 text-blue-300 text-sm">
            #DDoSProtection
          </span>
          <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/50 text-blue-300 text-sm">
            #Performance
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight max-w-4xl">
          VPS Service - MVP That Actually Works
        </h1>

        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl leading-relaxed">
          Reliable VPS built for real workloads. Dedicated resources and full root access. Deploy servers in minutes and run websites, game servers, databases, bots, or APIs without hidden limits, overselling, or unnecessary complexity. Stable operation without interruptions. Full control.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 items-start mb-16">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white h-12 px-8 text-base font-semibold">
            Get Started
          </Button>
          <div className="flex items-center gap-3">
            <div className="text-3xl font-bold text-white">15 465</div>
            <div className="text-gray-400">active servers</div>
          </div>
        </div>
      </div>
    </section>
  );
}
