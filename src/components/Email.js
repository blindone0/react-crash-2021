import emailjs from '@emailjs/browser';
import { useRef } from 'react'

import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';



export const Email = () => {
    const form = useRef();
  
    const sendEmail = (e) => {
      e.preventDefault();
      document.getElementById("buton").disabled = true;
      emailjs.sendForm('service_GARDEN', 'template_0e3mpj1', form.current, 'nIP-0HbzXnCr9HBDY')
        .then((result) => {
            console.log(result.text);
            
        }, (error) => {
            console.log(error.text);
        });
    };
  
    return (
      <form ref={form} onSubmit={sendEmail}>
        <label>Your Name</label>
        <input type="text" name="user_name" />
        <label>Your telephone/email</label>
        <input type="text" name="user_email" />
        <label>Your question to Oracle</label>
        <textarea name="message" />

        <Popup trigger={<button id="buton" type="submit">Ask Tarot Question</button>} position="right center">
        <div>Your question was sent</div>
        </Popup>
        
      </form>
    );
  };    

export default Email