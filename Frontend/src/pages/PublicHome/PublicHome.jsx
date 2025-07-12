import ProductByCategory from "@/components/Product/ProductByCategory";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function PublicHome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br  text-gray-900">
      {/* Simple Header */}
      <header className="w-full flex items-center justify-between px-6 py-4 bg-white/70 shadow-sm">
        <img src="/logo.png" alt="Logo" className="h-8" />
        <Button
          variant="outline"
          className="px-6 py-2 font-semibold"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
      </header>
      {/* Enhanced Banner Section */}
      <main className="flex flex-1 flex-col">
        <section className="w-full flex flex-col md:flex-row rounded-xl shadow-2xl overflow-hidden bg-white/90">
          {/* Left: Textual Content */}
          <div className="flex-1 flex flex-col justify-center p-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Give Clothes a Second Life</h1>
            <p className="mb-6 text-lg">
              ReWear is your platform to exchange unused clothing through direct swaps or a
              point-based system. Join us in promoting sustainable fashion and reducing textile
              waste—refresh your wardrobe, help the planet, and discover new styles!
            </p>
            <div className="flex gap-4">
              <Button
                className="px-6 py-2 font-semibold bg-green-500 hover:bg-green-600 text-white"
                onClick={() => navigate("/login")}
              >
                Get Started
              </Button>
              <Button
                variant="outline"
                className="px-6 py-2 font-semibold border-white text-white hover:bg-white/10"
                onClick={() =>
                  window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: "smooth",
                  })
                }
              >
                Learn More
              </Button>
            </div>
          </div>
          {/* Right: Visual Content */}
          <div
            className="flex-1 bg-cover bg-center min-h-[320px]"
            style={{
              backgroundImage: "url('/sustainable-fashion.jpg')",
            }}
          >
            {/* Optionally overlay for better text contrast */}
            <div className="w-full h-full bg-gradient-to-l from-black/30 to-transparent"></div>
          </div>
        </section>
        <img src="./banner.webp" alt="Banner" className="w-full object-cover rounded-t-lg" />
        <ProductByCategory category={"Accessories"} />;
      </main>
      <footer className="mt-10 text-gray-500 text-sm text-center">
        &copy; {new Date().getFullYear()} Odoo 2025. All rights reserved.
      </footer>
    </div>
  );
}
