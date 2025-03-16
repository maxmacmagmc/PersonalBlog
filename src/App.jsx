
import './App.css'
import {NavBar} from './layout/NavBar'
import {HeroSection} from './layout/HeroSection'
import {Footer} from './layout/Footer'

import { ArticleSection } from './layout/ArticleSection'

function App() {
  

  return (
    <>
    <h1 className='text-5xl text-center p-18'>Vite react project with Tailwind css v4 and shadcn ui</h1>
    
    <NavBar/>
    <ArticleSection/>
      <HeroSection/>
     
      <Footer/>

    </>
  )
}

export default App
