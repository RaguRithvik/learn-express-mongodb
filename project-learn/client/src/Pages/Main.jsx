import React, { useState } from 'react'
import { Nav } from 'react-bootstrap';
import { Outlet, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from 'react-icons/fa';
import { Navbar } from 'react-bootstrap';
import home from "../images/logo.png"
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CommonModal from '../Component/CommonModal';

const Main = () => {
    const navigate = useNavigate()
    const user = useSelector((state) => state?.user);
    const [allOpen, setAllOpen] = useState(false);
    const onFunction = () => {
        localStorage.clear()
        navigate("/")
    }
    return (
        <>
            <>
                <div className="side-menu">
                    <Nav defaultActiveKey="/home" className="flex-column">
                        {user?.userinfo?.role == "admin" || user?.userinfo?.role == "manager" ?
                            <NavLink to="/home/manager" exact >Manager</NavLink> : ""}
                        <NavLink to="/home/employee" exact >Employee</NavLink>
                    </Nav>
                </div>
                <>
                    <Navbar bg="dark" variant="dark" fixed="top" className='ps-2 px-5'>
                        <NavLink to="/home"><img src={home} width={40} height={40} alt="" /></NavLink>
                        <div className="ml-auto w-100">
                            <div className='d-flex align-items-center justify-content-end text-white cursor-pointer' onClick={() => setAllOpen(true)}>
                                <FaSignOutAlt /> &nbsp;  Logout
                            </div>
                        </div>
                    </Navbar>
                    <div className="content">
                        <Outlet />
                    </div>
                </>
            </>
            <CommonModal allOpen={allOpen} setAllOpen={setAllOpen} onFunction={onFunction} title="Logout" descrp="Do yout want to logout ?" />
        </>
    )
}

export default Main