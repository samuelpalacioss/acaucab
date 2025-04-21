import Image from "next/image";
import { MapPin, Clock } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

interface Event {
  id: number;
  title: string;
  description: string;
  image: string;
  location: string;
  date: string;
  time: string;
}

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Card className="overflow-hidden border border-gray-200 h-full flex flex-col max-w-md">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={event.image || "/placeholder.svg"}
          alt={event.title}
          width={300}
          height={160}
          className="object-cover w-full h-full"
        />
      </div>
      <CardHeader className="p-4 pb-2">
        <h2 className="text-xl font-bold">{event.title}</h2>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        <p className="text-sm text-gray-700">{event.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col items-start gap-1">
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{event.location}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="h-4 w-4 mr-1" />
          <span>
            {event.date} | {event.time}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
