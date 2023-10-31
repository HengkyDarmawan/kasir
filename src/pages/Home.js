import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Categories, Hasil, Menus } from "../component";
import { API_URL } from "../utils/constants";
import axios from "axios";
import swal from "sweetalert";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      categoriYangDipilih: "Makanan",
      keranjangs: [],
    };
  }

  componentDidMount() {
    axios
      .get(
        API_URL +
          "product?product_category=" +
          this.state.categoriYangDipilih.toLowerCase()
      )
      .then(({ data }) => {
        console.log(data, "dataaaaa");
        const menus = data.result.payload.data;
        this.setState({ menus });
      })
      .catch((error) => [console.log(error)]);
    this.getListKeranjang();
  }
  getListKeranjang = () => {
    axios
      .get(API_URL + "cart/get")
      .then(({ data }) => {
        const keranjangs = data.result.payload;
        this.setState({ keranjangs });
      })
      .catch((error) => [console.log(error)]);
  };
  changeCategory = (value) => {
    this.setState({
      categoriYangDipilih: value,
      menus: [],
    });

    axios
      .get(API_URL + "product?product_category=" + value.toLowerCase())
      .then(({ data }) => {
        const menus = data.result.payload.data;
        this.setState({ menus });
      })
      .catch((error) => [console.log(error)]);
  };

  masukKeranjang = (value) => {
    axios
      .get(API_URL + "cart/product/" + value.id)
      .then(({ data }) => {
        if (data.result.payload.length === 0) {
          const keranjang = {
            jumlah: 1,
            // total_harga: value.harga,
            // product: value,
          };

          axios
            .put(API_URL + "cart/add/" + value.id, keranjang)
            .then((res) => {
              this.getListKeranjang();
              swal({
                title: "Menu Di Tambahkan",
                text: "Sukses Masuk Keranjang " + value.name,
                icon: "success",
                button: false,
                timer: 1500,
              });
            })
            .catch((error) => [console.log(error)]);
        } else {
          const keranjang = {
            jumlah: data.result.payload[0].jumlah + 1,
            // total_harga: res.data[0].total_harga + value.harga,
            // product: value,
          };
          axios
            .put(API_URL + "cart/add/" + value.id, keranjang)
            .then((res) => {
              this.getListKeranjang();
              swal({
                title: "Menu Di Tambahkan",
                text: "Sukses Masuk Keranjang " + value.name,
                icon: "success",
                button: false,
                timer: 1500,
              });
            })
            .catch((error) => [console.log(error)]);
        }
      })
      .catch((error) => [console.log(error)]);
  };

  render() {
    const { menus, categoriYangDipilih, keranjangs } = this.state;
    return (
      <div className="mt-3">
        <Container fluid>
          <Row>
            <Col>
              <h4>Menu</h4>
              <hr />
              <Categories
                changeCategory={this.changeCategory}
                categoriYangDipilih={categoriYangDipilih}
              />
              <Row className="left overflow-auto menu mx-auto mt-4">
                {menus &&
                  menus.map((menu) => (
                    <Menus
                      key={menu.id}
                      menu={menu}
                      masukKeranjang={this.masukKeranjang}
                    />
                  ))}
              </Row>
            </Col>
            <Hasil
              keranjangs={keranjangs}
              {...this.props}
              getListKeranjang={this.getListKeranjang}
            />
          </Row>
        </Container>
      </div>
    );
  }
}
