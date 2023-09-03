import React from 'react';

import { useEffect } from "react";
// kakao 기능 동작을 위해 넣어준다.
const { Kakao } = window;

const KakaoShareBtn = ({data,path}) => {
    // 배포한 자신의 사이트
    const realUrl = `https://www.momentfilm7.com//${path}`
    // 로컬 주소 (localhost 3000 같은거)
    const resultUrl = window.location.href;

    // 재랜더링시에 실행되게 해준다.
    useEffect(() => {
        // init 해주기 전에 clean up 을 해준다.
        Kakao.cleanup();
        // 자신의 js 키를 넣어준다.
        Kakao.init('53ae173c0b8adc5a69682122ddcc74d2');
        // 잘 적용되면 true 를 뱉는다.
        //console.log(Kakao.isInitialized());
    }, []);

    const shareKakao = () => {
        Kakao.Share.sendDefault({
            objectType: 'feed',
            content: {
                title: data.title,
                description: data.contents,
                imageUrl:data.image,
                link: {
                    mobileWebUrl: realUrl,
                },
            },
            buttons: [
                {
                    title: '구경하러가기',
                    link: {
                        mobileWebUrl: realUrl,
                    },
                },
            ],
        });
    }

    return (
        <>
            <div onClick={shareKakao} style={{width:'30px'}}>
                <img style={{width:'100%'}}src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"
                    alt="카카오톡 공유 보내기 버튼" />
            </div>
        </>
    );
};

export default KakaoShareBtn;