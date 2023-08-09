import React, { useState } from "react";
import FilterCustom from "../components/filterCustom/filterCustom";

function FilterPage() {

  return (
    <FilterCustom>
    </FilterCustom>
  );
}

export default FilterPage;


{/* <FilterImage
          src="https://file3.instiz.net/data/cached_img/upload/2021/10/18/17/09519b1b4720b2c740dfdb40be94a298.jpg"
          alt="test-image"
          blur={filterValue.blur}
          brightness={filterValue.brightness}
          saturate={filterValue.saturate}
          grayscale={filterValue.grayscale}
          contrast={filterValue.contrast}
          huerotate={filterValue.huerotate}
          sepia={filterValue.sepia}
        />
        </ImageContainer> */}


{/* <OptionSection>
<div>Filter</div>
<div>
  <p>블러 {filterValue.blur || 0}px</p>
  <Slider
    style={{ width: "250px" }}
    min={0}
    max={10}
    step={0.1}
    value={filterValue.blur || 0}
    onChange={(value) => filterValueHandler("blur", value)}

    trackStyle={{ backgroundColor: 'rgba(203, 221, 90, 1)' }} // 트랙의 배경색을 변경

    handleStyle={{
      borderColor: 'rgba(203, 221, 90, 1)', // 핸들의 테두리 색상을 변경
      backgroundColor: 'rgba(203, 221, 90, 1)', // 핸들의 배경색을 변경
      borderRadius: '10%', // 원형 핸들로 모양 변경
      width: '10px',
      height: '20px',
      marginLeft: '-5px', // 핸들의 가로  가운데 정렬
      marginTop: '-9px', // 핸들의 세로  가운데 정렬
    }}
  />
</div>
<div>
  <p>밝기 {filterValue.brightness || 1}</p>
  <Slider
    style={{ width: "250px" }}
    min={0}
    max={5}
    step={0.1}
    value={filterValue.brightness || 1}
    onChange={(value) => filterValueHandler("brightness", value)}

    trackStyle={{ backgroundColor: 'rgba(203, 221, 90, 1)' }} // 트랙의 배경색을 변경

    handleStyle={{
      borderColor: 'rgba(203, 221, 90, 1)', // 핸들의 테두리 색상을 변경
      backgroundColor: 'rgba(203, 221, 90, 1)', // 핸들의 배경색을 변경
      borderRadius: '10%', // 원형 핸들로 모양 변경
      width: '10px',
      height: '20px',
      marginLeft: '-5px', // 핸들의 가로  가운데 정렬
      marginTop: '-9px', // 핸들의 세로  가운데 정렬
    }}
  />
</div>
<div>
  <p>채도 {filterValue.saturate || 100}%</p>
  <Slider
    style={{ width: "250px" }}
    min={0}
    max={200}
    value={filterValue.saturate || 100}
    onChange={(value) => filterValueHandler("saturate", value)}

    trackStyle={{ backgroundColor: 'rgba(203, 221, 90, 1)' }} // 트랙의 배경색을 변경

    handleStyle={{
      borderColor: 'rgba(203, 221, 90, 1)', // 핸들의 테두리 색상을 변경
      backgroundColor: 'rgba(203, 221, 90, 1)', // 핸들의 배경색을 변경
      borderRadius: '10%', // 원형 핸들로 모양 변경
      width: '10px',
      height: '20px',
      marginLeft: '-5px', // 핸들의 가로  가운데 정렬
      marginTop: '-9px', // 핸들의 세로  가운데 정렬
    }}
  />
</div>
<div>
  <p>흑백 {filterValue.grayscale || 0}%</p>
  <Slider
    style={{ width: "250px" }}
    min={0}
    max={100}
    value={filterValue.grayscale || 0}
    onChange={(value) => filterValueHandler("grayscale", value)}

    trackStyle={{ backgroundColor: 'rgba(203, 221, 90, 1)' }} // 트랙의 배경색을 변경

    handleStyle={{
      borderColor: 'rgba(203, 221, 90, 1)', // 핸들의 테두리 색상을 변경
      backgroundColor: 'rgba(203, 221, 90, 1)', // 핸들의 배경색을 변경
      borderRadius: '10%', // 원형 핸들로 모양 변경
      width: '10px',
      height: '20px',
      marginLeft: '-5px', // 핸들의 가로  가운데 정렬
      marginTop: '-9px', // 핸들의 세로  가운데 정렬
    }}
  />
</div>
<div>
  <p>대비 {filterValue.contrast || 100}%</p>
  <Slider
    style={{ width: "250px" }}
    min={0}
    max={200}
    value={filterValue.contrast || 100}
    onChange={(value) => filterValueHandler("contrast", value)}

    trackStyle={{ backgroundColor: 'rgba(203, 221, 90, 1)' }} // 트랙의 배경색을 변경

    handleStyle={{
      borderColor: 'rgba(203, 221, 90, 1)', // 핸들의 테두리 색상을 변경
      backgroundColor: 'rgba(203, 221, 90, 1)', // 핸들의 배경색을 변경
      borderRadius: '10%', // 원형 핸들로 모양 변경
      width: '10px',
      height: '20px',
      marginLeft: '-5px', // 핸들의 가로  가운데 정렬
      marginTop: '-9px', // 핸들의 세로  가운데 정렬
    }}
  />
</div>
<div>
  <p>hue-rotate {filterValue.huerotate || 0}deg</p>
  <Slider
    style={{ width: "250px" }}
    min={0}
    max={360}
    value={filterValue.huerotate || 0}
    onChange={(value) => filterValueHandler("huerotate", value)}

    trackStyle={{ backgroundColor: 'rgba(203, 221, 90, 1)' }} // 트랙의 배경색을 변경

    handleStyle={{
      borderColor: 'rgba(203, 221, 90, 1)', // 핸들의 테두리 색상을 변경
      backgroundColor: 'rgba(203, 221, 90, 1)', // 핸들의 배경색을 변경
      borderRadius: '10%', // 원형 핸들로 모양 변경
      width: '10px',
      height: '20px',
      marginLeft: '-5px', // 핸들의 가로  가운데 정렬
      marginTop: '-9px', // 핸들의 세로  가운데 정렬
    }}
  />
</div>
<div>
  <p>세피아 {filterValue.sepia || 0}%</p>
  <Slider
    style={{ width: "250px" }}
    min={0}
    max={100}
    value={filterValue.sepia || 0}
    onChange={(value) => filterValueHandler("sepia", value)}

    trackStyle={{ backgroundColor: 'rgba(203, 221, 90, 1)' }} // 트랙의 배경색을 변경

    handleStyle={{
      borderColor: 'rgba(203, 221, 90, 1)', // 핸들의 테두리 색상을 변경
      backgroundColor: 'rgba(203, 221, 90, 1)', // 핸들의 배경색을 변경
      borderRadius: '10%', // 원형 핸들로 모양 변경
      width: '10px',
      height: '20px',
      marginLeft: '-5px', // 핸들의 가로  가운데 정렬
      marginTop: '-9px', // 핸들의 세로  가운데 정렬
    }}
  />
</div>

<button onClick={() => navigate(`/camera/capture/finish`)}>
  다음으로
</button>

</OptionSection>
 */}
/* const FilterImage = styled.img`
  width:50%;
  height: 570px;
  overflow: hidden;
  filter: blur(${(props) => props.blur || 0}px)
    saturate(${(props) => props.saturate || 100}%)
    brightness(${(props) => props.brightness || 1})
    grayscale(${(props) => props.grayscale || 0}%)
    contrast(${(props) => props.contrast || 100}%)
    hue-rotate(${(props) => props.huerotate || 0}deg)
    sepia(${(props) => props.sepia || 0}%);
`;
 */
