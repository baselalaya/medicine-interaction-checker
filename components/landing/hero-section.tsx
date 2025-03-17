import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Check Medicine Interactions with AI Precision
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Our advanced AI analyzes potential interactions between your medications, helping you stay safe and informed about your health.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg">
              <Link href="/register">Get Started Free</Link>
            </Button>
            <Button variant="outline" size="lg">
              <Link href="#how-it-works">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}