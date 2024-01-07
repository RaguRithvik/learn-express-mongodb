import React from 'react'
import { Nav } from 'react-bootstrap';
import { Outlet, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from 'react-icons/fa';
import { Navbar } from 'react-bootstrap';
import home from "../images/logo.png"
import { Link } from 'react-router-dom';

const Main = () => {
    const navigate = useNavigate()
    return (
        <>
            <>
                <div className="side-menu">
                    <Nav defaultActiveKey="/home" className="flex-column">
                        <Link to="/home/manager">Manager</Link>
                        <Link to="/home/employee">Employee</Link>
                    </Nav>
                </div>
                <>
                    <Navbar bg="dark" variant="dark" fixed="top" className='ps-2 px-5'>
                        <Link to="/home"><img src={home} width={40} height={40} alt="" /></Link>
                        <div className="ml-auto w-100">
                            <div className='d-flex align-items-center justify-content-end text-white cursor-pointer' onClick={() => {
                                localStorage.clear()
                                navigate("/")
                            }}>
                                <FaSignOutAlt /> &nbsp;  Logout
                            </div>
                        </div>
                    </Navbar>
                    <div className="content">
                        <Outlet />
                    </div>
                </>
            </>
        </>
    )
}

export default Main