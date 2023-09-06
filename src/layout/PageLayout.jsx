import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header';
import Footer from './Footer';
import UpToBtn from '../components/common/component/UpToBtn';
function PageLayout() {
  return (
    <>
    <Header />
    <Outlet />
    <UpToBtn></UpToBtn>
    <Footer />
    </>
  )
}

export default PageLayout