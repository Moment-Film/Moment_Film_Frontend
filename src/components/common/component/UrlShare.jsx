import React from 'react';
import urlShare from '../../assets/images/urlShare.png'

const UrlShare = ({data}) => {

    const handleCopyClipBoard = () => {
      const text=`https://www.momentfilm7.com//${data}`;  
      try {
          navigator.clipboard.writeText(text);
          alert('클립보드에 복사되었습니다.');
        } catch (error) {
          alert('클립보드 복사에 실패하였습니다.');
        }
      };

    return <img style={{height: "30px"}} src={urlShare} alt='' onClick={handleCopyClipBoard}/>
};

export default UrlShare;