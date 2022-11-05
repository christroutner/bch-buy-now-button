/*
  Component for looking up the balance of a BCH address.
*/

// Global npm libraries
import React from 'react'
import { Container, Row, Col, Form, Button, Spinner, Image } from 'react-bootstrap'

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
    const id = Math.floor(Math.random() * 1000)
    const productId = `blue-widget-${id}`
    console.log(`productId: ${productId}`)

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
              <ul>
                <li><b>Name:</b> Blue Widet</li>
                <li><b>Price:</b> $0.02 USD</li>
              </ul>
            </Col>
          </Row>
          <br />

          <Row>
            <Col className='text-break' style={{ textAlign: 'center' }}>
              <Form name='prompt-cash-form' action='https://prompt.cash/pay' method='get'>
                <input type='hidden' name='token' value='796-lQ3Ur73D' />
                <input type='hidden' name='tx_id' value={productId} />
                <input type='hidden' name='amount' value='0.02' />
                <input type='hidden' name='currency' value='USD' />
                <input type='hidden' name='desc' value='Blue Widget' />
                <input type='hidden' name='return' value='https://buy-now-success.fullstack.cash' />
                <input type='hidden' name='callback' value='https://log.psfoundation.info/log' />
                <Button variant='primary' type='submit'>Buy with BitcoinCash (BCH)</Button>
              </Form>
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
