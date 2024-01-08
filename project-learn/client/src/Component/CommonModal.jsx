import React from 'react'
import { Modal, Button } from 'react-bootstrap';
const CommonModal = ({ allOpen, setAllOpen, onFunction, title, descrp }) => {
    return (
        <Modal
            show={allOpen}
            onHide={() => setAllOpen(false)}
            centered
            size="md"
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{descrp}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => setAllOpen(false)}>
                    Continue
                </Button>
                <Button
                    
                    variant="danger"
                    onClick={() => {
                        onFunction()
                    }}
                >
                 Logout
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CommonModal