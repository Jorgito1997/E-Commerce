import React from "react"
import "./style.css"
import { Col, Container, Row } from "react-bootstrap"

import {Platform} from '../../Platform'

const Footer = () => {
  return (
    <footer>
        <Container>
          <Row className="footer-row">
            <Col md={3} sm={5} className='box'>
              <div className="logo">
                  <ion-icon name="bag"></ion-icon>
                  <h1>{Platform.AppName}</h1>
              </div>
              <p>{Platform.AppDescription}</p>
            </Col>
            <Col md={3} sm={5} className='box'>
              <h2>Acerca de nosotros</h2>
              <ul>
                <li>Facebook</li>
                <li>Instagram</li>
              </ul>
            </Col>
            <Col md={3} sm={5} className='box'>
              <h2>Atención al cliente</h2>
              <ul>
                <li>Whatsapp/+53555789</li>
                <li>Telegram/+53555789</li>
              </ul>
            </Col>
            <Col md={3} sm={5} className='box'>
              <h2>Contáctanos</h2>
              <ul>
                <li>70 Washington Square South, New York, NY 10012, United States </li>
                <li>Email: atupuertamarket.help@gmail.com</li>
                <li>Phone: +1 0000 000 000</li>
              </ul>
            </Col>
          </Row>
        </Container>
    </footer>
  )
}

export default Footer
