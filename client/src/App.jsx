import React from 'react'
import Dashboard from './Components/Dashboard'
import Header from './Components/Header'
import vid from './assets/0001-0500.mp4'

const App = () => {
  return (
    <main className=''>
        <video
        autoPlay
        loop
        muted
        playsInline
        className="-z-100 absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src={vid} type="video/mp4" />
      </video>
      {/* Gradient image */}
      <img src="/gradient.png" alt="" className='h-screen w-screen absolute top-0 right-0 -z-10' />
      <div className='h-0 w-250 absolute top-[20%] right-[5%] shadow-[0_0_900px_20px_#e99b63] -rotate-45 -z-9'></div>
      <Header></Header>
      <Dashboard></Dashboard>
    </main>
  )
}

export default App;