import React,{useState} from 'react';
import { saveAs } from 'file-saver';
import { useDispatch } from 'react-redux';

const useDownLoad = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async (imageUrl, fileName) => {
    try {

      if(imageUrl===undefined) return 1;
      setIsDownloading(true);
      //console.log(imageUrl)
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      saveAs(blob, fileName);
    } catch (error) {
      console.error('Error downloading image:', error);
    } finally {
      setIsDownloading(false);
    }
  };


    return {
      handleDownload
    };
};

export default useDownLoad;
