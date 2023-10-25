import { faEdit, faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { numberWithCommas } from '../utils/utils';

const ModalKeranjang = ({showModal, handleClose, keranjangDetail, jumlah, keterangan, tambah, kurang, changeHandler, handleSubmit, totalHarga, hapusPesanan}) => {
    if(keranjangDetail){
        return (
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>
                    {keranjangDetail.product.nama}{" "}
                    <strong>
                        (Rp. {numberWithCommas(keranjangDetail.product.harga)})
                    </strong>    
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3 left">
                        <Form.Label>Total Harga :</Form.Label>
                        <p><strong>Rp. {numberWithCommas(totalHarga)}</strong></p>
                    </Form.Group>
                    <Form.Group className="mb-3 left">
                        <Form.Label>Jumlah :</Form.Label>
                        <br/>
                        <Button variant='primary' size='sm' className='sizeright' onClick={ () => kurang()}>
                            <FontAwesomeIcon icon={faMinus}/>
                        </Button>
                        <strong>{jumlah}</strong>
                        <Button variant='primary' size='sm' className='sizeleft' onClick={ () => tambah()}>
                            <FontAwesomeIcon icon={faPlus}/>
                        </Button>
                    </Form.Group>
                    <Form.Group className="mb-3 left">
                        <Form.Label>Keterangan :</Form.Label>
                            <Form.Control
                            className='mb-3 textarea'
                            as="textarea"
                            name="keterangan"
                            placeholder="Contoh : Pedas, Nasi Setengah"
                            value={keterangan}
                            onChange={(event) => changeHandler(event)}
                            style={{ height: '100px', color: '#1fc586' }}
                            />
                            <Button variant='primary' type='submit'>
                                <FontAwesomeIcon icon={faEdit} /> Update
                            </Button>
                    </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="danger" onClick={() => hapusPesanan(keranjangDetail.id)}>
                   <FontAwesomeIcon icon={faTrash} /> Hapus Pesanan
                </Button>
            </Modal.Footer>
        </Modal>
        );
    }else{
        return (
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Kosong</Modal.Title>
                </Modal.Header>
                <Modal.Body>Kosong</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
        )
    }
    
}

export default ModalKeranjang
