import React, { useImperativeHandle , useRef } from 'react';
import { ImCross } from "react-icons/im";

import { createPortal } from 'react-dom';
import './Modal.scss'
const Modal = ({ref,children , ...props}) => {
  
    const dialog = useRef();
    useImperativeHandle(ref ,() => {
       return{
        open(){
            dialog.current.showModal();
        },
        close(){
          dialog.current.close();
        }
       }
    })
  return createPortal(
    <dialog ref={dialog} {...props}>
        <form method='dialog' className='cancel-form'>
        <button className='cancel-btn'><ImCross /></button>
       </form>
       {children}
       
    </dialog> , document.getElementById('modal-root')
  )
}

export default Modal
