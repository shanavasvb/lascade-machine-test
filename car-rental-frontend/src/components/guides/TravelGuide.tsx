import Image from "next/image";
import Link from "next/link";

const guides = [
  {
    id: 1,
    title: "Rental Company's Contact Information",
    description: "Always have the rental company's phone number handy. Most offer 24/7 support for emergencies or questions.",
    image: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=800&q=80",
  },
  {
    id: 2,
    title: "Fuel Up Before Returning",
    description: "Make sure to fill the gas tank before returning the car to avoid additional refueling and service fees.",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80",
  },
  {
    id: 3,
    title: "Choose the Right Fuel Type",
    description: "In some countries, diesel engines are more cost-efficient than gasoline. Check fuel types when selecting your car.",
    image: "https://images.unsplash.com/photo-1628744876497-eb30460be9f6?w=800&q=80",
  },
  {
    id: 4,
    title: "Return the Car on Time",
    description: "Late returns can result in added fees. Plan for extra buffer time, especially in unfamiliar areas.",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80",
  },
  {
    id: 5,
    title: "Inspect the Vehicle Before Departure",
    description: "Before you drive off, check the car for any pre-existing damage and ensure that everything is in working order. Report any issues to the rental company immediately.",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80", 
  },
  {
    id: 6,
    title: "Adapt to Driving Conditions",
    description: "Adjust your driving and car selection to match the terrain and weather. When in doubt, ask the rental company for guidance.",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80",
  },
];

export default function TravelGuides() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-[32px] lg:text-[40px] font-bold text-[var(--color-text-main)] mb-4">
            Recommended Travel Guides
          </h2>
          <p className="text-[15px] lg:text-[16px] text-[var(--color-text-muted)] max-w-[800px] mx-auto leading-relaxed">
            Car rentals have surged in popularity for their affordability and convenience, offering options
            from luxury to practical rides. Before you book, here are key tips to keep in mind.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* First 4 guide cards - Top row */}
          {guides.slice(0, 4).map((guide) => (
            <GuideCard key={guide.id} guide={guide} />
          ))}

          {/* Fifth guide card - Bottom left */}
          <GuideCard guide={guides[4]} />

          {/* Sixth guide card - Bottom second */}
          <GuideCard guide={guides[5]} />

          {/* CTA Card - Bottom right spanning 2 columns */}
          <div className="md:col-span-2 lg:col-span-2">
            <CTACard />
          </div>
        </div>
      </div>
    </section>
  );
}

function GuideCard({ guide }: { guide: typeof guides[0] }) {
  return (
    <article className="group cursor-pointer">
      <div className="bg-white rounded-[20px] overflow-hidden shadow-[var(--shadow-card)] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
          <Image
            src={guide.image}
            alt={guide.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-[18px] lg:text-[20px] font-bold text-[var(--color-text-main)] mb-3">
            {guide.title}
          </h3>
          <p className="text-[14px] lg:text-[15px] text-[var(--color-text-muted)] leading-relaxed">
            {guide.description}
          </p>
        </div>
      </div>
    </article>
  );
}

function CTACard() {
  return (
    <div className="relative rounded-[20px] overflow-hidden shadow-[var(--shadow-card)] hover:shadow-xl transition-all duration-300 group cursor-pointer h-full">
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80"
          alt="Where to next"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      </div>
      
      {/* Content */}
      <div className="relative h-full flex flex-col justify-center px-8 lg:px-10 py-8 min-h-[280px]">
        <h3 className="text-white text-[32px] lg:text-[40px] font-bold mb-3 leading-tight">
          Where to next?
        </h3>
        <p className="text-white/90 text-[15px] lg:text-[16px] mb-5 leading-relaxed max-w-[400px]">
          Start your road trip with Airport rental cars with exciting offers.
        </p>
        <div>
     <Link href="/">
    <button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-semibold text-[15px] lg:text-[16px] px-8 py-3 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95">
    Find your car now
     </button> 
    </Link>
        </div>
      </div>
    </div>
  );
}