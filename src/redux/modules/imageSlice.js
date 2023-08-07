import { createSlice } from "@reduxjs/toolkit";

const imageSlice = createSlice({
  name: 'image',
  initialState: { images: [] },
  reducers: {
    selectImage: (state, action) => {
      console.log(action.payload);
      state.selectedImage = action.payload;
    }
  }
});

export const {selectImage} = imageSlice.actions;
export const selectSelectedImage = (state) => state.image.selectedImage;


export default imageSlice.reducer;