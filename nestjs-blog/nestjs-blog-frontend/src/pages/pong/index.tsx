import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '../../styles/Home.module.css'
import PongImage from "../../components/backup_/pongImage";
// import PongWithBack from "../../components/pongWithBack";
// import PongMovetest from "../../components/pongMovetest";
// import PongPost from "../../components/pongPost";
// import PongUpdateGetPost from "../../components/pongUpdateGetPost";
// import PongUpdateTest from "../../components/pongUpdateTest";
import PongTate from "../../components/pongTate";
import PongSocket from "../../components/pongSocket";
// import PongSocket from "../../components/pongSocket_bad";

// import App from "../../components/testKey";

export default function PongPage() {
	return (
		<>
		  <div className={styles.container}>
			<h1>Nest.js Blog</h1>
			<ul className={styles.postList}>
			  <li>hello</li>
			  <PongSocket />
			</ul>
		  </div>
		</>
	  )
}