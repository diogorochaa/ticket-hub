import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin } from "lucide-react";

export function HomePage() {
  return (
    <>
      <Header />

      <section className="flex items-center justify-center bg-black">
        <div className="flex flex-col items-start gap-2 text-white">
          <span className="text-purple-700 uppercase font-bold leading-1">
            Show
          </span>
          <h1 className="text-6xl font-bold uppercase">Rock in Rio 2026</h1>
          <p>
            O maior festival de música e experiências <br /> do mundo está de
            volta!
          </p>
          <div className="flex items-center gap-2">
            <Calendar className="w-6 h-6" />
            <span>19, 20, 21 de Julho</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-6 h-6" />
            <span>Rio de Janeiro, RJ</span>
          </div>
          <div className="flex mt-4">
            <Button className="bg-purple-700 text-white py-4 px-8">
              Ver Ingressos
            </Button>
          </div>
        </div>
        <div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV37N-9OAxIYoZe3DjuJKC6niSNZfwBihKHj8J7RyF6w&s=10"
            alt="Rock in Rio 2026"
          />
        </div>
      </section>
      <section className="flex flex-col items-center justify-center text-white">
        <h2>Categorias</h2>
        <div>
          <ul>
            <li>
              <span>Ingressos</span>
            </li>
            <li>
              <span>Ingressos</span>
            </li>
          </ul>
        </div>
      </section>

      <Footer />
    </>
  );
}
