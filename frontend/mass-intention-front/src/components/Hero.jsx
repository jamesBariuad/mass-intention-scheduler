import React from 'react'
import heroImage from '../assets/daniel-tseng-QCjC1KpA4nA-unsplash.jpg'

const Hero = () => {
  return (
    <>
    <div className='flex flex-col px-5 gap-3 text-slate-50 justify-center items-center w-screen h-dvh bg-center grayscale brightness-90 bg-cover absolute -z-10' style={{backgroundImage:`url(${heroImage})`}}>
        {/* <img src={heroImage} alt="" srcset="" /> */}
        <div className='text-4xl'>Mass Intention</div>
        <div className='text-sm px-10'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus nam nostrum odio et aspernatur illo!</div>
        <button className='mt-5 font-semibold text-black bg-slate-50 mx-auto px-5 py-2 rounded-xl'>Schedule A Mass</button>
    </div>
    <div className='w-screen h-screen bg-black opacity-20 absolute -z-50 '></div>
    </>

  )
}

export default Hero