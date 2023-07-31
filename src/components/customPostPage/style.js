import {styled} from "styled-components"

const PostWrapper = styled.div`
  display: flex;
  gap: 5%;
  width: 90%;
  flex-wrap: wrap;
  margin: 0 auto;

`
const PostSection = styled.section `
  width: 30%;
  min-width: 200px;
  max-width: 350px;

  img {
    width: 100%;
  }
`
export {
  PostWrapper,
  PostSection,
}