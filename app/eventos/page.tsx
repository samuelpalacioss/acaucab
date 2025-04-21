import { EventCard } from "@/components/eventos/evento-card";

export default function EventosPage() {
  const events = [
    {
      id: 1,
      title: "Oktoberfest",
      description: "Festival de cerveza alemana con música en vivo y gastronomía tradicional",
      image: "/placeholder.svg?height=200&width=400",
      location: "Plaza Los Palos Grandes",
      date: "15 de Mayo",
      time: "4:00 PM - 9:00 PM",
    },
    {
      id: 2,
      title: "ACAUCAB Fest",
      description: "Degustación de cervezas artesanales con los mejores maestros cerveceros",
      image: "/placeholder.svg?height=200&width=400",
      location: "Plaza Alfredo Sadel",
      date: "22 de Mayo",
      time: "5:00 PM - 9:00 PM",
    },
    {
      id: 3,
      title: "Artesano Fest",
      description: "Festival de cerveza artesanal con talleres de elaboración y cata",
      image: "/placeholder.svg?height=200&width=400",
      location: "C.C Cerro Verde",
      date: "5 de Mayo",
      time: "1:00 PM - 5:00 PM",
    },
  ];

  return (
    <>
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">Eventos</p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Próximos Eventos
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
            Disfruta de los mejores eventos de cerveza y más de ACAUCAB en la ciudad de Caracas a
          </p>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </>
  );
}
