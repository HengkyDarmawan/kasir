import React, { Component } from 'react';
import { Button, Image, Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../utils/constants';
import ReactToPrint from 'react-to-print';

class Sukses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keranjangs: [],
            orderCode: '',  // Kode pesanan akan dihasilkan secara dinamis
        };
        this.componentRef = React.createRef();  // Menyiapkan referensi untuk pencetakan
    }

    componentDidMount() {
        axios.get(API_URL + "keranjangs")
            .then(res => {
                const keranjangs = res.data;
                const orderCode = this.generateOrderCode(keranjangs[0]?.id);  // Menghasilkan kode pesanan berdasarkan ID pertama
                this.setState({ keranjangs, orderCode });

                keranjangs.forEach(item => {
                    axios.delete(API_URL + "keranjangs/" + item.id)
                        .then(res => console.log(res))
                        .catch(error => console.log(error));
                });
            })
            .catch(error => console.log(error));
    }

    generateOrderCode = (id) => {
        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0');  // Mendapatkan hari dengan dua digit
        const month = String(date.getMonth() + 1).padStart(2, '0');  // Mendapatkan bulan dengan dua digit (ditambah 1 karena getMonth() mengembalikan indeks mulai dari 0)
        const year = date.getFullYear();  // Mendapatkan tahun
        const orderId = String(id).padStart(3, '0');  // Mengatur ID pesanan agar menjadi tiga digit
        return `ORDE${month}${day}${year}${orderId}`;
    }

    render() {
        return (
            <div className='mt-4 white'>
                <Image src="assets/images/sukses.png" width="300" alt="Sukses" />
                <h2 className="mt-3">Sukses Pesan</h2>
                <p>Terima Kasih Sudah Memesan!</p>
                <Button variant="primary" as={Link} to="/">
                    Kembali
                </Button>

                <ReactToPrint
                    trigger={() => {
                        return <Button className='ml-3' variant="primary">
                            Cetak
                        </Button>
                    }}
                    content={() => this.componentRef}  // Mengacu pada konten yang ingin dicetak
                    documentTitle='Data Pesanan'
                    pageStyle="print"
                />

                {/* Content to be printed */}
                <Container ref={el => (this.componentRef = el)} style={{ marginTop: '20px' }}>
                    <h3>Detail Pesanan:</h3>
                    <p><strong>Kode Pesanan: {this.state.orderCode}</strong></p> {/* Menampilkan kode pesanan */}
                    <Row>
                        {this.state.keranjangs.map((item, index) => (
                            <Col md={4} key={index} className="mb-4">
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{item.product.nama}</Card.Title>
                                        <Card.Text>
                                            Harga: Rp. {item.product.harga}<br />
                                            Jumlah: {item.jumlah}<br />
                                            Total: Rp. {item.product.harga * item.jumlah}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <h4>Total Harga: Rp. {this.state.keranjangs.reduce((total, item) => total + (item.product.harga * item.jumlah), 0)}</h4>
                </Container>
            </div>
        );
    }
}

export default Sukses;