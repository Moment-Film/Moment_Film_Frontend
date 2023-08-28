import React, { useRef, useEffect, useState } from 'react';
import useDownLoad from '../hooks/useDownload';
const Test = () => {
    const{handleDownload}=useDownLoad()

    const dd=()=>{
        handleDownload("https://moment-film.s3.amazonaws.com//frame4711361c-3109-4e71-ac0f-f2fad860942d.jpg","test")
    }

    const intersectionRef = useRef(null);
    const intersectionRef1 = useRef(null);
    const intersectionRef2 = useRef(null);

    const aaaRef = useRef(null);
    const aaaRef1 = useRef(null);
    const aaaRef2 = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (intersectionRef.current) {


                const rect = intersectionRef.current.getBoundingClientRect();
                const rect1 = intersectionRef1.current.getBoundingClientRect();
                const rect2 = intersectionRef2.current.getBoundingClientRect();
                const windowHeight = window.innerHeight;

                if (rect.top < windowHeight || rect1.top < windowHeight || rect2.top < windowHeight) {
                    const opacity = 1 - (rect.top / windowHeight);
                    const opacity1 = 1 - (rect1.top / windowHeight);
                    const opacity2 = 1 - (rect2.top / windowHeight);
        /*             aaaRef.current.style.opacity = `${opacity}`
                    aaaRef1.current.style.opacity = `${opacity1}`
                    aaaRef2.current.style.opacity = `${opacity2}` */

                    
                    if (aaaRef.current) {
                        console.log(1)
                        aaaRef.current.style.opacity = `${opacity}`;
                        const translateY = (1 - opacity) * 1000; // Adjust the multiplier for desired speed
                        aaaRef.current.style.transform = `translateY(-${translateY}px)`;
                    }
                    if (aaaRef1.current) {
                        console.log(1)
                        aaaRef1.current.style.opacity = `${opacity1}`;
                        const translateY = (1 - opacity) * 400; // Adjust the multiplier for desired speed
                        aaaRef1.current.style.transform = `translateY(-${translateY}px)`;
                    }
                    if (aaaRef2.current) {
                        aaaRef2.current.style.opacity = `${opacity2}`;
                        const translateY = (1 - opacity) * 800; // Adjust the multiplier for desired speed
                        aaaRef2.current.style.transform = `translateY(-${translateY}px)`;
                    }
                    setIsVisible(opacity > 0);
                } else {
                    setIsVisible(false);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
        <div style={{ height: '100vh', display: "flex", alignItems: "center"}}  ></div>
        <div style={{ height: '200vh', display: "flex" ,gap:"5%"}}   ref={intersectionRef}>
            <div style={{ height: '100vh', display: "flex", alignItems: "center" }}  ref={intersectionRef}>
                <div style={{ fontSize: "30px",border:"1px solid var(--black)"}} ref={aaaRef} >
                    <div>디자이너님 이겁니까??</div>
                    <div>디자이너님 이겁니까??</div>
                    <div>디자이너님 이겁니까??</div>
                    <div>디자이너님 이겁니까??</div>
                </div>
            </div>
            <div style={{ height: '100vh', display: "flex", alignItems: "center" }} ref={intersectionRef1}>
                <div style={{ fontSize: "30px",border:"1px solid gray" }} ref={aaaRef1}>
                    <div>디자이너님 이겁니까??</div>
                    <div>디자이너님 이겁니까??</div>
                    <div>디자이너님 이겁니까??</div>
                    <div>디자이너님 이겁니까??</div>
                </div>
            </div>
            <div style={{ height: '100vh', display: "flex", alignItems: "center" }}  ref={intersectionRef2}>
                <div style={{ fontSize: "30px",border:"1px solid green" }}  ref={aaaRef2}>
                    <div>디자이너님 이겁니까??</div>
                    <div>디자이너님 이겁니까??</div>
                    <div>디자이너님 이겁니까??</div>
                    <div>디자이너님 이겁니까??</div>
                </div>
            </div>
        </div>

        <div onClick={dd}>asdasdasdasdasd</div>

        </>
    );
};

export default Test;