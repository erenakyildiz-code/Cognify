import styles from '../styles/Home.module.css';
import { motion, MotionConfig, useMotionValue } from "framer-motion";
import { Suspense ,useState, useEffect } from "react";
import { Shapes } from "./fold/Shapes";
import React from 'react';

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
          
      
      <main className={styles.main}>
        <div className={styles.description}>
          <motion.div initial={{opacity:0}}
        animate={{
          opacity:1
          }}
          transition={{
            duration: 2,
            times: [0,  1],
            ease: "linear",
            delay:1,
          }} style={{color:"white", display:"flex", flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}><img style={{paddingRight:"5%", marginLeft:"5%"}} width={50} src='Cognify-Logo-White.png'></img>  Cognify</motion.div>
        </div>


        <div className={styles.description}>
          <div className={styles.heroText}>
            <motion.div initial={{opacity:0}}
            animate={{
              opacity:1
              }}
              transition={{
                duration: 2,
                times: [0,  1],
                ease: "linear",
                delay:1.4,
              }} style={{width:"100%", fontSize: "3.5rem", paddingBottom:"2%"}}>
                Empowering humanity
              </motion.div>
              <motion.div initial={{opacity:0}}
            animate={{
              opacity:0.9
              }}
              transition={{
                duration: 2,
                times: [0,  1],
                ease: "linear",
                delay:1.6,
              }} style={{width:"100%", fontSize: "3rem", color: '#ccc'}}>
                through AI innovation
              </motion.div>
          </div>
        </div>

        
          <motion.div initial={{opacity:0}}
          animate={{
            opacity:1
            }}
            transition={{
              duration: 2,
              times: [0,  1],
              ease: "linear",
              delay:2,
            }} style={{width:"100%"}}>
          <div className={styles.grid}>
            <a
              href="/articleCalculator"
              target="_blank"
              rel="noopener noreferrer"
            >
              
              <div 
              className={styles.card}>

<span>
              <h2 >
                Content Analyzer <span>-&gt;</span>
              </h2>
              <p >
                Assess the quality of your content with our AI powered tool
              </p>
              </span>
              </div>
              
              </a>
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              className={styles.disabledcard}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>
              <h2 >
                Content Generator <span></span>
              </h2>
              <p >
                Coming soon
              </p></span>
            </a>
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              className={styles.disabledcard}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>
              <h2 >
                News Analyzer <span></span>
              </h2>
              <p >
                Coming soon
              </p>
              </span>
            </a>
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              className={styles.disabledcard}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>
              <h2 >
                Sapiens <span></span>
              </h2>
              <p >
                Coming soon
              </p>
              </span>
            </a>
          
          </div>
          </motion.div>
      </main>
    </>
  )
}
