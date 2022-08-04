import React from 'react'
import './CatagoryModal.css'

export default function CatagoryModal({open, onClose}) {
  if(!open) return null

  return (
    <>
    <div className='overlay' />
    <div className='modal'>
      <button onClick={onClose}>Close Modal</button> 
      Catagory
    </div>
    </>
    
  )
}
