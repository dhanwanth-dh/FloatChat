import React from 'react'
import Dashboard from './Components/Dashboard'
import Header from './Components/Header'

const App = () => {
  return (
    <main className=''>
      {/* Gradient image */}
      <img src="/gradient.png" alt="" className='bg-black h-screen w-screen absolute top-0 right-0 -z-10' />
      <div className='h-0 w-250 absolute top-[20%] right-[5%] shadow-[0_0_900px_20px_#e99b63] -rotate-45 -z-9'></div>
      <Header></Header>
      <Dashboard></Dashboard>
    </main>
  )
}

export default App;