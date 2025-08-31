import React from "react"
import "./style.css"
import { Col, Container, Row } from "react-bootstrap"

import { Platform } from '../../Platform'
import { Strings } from "../../utils/strings"

import { IconWhatsapp, IconFacebook } from "../Icons"

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
              <li>
               <IconWhatsapp className="nav-icon"></IconWhatsapp>
                {`Phone: ${Strings.ownerPhone}`}
              </li>
              <li>
                <div className="mr-4">
               <IconFacebook 
               className="nav-icon"
               style={
                { width: '24px', height: '24px' }}
                 // fuerza el tamaño
               ></IconFacebook>
                {`Phone: ${Strings.ownerPhone}`}                  
                </div>
              </li>              
            </ul>
          </Col>
          <Col md={3} sm={5} className='box'>
            <h2>Contáctanos</h2>
            <ul>
              <li>{`${Strings.ownerAddress}`}</li>
              <li>Email: atupuertamarket.help@gmail.com</li>
              <li>{`Phone: ${Strings.ownerPhone}`}</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
