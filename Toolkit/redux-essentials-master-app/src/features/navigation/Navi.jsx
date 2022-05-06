import React from 'react'
import { Link } from 'react-router-dom'

const Navi = () => {
  return (
    <div className='bg-primary w-100 d-flex justify-content-center pb-1'>
      <div className='w-50'>  
        <h1 className="bg-primary py-3 text-light">Navigation bar</h1>
        <Link to="/">Posts</Link>
     </div>
    </div>
  )
}

export default Navi
