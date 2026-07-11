import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhatIsVPS from "@/components/WhatIsVPS";
import Features from "@/components/Features";
import Regions from "@/components/Regions";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="w-full bg-black">
      <Header />
      <Hero />
      
      {/* What is VPS Section */}
      <section className="w-full bg-black text-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12">What Is a VPS?</h2>
          <div className="space-y-6 text-gray-300 leading-relaxed">
            <p>
              A VPS, or Virtual Private Server, is a virtualized server that operates as an independent system on a physical machine. It provides dedicated CPU, RAM, storage, and its own operating system environment. Full root access allows you to configure the server exactly to your needs, install any software, manage security settings, and adjust system parameters without restrictions or shared resource limitations.
            </p>
            <p>
              A VPS is used when shared hosting no longer meets technical requirements, but renting a dedicated server is unnecessary. It is suitable for websites, game servers, databases, APIs, bots, and software development or testing environments. Each VPS includes its own IP address, predictable performance, and full administrative control, making it reliable for projects that must run continuously and without interference.
            </p>
          </div>
        </div>
      </section>

      <Features />
      <Regions />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
