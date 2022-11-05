/*
  Component for looking up the balance of a BCH address.
*/

// Global npm libraries
import React from 'react'
import { Container, Row, Col, Spinner, Image } from 'react-bootstrap'

// let _this

class GetBalance extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      balance: '',
      textInput: '',
      wallet: props.wallet
    }

    // Bind 'this' to event handlers
    this.handleGetBalance = this.handleGetBalance.bind(this)

    // _this = this
  }

  render () {
    return (

      <>
        <Container>
          <Row>
            <Col className='text-break' style={{ textAlign: 'center' }}>
              <Image fluid src='https://bchstore.com/wp-content/uploads/2022/09/blue-gear.png' />
            </Col>
          </Row>
          <br />

          <Row>
            <Col className='text-break' style={{ textAlign: 'center' }}>
              <h2>Success!</h2>
              <p>
                Thank you for purchasing a Blue Widget! We will ship the widget
                to you right away!
              </p>
            </Col>
          </Row>
          <br />

        </Container>
      </>
    )
  }

  async handleGetBalance (event) {
    try {
      const textInput = this.state.textInput

      // Exit on invalid input
      if (!textInput) return
      if (!textInput.includes('bitcoincash:')) return

      this.setState({
        balance: (<span>Retrieving balance... <Spinner animation='border' /></span>)
      })

      const balance = await this.state.wallet.getBalance(textInput)
      console.log('balance: ', balance)

      const bchBalance = this.state.wallet.bchjs.BitcoinCash.toBitcoinCash(balance)

      this.setState({
        balance: `Balance: ${balance} sats, ${bchBalance} BCH`
      })
    } catch (err) {
      this.setState({
        balance: (<p><b>Error</b>: {`${err.message}`}</p>)
      })
    }
  }
}

export default GetBalance
