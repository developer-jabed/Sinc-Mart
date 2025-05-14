import React from 'react';
import NavBar from '../Shared/Navbar/NavBar';
import { Outlet } from 'react-router';
import Footer from '../Shared/Footer/Footer';

const HomeLayout = () => {
    return (
        <div>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default HomeLayout;