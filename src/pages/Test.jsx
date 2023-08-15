import React, { useRef, useEffect, useState } from 'react';

const Test = () => {
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
                    aaaRef.current.style.opacity = `${opacity}`
                    aaaRef1.current.style.opacity = `${opacity1}`
                    aaaRef2.current.style.opacity = `${opacity2}`
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
        <div>
            <div style={{ height: '100vh' }}></div>
            <div style={{ height: '100vh', display: "flex", alignItems: "center" }}  ref={intersectionRef}>
                <div style={{ fontSize: "100px" }} >
                    <div>디자이너님 이겁니까??</div>
                    <div>디자이너님 이겁니까??</div>
                    <div>디자이너님 이겁니까??</div>
                    <div>디자이너님 이겁니까??</div>
                </div>
            </div>
            <div style={{ height: '100vh', display: "flex", alignItems: "center" }} ref={intersectionRef1}>
                <div style={{ fontSize: "100px" }} ref={aaaRef1}>
                    <div>디자이너님 이겁니까??</div>
                    <div>디자이너님 이겁니까??</div>
                    <div>디자이너님 이겁니까??</div>
                    <div>디자이너님 이겁니까??</div>
                </div>
            </div>
            <div style={{ height: '100vh', display: "flex", alignItems: "center" }}  ref={intersectionRef2}>
                <div style={{ fontSize: "100px" }}  ref={aaaRef2}>
                    <div>디자이너님 이겁니까??</div>
                    <div>디자이너님 이겁니까??</div>
                    <div>디자이너님 이겁니까??</div>
                    <div>디자이너님 이겁니까??</div>
                </div>
            </div>
        </div>
    );
};

export default Test;