import { GeminiEffect } from "@/components/GeminiEffectSection";
import {HomeCard} from '../components/home-cards/home-3d-card.jsx';

export default function Home() {
  return (
    <>
      <div className="z-10 pb-20 section  w-full items-center justify-between font-inter text-sm">
       
        <GeminiEffect/>

        <div className="grid  lg:grid-cols-3 md:grid-cols-2 gap-3 place-content-center">
          
          <HomeCard title={'Detect object in seconds'} subtitle={'Upload image and detect object in seconds'} img={'https://i.postimg.cc/W3MfBHPY/Screenshot-2024-11-04-190350.png'} link={'/classification'}/>
          <HomeCard title={'Chat with generative ai.'} subtitle={'Ask anything to the generative ai.'} img={'https://i.postimg.cc/FKj0x5vR/Screenshot-2024-11-04-190606.png'} link={'/chat'}/>
          <HomeCard title={'Realtime stock data.'} subtitle={'Realtime stock data and prediction.'} img={'https://i.postimg.cc/K85MK7Dk/Screenshot-2024-11-04-190654.png'} link={'/dashboard'}/>
       
          </div>
      </div>
      
    </>
  )
}