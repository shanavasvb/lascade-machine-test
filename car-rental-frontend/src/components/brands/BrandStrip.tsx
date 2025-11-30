import Image from "next/image";

const agencies = [
  {
    name: "Avis",
    code: "avis",
    logo: "http://logos.skyscnr.com/images/carhire/vendors/640.png",
  },
  {
    name: "National",
    code: "national",
    logo: "http://logos.skyscnr.com/images/carhire/vendors/656.png",
  },
  {
    name: "Budget",
    code: "budget",
    logo: "http://logos.skyscnr.com/images/carhire/vendors/686.png",
  },
  {
    name: "Alamo",
    code: "alamo",
    logo: "http://logos.skyscnr.com/images/carhire/vendors/650.png",
  },
  {
    name: "Enterprise",
    code: "enterprise",
    logo: "http://logos.skyscnr.com/images/carhire/vendors/702.png",
  },
  {
    name: "Sixt",
    code: "sixt",
    logo: "http://logos.skyscnr.com/images/carhire/vendors/673.png",
  },
  {
    name: "Hertz",
    code: "hertz",
    logo: "http://logos.skyscnr.com/images/carhire/vendors/672.png",
  },
  {
    name: "Europcar",
    code: "europcar",
    logo: "http://logos.skyscnr.com/images/carhire/vendors/663.png",
  },
];

export default function BrandStrip() {
  return (
    <section className="bg-white border-y border-gray-200">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-8 lg:py-10">
        <div className="flex items-center justify-center gap-8 lg:gap-12 flex-wrap">
          {agencies. map((agency) => (
            <div
              key={agency.code}
              className="relative h-8 w-20 lg:h-10 lg:w-24 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
            >
              <Image
                src={agency.logo}
                alt={agency.name}
                fill
                className="object-contain"
                sizes="100px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}