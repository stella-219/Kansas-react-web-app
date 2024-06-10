import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FaTrash } from "react-icons/fa";
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function AssignmentButtons(
    { assignmentId, deleteAssignment }: { assignmentId: string; deleteAssignment: (assignmentId: string) => void; }) {
    const [showModal, setShowModal] = useState(false);
    const handleDelete = () => {
        deleteAssignment(assignmentId);
        setShowModal(false);
    };

    return (
        <>
            <div className="float-end" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <div style={{ display: 'flex' }}>
                    <FaTrash className="text-danger me-2 mb-1" onClick={() => setShowModal(true)} />
                    <GreenCheckmark />
                    <IoEllipsisVertical className="fs-4" />
                </div>
            </div>
            <Modal show={showModal} onHide={() => setShowModal(false)} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Assignment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure to delete the assignment?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        No
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}