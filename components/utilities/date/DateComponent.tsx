import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function DateComponent({ dateString }: { dateString: string }) {
  return (
    <time dateTime={dateString} className="flex flex-col justify-center">
      {format(new Date(dateString), "d MMMM yyyy", { locale: fr })}
    </time>
  );
}
