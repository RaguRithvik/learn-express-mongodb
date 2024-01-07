import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap';
import { deletelData } from '../Services/Uitilities';

const DeleteModal = ({ deleteModal, setDeleteModal, deleteId, endpoints }) => {
    const [loading, setLoading] = useState(false);
    return (
        <Modal
            show={deleteModal}
            onHide={() => setDeleteModal(false)}
            centered
            size="md"
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Do you want delete this record</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={() => setDeleteModal(false)}>
                    Close
                </Button>
                <Button
                    variant="primary"
                    onClick={() => { 
                        deletelData(endpoints, deleteId, setLoading, setDeleteModal)
                    }}
                    disabled={loading}
                >
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteModal