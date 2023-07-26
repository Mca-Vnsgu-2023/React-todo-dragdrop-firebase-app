import React from 'react'
import { Modal } from 'react-bootstrap'

interface Props{
    children?: React.ReactNode;
    handleClose:()=>void;
    show:boolean;
    title:string

}

const MyModal = (props:Props) => {
    const { children, handleClose, show,title } = props

    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} >
            <Modal.Header closeButton>
                <Modal.Title> {title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
                
            </Modal.Body>
            {/* <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary">Save</Button>
            </Modal.Footer> */}
        </Modal>
    )
}

export default MyModal