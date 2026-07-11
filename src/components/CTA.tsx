import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section className="w-full bg-gradient-to-b from-black to-gray-950 text-white py-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl font-bold mb-8">Join the Future Of VPS Today!</h2>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white h-12 px-8 text-base font-semibold">
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
}
