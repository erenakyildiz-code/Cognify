import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { motion, MotionConfig, useMotionValue } from "framer-motion";
import { Suspense ,useState, useEffect } from "react";
import { Shapes } from "./Shapes";
const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [isHover, setIsHover] = useState(false);
  
  const [isPress, setIsPress] = useState(false);
  const [playMarquee, setPlayMarquee] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setPlayMarquee(true);
    }, 2000);
  }, []);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  

  return (
    <>
    <motion.div
          className="shapes"
          
        >
          <div className="container">
            <Suspense fallback={null}>
              <Shapes 
                isHover={isHover}
                isPress={isPress}
                mouseX={mouseX}
                mouseY={mouseY}
                
              />
            </Suspense>
          </div>
        </motion.div>
          
      <Head>
        <title>Cognify</title>
        <meta name="description" content="Cognify" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className={styles.main}>
        <div className={styles.description}>,
          <motion.div initial={{opacity:0}}
        animate={{
          opacity:0.8
          }}
          transition={{
            duration: 2,
            times: [0,  1],
            ease: "linear",
            delay:1,
          }} style={{color:"white", display:"flex", flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}><img style={{paddingRight:"2%"}} width={50} src='Cognify-Logo-White.png'></img>  Cognify</motion.div>
        </div>

        
        <motion.div initial={{opacity:0}}
        animate={{
          opacity:0.8
          }}
          transition={{
            duration: 2,
            times: [0,  1],
            ease: "linear",
            delay:1,
          }} style={{width:"100%"}}>
        <div className={styles.grid}>
          <Link
            href="/articleCalculator"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Content Analyzer <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Asses the quality of you content with our AI powered tool
            </p>
            </Link>

          <a
            
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.disabledcard}
            target="_blank"
            rel="noopener noreferrer"
            
          >
            <h2 className={inter.className}>
              Content Generator <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Coming soon
            </p>
          </a>

         
        </div>
        </motion.div>
      </main>
    </>
  )
}
