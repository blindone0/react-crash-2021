import emailjs from '@emailjs/browser';
import { useRef } from 'react'

export const Email = () => {
    const form = useRef();
  
    const sendEmail = (e) => {
      e.preventDefault();
  
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
        <label>Yourn Email</label>
        <input type="email" name="user_email" />
        <label>Your Question to Oracle</label>
        <textarea name="message" />
        <button type="submit">Ask Tarot Question</button> 
      </form>
    );
  };    

export default Email