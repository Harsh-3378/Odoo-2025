import ProductByCategory from "@/components/Product/ProductByCategory";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Leaf, Recycle, Heart, ArrowRight, Star, Users, Award, CheckCircle } from "lucide-react";

export default function PublicHome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 text-gray-900">
      {/* Modern Header with Glassmorphism */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/80 border-b border-white/20 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src="/logo.png" alt="ReWear Logo" className="h-10 w-auto" />
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              ReWear
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
              How It Works
            </a>
            <a href="#community" className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">
              Community
            </a>
          </nav>
          <Button
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => navigate("/login")}
          >
            Get Started
          </Button>
        </div>
      </header>

      {/* Hero Section with Enhanced Design */}
      <main className="flex flex-col">
        <section className="relative overflow-hidden">
          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-emerald-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-teal-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-green-200 rounded-full opacity-20 animate-pulse delay-500"></div>
          
          <div className="container mx-auto px-6 py-20 lg:py-32">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Left: Enhanced Content */}
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Leaf className="w-4 h-4" />
                  Sustainable Fashion Revolution
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                  Give Clothes a{" "}
                  <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 bg-clip-text text-transparent">
                    Second Life
                  </span>
                </h1>
                
                <p className="text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Transform your wardrobe sustainably with ReWear. Exchange unused clothing through 
                  direct swaps or our innovative point system. Join thousands reducing textile waste 
                  while discovering amazing new styles.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
                    onClick={() => navigate("/login")}
                  >
                    Start Your Journey
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-semibold px-8 py-4 rounded-full transition-all duration-300"
                    onClick={() =>
                      window.scrollTo({
                        top: document.getElementById('features')?.offsetTop || 0,
                        behavior: "smooth",
                      })
                    }
                  >
                    Learn More
                  </Button>
                </div>
                
                {/* Stats */}
                <div className="flex flex-wrap gap-8 mt-12 justify-center lg:justify-start">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-600">10K+</div>
                    <div className="text-sm text-gray-600">Happy Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-600">50K+</div>
                    <div className="text-sm text-gray-600">Items Swapped</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-600">2.3M</div>
                    <div className="text-sm text-gray-600">CO₂ Saved (lbs)</div>
                  </div>
                </div>
              </div>
              
              {/* Right: Interactive Visual Display */}
              <div className="flex-1 relative">
                <div className="relative h-96 lg:h-[500px]">
                  {/* Main gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-teal-400 to-green-400 rounded-3xl shadow-2xl"></div>
                  
                  {/* Floating clothing items */}
                  <div className="absolute inset-0 overflow-hidden rounded-3xl">
                    {/* Clothing Item 1 */}
                    <div className="absolute top-8 left-8 w-24 h-32 bg-white rounded-2xl shadow-lg transform rotate-12 hover:rotate-6 transition-transform duration-300">
                      <div className="p-3">
                        <div className="w-full h-16 bg-gradient-to-br from-pink-200 to-pink-300 rounded-lg mb-2"></div>
                        <div className="text-xs font-semibold text-gray-700">Vintage Dress</div>
                        <div className="text-xs text-gray-500">Size M</div>
                      </div>
                    </div>
                    
                    {/* Clothing Item 2 */}
                    <div className="absolute top-16 right-12 w-24 h-32 bg-white rounded-2xl shadow-lg transform -rotate-12 hover:rotate-6 transition-transform duration-300">
                      <div className="p-3">
                        <div className="w-full h-16 bg-gradient-to-br from-blue-200 to-blue-300 rounded-lg mb-2"></div>
                        <div className="text-xs font-semibold text-gray-700">Denim Jacket</div>
                        <div className="text-xs text-gray-500">Size L</div>
                      </div>
                    </div>
                    
                    {/* Clothing Item 3 */}
                    <div className="absolute bottom-20 left-12 w-24 h-32 bg-white rounded-2xl shadow-lg transform rotate-6 hover:-rotate-6 transition-transform duration-300">
                      <div className="p-3">
                        <div className="w-full h-16 bg-gradient-to-br from-purple-200 to-purple-300 rounded-lg mb-2"></div>
                        <div className="text-xs font-semibold text-gray-700">Silk Blouse</div>
                        <div className="text-xs text-gray-500">Size S</div>
                      </div>
                    </div>
                    
                    {/* Clothing Item 4 */}
                    <div className="absolute bottom-8 right-8 w-24 h-32 bg-white rounded-2xl shadow-lg transform -rotate-6 hover:rotate-12 transition-transform duration-300">
                      <div className="p-3">
                        <div className="w-full h-16 bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-lg mb-2"></div>
                        <div className="text-xs font-semibold text-gray-700">Summer Top</div>
                        <div className="text-xs text-gray-500">Size M</div>
                      </div>
                    </div>
                    
                    {/* Central swap animation */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-20 h-20 bg-white rounded-full shadow-xl flex items-center justify-center animate-pulse">
                        <Recycle className="w-10 h-10 text-emerald-600 animate-spin" style={{animationDuration: '3s'}} />
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating feature cards */}
                  <div className="absolute -top-4 -left-4 bg-white p-4 rounded-2xl shadow-xl animate-bounce" style={{animationDuration: '3s'}}>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Recycle className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <div className="text-sm font-bold">Eco-Friendly</div>
                        <div className="text-xs text-gray-500">100% Sustainable</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-2xl shadow-xl animate-bounce" style={{animationDuration: '3s', animationDelay: '1s'}}>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                        <Heart className="w-4 h-4 text-pink-600" />
                      </div>
                      <div>
                        <div className="text-sm font-bold">Loved by 10K+</div>
                        <div className="text-xs text-gray-500">Happy Customers</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute top-4 left-1/2 w-4 h-4 bg-white rounded-full opacity-60 animate-ping"></div>
                  <div className="absolute bottom-12 left-1/4 w-3 h-3 bg-white rounded-full opacity-40 animate-ping" style={{animationDelay: '2s'}}></div>
                  <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-white rounded-full opacity-50 animate-ping" style={{animationDelay: '4s'}}></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                Why Choose <span className="text-emerald-600">ReWear</span>?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Join the sustainable fashion revolution with features designed to make clothing exchange effortless and rewarding.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Recycle className="w-8 h-8" />,
                  title: "Smart Exchange System",
                  description: "Swap clothes directly or use our point-based system for flexible exchanges."
                },
                {
                  icon: <Leaf className="w-8 h-8" />,
                  title: "Environmental Impact",
                  description: "Track your contribution to reducing textile waste and environmental protection."
                },
                {
                  icon: <Users className="w-8 h-8" />,
                  title: "Vibrant Community",
                  description: "Connect with like-minded fashion enthusiasts committed to sustainability."
                }
              ].map((feature, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">How It Works</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Getting started with ReWear is simple and rewarding. Here's how you can begin your sustainable fashion journey.
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: "1", title: "Upload", description: "Take photos of clothes you want to exchange" },
                { step: "2", title: "Browse", description: "Discover amazing items from our community" },
                { step: "3", title: "Exchange", description: "Swap directly or use points to get what you love" },
                { step: "4", title: "Enjoy", description: "Refresh your wardrobe sustainably" }
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Banner Image */}
        <div className="relative">
          <img src="./banner.webp" alt="ReWear Banner" className="w-full h-64 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-teal-900/80 flex items-center justify-center">
            <div className="text-center text-white">
              <h3 className="text-3xl font-bold mb-2">Ready to Transform Your Wardrobe?</h3>
              <p className="text-xl opacity-90">Join thousands making fashion more sustainable</p>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Featured Accessories</h2>
              <p className="text-xl text-gray-600">Discover amazing accessories waiting for a new home</p>
            </div>
            <ProductByCategory category={"Accessories"} />
          </div>
        </section>

        {/* Community Section */}
        <section id="community" className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">Join Our Community</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Be part of a movement that's changing how we think about fashion and sustainability.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="space-y-6">
                  {[
                    "Connect with eco-conscious fashion lovers",
                    "Share your sustainable style journey",
                    "Get rewarded for positive environmental impact",
                    "Access exclusive community events and tips"
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-lg">{benefit}</span>
                    </div>
                  ))}
                </div>
                
                <Button
                  size="lg"
                  className="mt-8 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => navigate("/login")}
                >
                  Join ReWear Today
                </Button>
              </div>
              
              <div className="bg-white p-8 rounded-3xl shadow-xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-lg">Sarah M.</div>
                    <div className="text-sm text-gray-500">ReWear Community Member</div>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "ReWear has completely transformed how I think about fashion. I've discovered amazing pieces while knowing I'm helping the environment. The community is incredibly supportive!"
                </p>
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/logo.png" alt="ReWear Logo" className="h-8 w-auto" />
                <span className="text-xl font-bold">ReWear</span>
              </div>
              <p className="text-gray-400">
                Making fashion sustainable, one swap at a time.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Community</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Events</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Stories</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} ReWear. All rights reserved. Built with 💚 for a sustainable future.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
