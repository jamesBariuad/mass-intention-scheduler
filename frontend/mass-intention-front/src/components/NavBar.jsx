import React from 'react'

const NavBar = () => {
  return (
    <>
        <nav className='flex place-content-between px-7 py-5 bg-slate-50 shadow-md '>
            <div>LOGo</div>
            <div className='flex gap-3'>
                <ul>Home</ul>
                <ul>Schedule</ul>
                <ul>Print</ul>
            </div>
        </nav>
    </>
  )
}

export default NavBar