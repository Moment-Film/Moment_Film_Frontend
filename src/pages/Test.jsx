import React, { useRef, useEffect, useState } from 'react';
import team from '../components/assets/aa/team.svg'
import back from '../components/assets/aa/back.svg';

const Test = () => {


    const intersectionRef = useRef(null);
    const intersectionRef1 = useRef(null);
    const intersectionRef2 = useRef(null);
    const intersectionRef3 = useRef(null);
    const intersectionRef4 = useRef(null);

    const aaaRef = useRef(null);
    const aaaRef1 = useRef(null);
    const aaaRef2 = useRef(null);
    const aaaRef3 = useRef(null);
    const aaaRef4 = useRef(null);

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (intersectionRef.current) {

                const rect = intersectionRef.current.getBoundingClientRect();
                const rect1 = intersectionRef1.current.getBoundingClientRect();
                const rect2 = intersectionRef2.current.getBoundingClientRect();
                
                const rect3 = intersectionRef3.current.getBoundingClientRect();
                const rect4 = intersectionRef4.current.getBoundingClientRect();

                const windowHeight = window.innerHeight;

                if (rect.top < windowHeight || rect1.top < windowHeight || rect2.top < windowHeight
                    ||rect3.top < windowHeight || rect4.top < windowHeight  ) {

                    const opacity = 1 - (rect.top / windowHeight);
                    const opacity1 = 1 - (rect1.top / windowHeight);
                    const opacity2 = 1 - (rect2.top / windowHeight);

                    const opacity3 = 1 - (rect3.top / windowHeight);
                    const opacity4 = 1 - (rect4.top / windowHeight);

                    
                    if (aaaRef.current) {
                        //console.log(1)
                        aaaRef.current.style.opacity = `${opacity}`;
                        const translateY = (1 - opacity) * 1000; 
                        aaaRef.current.style.transform = `translateY(-${translateY}px)`;
                    }
                    if (aaaRef1.current) {
                        //console.log(1)
                        aaaRef1.current.style.opacity = `${opacity1}`;
                        const translateY = (1 - opacity1) * 400; 
                        aaaRef1.current.style.transform = `translateY(-${translateY}px)`;
                    }
                    if (aaaRef2.current) {
                        aaaRef2.current.style.opacity = `${opacity2}`;
                        const translateY = (1 - opacity2) * 800; 
                        aaaRef2.current.style.transform = `translateY(-${translateY}px)`;
                    }
                    if (aaaRef3.current) {
                        //console.log(1)
                        aaaRef3.current.style.opacity = `${opacity3}`;
                        const translateY = (1 - opacity3) * 1000; 
                        aaaRef3.current.style.transform = `translateY(-${translateY}px)`;
                    }
                    if (aaaRef4.current) {
                        //console.log(1)
                        aaaRef4.current.style.opacity = `${opacity4}`;
                        const translateY = (1 - opacity4) * 400; 
                        aaaRef4.current.style.transform = `translateY(-${translateY}px)`;
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
        <div style={{ height: '100vh', display: "flex" ,alignItems: "center"}}  ></div>
        <div style={{ height: '200vh', display: "flex",justifyContent:"center" ,gap:"5%"}}   ref={intersectionRef}>
            <div style={{ height: '100vh', display: "flex", alignItems: "center" }}  ref={intersectionRef}>
                <div style={{ fontSize: "80px"}} ref={aaaRef} >
                    <div>백엔드</div>
                    <div>김규현</div>
                    <div>남윤지</div>
                    <div>이명현</div>
                </div>
            </div>
            <div style={{ height: '100vh', display: "flex", alignItems: "center" }} ref={intersectionRef1}>
                <div style={{ fontSize: "80px" }} ref={aaaRef1}>
                    <div>프론트엔드</div>
                    <div>김나영</div>
                    <div>송미숙</div>
                    <div>조현철</div>
                </div>
            </div>
            <div style={{ height: '100vh', display: "flex", alignItems: "center" }}  ref={intersectionRef2}>
                <div style={{ fontSize: "80px" }}  ref={aaaRef2}>
                    <div>디자이너</div>
                    <div>최강</div>
                    <div>디자이너</div>
                    <div>김아라</div>
                </div>
            </div>
        </div>
        <div style={{ height: '100vh', display: "flex" ,alignItems: "center"}}  ></div>
        <div style={{ height: '200vh', display: "flex",justifyContent:"center" ,gap:"5%"}}   ref={intersectionRef3}>
            <div style={{ height: '100vh', display: "flex", alignItems: "center" }}  ref={intersectionRef3}>
                <div style={{ fontSize: "80px"}} ref={aaaRef3} >
                    <img src={back}></img>
                </div>
            </div>
            <div style={{ height: '100vh', display: "flex", alignItems: "center" }} ref={intersectionRef4}>
                <div style={{ fontSize: "80px" }} ref={aaaRef4}>
                    <img src={team}/>
                </div>
            </div>
        </div>

        </>
    );
};

export default Test;