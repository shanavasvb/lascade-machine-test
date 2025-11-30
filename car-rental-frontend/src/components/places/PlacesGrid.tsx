import PlaceCard from "./PlacesCard";
const places = [
  {
    id: 1,
    name: "Paris",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
  },
  {
    id: 2,
    name: "Rome",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80",
  },
  {
    id: 3,
    name: "Amsterdam",
    image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&q=80",
  },
  {
    id: 4,
    name: "Barcelona",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80",
  },
  {
    id: 5,
    name: "London",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80",
  },
  {
    id: 6,
    name: "Berlin",
    image: "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=800&q=80",
  },
  {
    id: 7,
    name: "Lisbon",
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&q=80",
  },
  {
    id: 8,
    name: "Prague",
    image: "https://images.unsplash.com/photo-1541849546-216549ae216d?w=800&q=80",
  },
];


export default function PlacesGrid() {
  return (
    <section className="bg-[var(--color-bg-page)] py-16 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Title */}
        <h2 className="text-[28px] lg:text-[36px] font-bold text-[var(--color-text-main)] text-center mb-10 lg:mb-14">
          Top places to visit
        </h2>

        {/* Grid  */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6">
          {places.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      </div>
    </section>
  );
}