import { useEffect, useRef } from 'react';

function useRefreshToken(refreshToken, refreshInterval) {
  const intervalRef = useRef(null);

  useEffect(() => {
    const refreshIntervalId = setInterval(() => {
      
      let date= new Date(refreshToken);
      const currentTime = new Date()
      const tokenExpiry = // 리프레시 토큰의 만료 시간 정보;

/*       if (currentTime > tokenExpiry - refreshInterval) {
        // 리프레시 토큰을 이용하여 새로운 액세스 토큰 발급 요청 등의 로직을 수행
        // dispatch(refreshAccessToken(refreshToken));
        
        
      } */
      //console.log(date-currentTime);
    }, 100);

    return () => {
      clearInterval(refreshIntervalId);
    };
  }, [refreshToken, refreshInterval]);

  return intervalRef;
}

export default useRefreshToken;
