import React, {useEffect, useState} from "react";
import axios from "axios";
import Image from "next/image"; 
import styles from "./HeroSection.module.css";


const HeroSection = (props) => {

const [heroData, setHeroData] = useState (null);

useEffect (() => {
    const fetchData = async () => {
        try {
          const response = await axios.get("https://prolog-api.profy.dev/content-page/home");
          const data = response.data;
          const heroSection = data.sections.find(section => section.sectionType === "hero");
          setHeroData(heroSection);
        }
        catch (error) {
          console.error("Error: ", error.message);
        }
    }
      fetchData();
    }, []);

    return (
        <div className={`${styles.heroContainer} ${
            props.isMenuOpen ? styles.menuOpen : ""
          }`}>
            {!heroData ? (
                <div>Loading...</div>
            ) : (
                <>
                    <h1 className={styles.h1}>{heroData.title}</h1>
                    <p className={styles.p}>{heroData.subtitle}</p>
                    <div className={styles.img}>
                    <Image 
                        src={`https://prolog-api.profy.dev${heroData.image.src}`}        
                        width={heroData.image.width} 
                        height={heroData.image.height} 
                        alt="Image of a Macbook loading the prolog dashboard"
                    />
                    </div>
                </>
            )}
        </div>
    );
}

export default HeroSection;