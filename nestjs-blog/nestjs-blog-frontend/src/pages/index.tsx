import Image from 'next/image'
import { Inter } from 'next/font/google'
import io from "socket.io-client";

import styles from "../styles/Home.module.css";
import Head from 'next/head';
import { useState } from 'react';

//通信先のアドレス
const socket = io("http://localhost:5000");

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [message, setMessage] = useState("");
  const [list, setList] = useState<any[]>([]);

  const handleSendMessage=()=>{
    //サーバーへ送信
    socket.emit("send_message", {message: message});
    setMessage("");
  };

  //サーバーから受信
  socket.on("recieved_message", (data)=>{
      console.log(data);
      setList([...list, data]);
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>next app</title>
      </Head>
      <div className={styles.container}>
        <h2>チャットアプリ</h2>
        <div className={styles.chatInputButton}>
          <input 
            type="text" 
            placeholder="チャット..." 
            onChange={(e)=>{setMessage(e.target.value);}}
            value={message}
          ></input>
          <button onClick={()=>handleSendMessage()}>チャット送信</button>
        </div>
        {list.map((chat)=> (
          <div className={styles.chatArea} key={chat.message}>
              {chat.message}  
          </div>
        ))}
      </div>
    </div>
  )
}
