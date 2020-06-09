import React,{useState} from 'react'
import './style.css'
import imgs from '../../esset/pt.jpg'
import logo from '../../esset/logo.svg'
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom'
import api from '../../service/api.js'
 

 function Login(){
     
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('')
  const redirect=useHistory()

  const data={
    email,
    password
  }
  async function henderLogin(e){
    e.preventDefault()
    await api.post('/login',data)
    redirect.push('/')
  }

  return(
    <section>
     <item>
      <figure>
          <img src={logo} alt="foto" srcset={imgs}/>
      </figure>
      <h1>LOGIN</h1>
     </item>
      
      <form onSubmit={henderLogin}>
        <input type="email" name="" id="email" placeholder="E-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input type="password" name="" id="pass" placeholder="Passworld"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">enviar</button>
      </form>
      <div className="cadastrar">
        <FiLogIn size={18} color="red"/>
        <a href="#">Ainda nao se cadastrou?</a>
      </div>
    </section>
      
  )
}

export default Login;