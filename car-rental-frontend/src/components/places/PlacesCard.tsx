import Image from "next/image";

interface PlaceCardProps {
  place: {
    id: number;
    name: string;
    image: string;
  };
}

export default function PlaceCard({ place }: PlaceCardProps) {
  return (
    <div className="group cursor-pointer">
      <div className="bg-white rounded-[24px] overflow-hidden shadow-[var(--shadow-card)] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-4">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-[16px] bg-gray-100 mb-4">
          <Image
            src={place.image}
            alt={place.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
          />
        </div>

        {/* City Name */}
        <h3 className="text-[var(--color-text-main)] text-[18px] lg:text-[20px] font-semibold text-center">
          {place.name}
        </h3>
      </div>
    </div>
  );
}