'use client';

import ButtonFramerComponent from '../../framer/button';
import HeroSmallsloganFramerComponent from '../../framer/hero-smallslogan';
import MessageFramerComponent from '../../framer/message';
import OurNumRoundFramerComponent from '../../framer/our-num-round';

export default function FramerDemoPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20">
        <HeroSmallsloganFramerComponent.Responsive
          partTop="We Craft Education"
          partBottom="Since 2024"
        />
      </section>

      {/* Message Section */}
      <section className="py-16 bg-gray-50">
        <MessageFramerComponent.Responsive
          message="We are here to create educational spaces that will inspire learning and growth."
        />
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <OurNumRoundFramerComponent.Responsive
          end={2024}
          start={2020}
          header="Years of Experience"
          speedMs={120}
          description="Building the future of education"
        />
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto text-center">
          <ButtonFramerComponent.Responsive
            link="/contact"
            title="Get Started Today"
            newTab={false}
            smoothScroll={true}
            variants="White - Big email"
          />
        </div>
      </section>
    </div>
  );
}
