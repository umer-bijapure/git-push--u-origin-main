import Image from 'next/image'
import LoginPage from './auth/page'
import TopCarousel from './components/TopCarousel'
import FeaturesGrid from './components/FeaturesGrid'
import ServicesGrid from './components/ServicesGrid'


export default function Home() {
  return (
    <div className="w-full min-h-screen text-center bg-[color:var(--mainTitleColor)] mt-20 ">
      
    <TopCarousel/>
    {/* <FeaturesGrid/> */}
    <ServicesGrid/>

    </div>
  )
}
