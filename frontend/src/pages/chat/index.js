import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import api from '../../service/api'
import io from 'socket.io-client'
import './style.css'
import { IoMdSend,IoIosNotifications,IoIosSearch,IoIosHome } from 'react-icons/io'
import { FaFacebookMessenger, FaUserCircle, FaUsers, 
  FaArrowLeft, FaArrowRight  } from 'react-icons/fa'

export default function Massegelist() {

  const [chat, setChat] = useState([]);
  const [room, setRoom] = useState([])
  const [room1, setRooms] = useState([])
  const [sms, setSms] = useState('');
  const [pages,setPages]=useState(0)
  const [page,setPage]=useState(1)
  const [user,setUser]=useState([])

  useEffect(() => { 
    
    getApi(page)
    getUser()
    chatsms()
   

  });
  async function getApi(page) {
    const response = await api.get(`/listChat?pages=${page}`)
    setChat(response.data.list)
    setPages(response.data.totalElement)
    
  }
 
 function nextPags(){
   const totalPage = pages / 5
   if (page > totalPage)return
    setPage(page+1)
   
   }

  function prevPags() {
    
    if (page < 0 ) return
    setPage(page - 1)
  }
  
   async function getUser() {
     const response = await api.get('/listUser')
    setUser(response.data.getElementDb)
   }

  function storeSms(e) {
    
    e.preventDefault()
    setPage(1)
    
    const data = {sms}
    
    api.post('/chat', data)
    const socket = io.connect('http://localhost:3333')
    console.log(socket.id)
    socket.emit('send-client', data)
   
  }

  function chatsms(){

    const socket = io.connect('http://localhost:3333/')

    socket.on('massege', data => {

      setChat([data.data])
    })
      socket.on('new',data=> {
        setRooms(data.sala)
      })
  }
 
   function emitRoom(){ 
    
     rooms()
  }

   async function rooms(){
     const socket = io.connect('http://localhost:3333/')
    const response = await api.post('/room')
    socket.emit('join',{room:room})
        setRoom(response.data.sala)
    
  }


function modelChat(){
  
  document.querySelector('#modelChat')
       .classList
       .toggle('hiden')
        
     }
    
      return (
      <main>
        <nav className="nav">
         
         <div className="nav-ul-1">
            <ul>
              <li><IoIosHome size={25} color="white" /></li>
              <li><FaUserCircle size={25} color="white" /></li>
         </ul>
         </div> 
         
         <div className=" nav-list-ul">
           <div className="nav-ul-3">
                <ul>
                
                    <div>
                      <input type="text"/>
                  <li><IoIosSearch size={25} color="white"/></li>
                  </div>
              </ul>
         </div>
         
          
          <div className="nav-ul-2">
              <ul> 
                <li><FaUsers size={25} color="white" /></li>
                  <li onClick={modelChat}><FaFacebookMessenger size={25} color="white"/></li>
              <li><IoIosNotifications size={25} color="white"/></li>
           
          </ul>
         </div>
         </div>
          
          
        </nav> 
        <section>
               <article>
              {
                user.map(response=>(
                  <div key={response.user_id}>
                    <h1  >{response.username}</h1>
                   
                    <Link id="chat" onClick={emitRoom} >
                      conversar
                   </Link>
                <h1>{room1}</h1>
                  </div>
                  
              ))} 
                
               </article>
              
           </section>

        <div className="container hiden" id="modelChat">
           <div className="diration"> 
              <a onClick={prevPags} href="#"><FaArrowLeft size={20} color=" rgb(248, 169, 248)"/></a>
              <a onClick={nextPags} href="#"><FaArrowRight size={20} color=" rgb(248, 169, 248)"/></a>
             </div>

          
          <div className="item">
            {chat.map(res => (
                <div className="caixa"  key={res.id_sms}>
              <p>
                {res.sms}
              </p>
              
         </div>
            ))
            }
          </div> 
          
          <form onSubmit={storeSms} >
            <div>
              <textarea type="text" placeholder="menssagem" id="textarea" 
                value={sms}
              
              onChange={e => setSms(e.target.value)}
          />

            <button type="submit">
                  <IoMdSend size={25} color="rgba(201, 32, 243)"/>
            </button>
            </div>
          </form>

        </div>
      </main>

    )


}
