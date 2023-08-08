import React from 'react';

const UrlShare = ({data}) => {

    const handleCopyClipBoard = () => {
      const text="폰트가 완전 기깔나요";  
      try {
          navigator.clipboard.writeText(text);
          alert('클립보드에 복사되었습니다.');
        } catch (error) {
          alert('클립보드 복사에 실패하였습니다.');
        }
      };

    return (
        <button onClick={handleCopyClipBoard}>
          링크복사
        </button>
    );
};

export default UrlShare;