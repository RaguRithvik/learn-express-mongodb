import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Outlet, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from 'react-icons/fa';
import { Navbar } from 'react-bootstrap';
const Main = () => {
    const navigate = useNavigate()
    return (
        <Container fluid>
            <Row>
                <Col xs={2}>
                    <div className="side-menu">
                        <Nav defaultActiveKey="/home" className="flex-column">
                            <Nav.Link href="/home">Home</Nav.Link>
                            <Nav.Link href="/about">About</Nav.Link>
                            <Nav.Link href="/contact">Contact</Nav.Link>
                        </Nav>
                    </div>
                </Col>
                <Col xs={10}>
                    <Navbar bg="dark" variant="dark" fixed="top" className='px-5'>
                        <Navbar.Brand href="#home">Your App</Navbar.Brand>
                        <div className="ml-auto w-100">
                            <div className='d-flex align-items-center justify-content-end text-white cursor-pointer' onClick={()=>{
                                localStorage.clear()
                                navigate("/")
                            }}>
                                <FaSignOutAlt />  Logout
                            </div>
                        </div>
                    </Navbar>
                    <div className="content">
                        <Outlet />
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Main