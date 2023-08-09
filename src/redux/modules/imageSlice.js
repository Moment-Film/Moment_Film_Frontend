import { createSlice } from "@reduxjs/toolkit";

const gridSizes = [//내부 네모 사이 15px 고정 
{ id: "down", width: '300px', innerWidth: '126.6px', innerHeight: '175.2px', gap:'4px' },
{ id: "up", width: '300px', innerWidth: '123.1px', innerHeight: '162.5px', gap:'28px' },
{ id: "wide", width: '259px', innerWidth: '202.9px', innerHeight: '78.7px', gap:'8px' },
{ id: "narrow", width: '211px', innerWidth: '147.2px', innerHeight: '78.7px', gap:'8px' },
]

const imageSlice = createSlice({
  name: 'image',
  initialState: { images: {} },
  reducers: {
    selectImage: (state, action) => {
      console.log("12")
      const selectGrid= {...gridSizes.filter((item)=>item.id===action.payload)[0]}
      return {images:{...state.images ,...selectGrid}}
      
    }
  }
});

export const {selectImage} = imageSlice.actions;
export const selectSelectedImage = (state) => state.image.selectedImage;


export default imageSlice.reducer;