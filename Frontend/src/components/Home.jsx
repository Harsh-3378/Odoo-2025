import React from 'react'
import { ModeToggle } from "./ThemeProvider/modeToggle"
import PublicHome from "@/pages/PublicHome/PublicHome"
import ProductByCategory from "./Product/ProductByCategory"

function Home() {
  return (
    <div>

      // add here some best banner
      
      {/* and add category like that tah automattically sawed ht eproduct  */}

      <ProductByCategory category={"Accessories"} />
    </div>
  )
}

export default Home