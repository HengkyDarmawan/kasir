import React from "react";
import { Col, Card } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
// import { API_URL } from "../utils/constants";

const Menus = ({ menu, masukKeranjang }) => {
  return (
    <Col md={4} xs={6} className="mb-4" style={{ cursor: "pointer" }}>
      <Card onClick={() => masukKeranjang(menu)}>
        <Card.Img
          variant="top"
          src={menu.gambar}
          height={170}
          crossOrigin="anonymous"
        />
        <Card.Body>
          <Card.Title>
            <strong>({menu.kode}) </strong>
            {menu.name}
          </Card.Title>
          <Card.Text>Rp. {numberWithCommas(menu.harga)}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Menus;
