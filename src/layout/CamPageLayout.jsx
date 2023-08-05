import React from 'react'
import { Outlet } from 'react-router-dom'
import SmallHeader from './SmallHeader';
import Footer from './Footer';
import Header from './Header';

function CamPageLayout() {
  return (
    <>
    <SmallHeader />
    <Outlet />
    <Footer />
    </>
  )
}

export default CamPageLayout