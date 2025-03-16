import React, { useContext, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [loading, setLoading] = useState(false)

  const handlePayment = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await axios.post('http://localhost:4000/api/mpesa/stkpush', {
        phoneNumber: phoneNumber.replace(/^0/, '254'), 
        amount: getTotalCartAmount()
      })
      console.log("Formatted Phone Number:", phoneNumber.replace(/^0/, '254'));

      if (response.data.success) {
        alert('Please check your phone for the STK push prompt')
      } else {
        alert('Payment initiation failed. Please try again.')
      }
    } catch (error) {
      console.error('Payment error:', error)
      alert('Payment failed. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className='place-order' onSubmit={handlePayment}>
      <div className="place-order-left">
        <p className="title">Order Information</p>
        <div className="multi-fields">
          <input 
            type="text" 
            placeholder='First Name' 
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input 
            type="text" 
            placeholder='Last Name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />  
        </div>

        <div className="multi-fields">
          <input 
            type="text" 
            placeholder='Phone (07...)' 
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            pattern="^0[0-9]{9}$"
            title="Please enter a valid Kenyan phone number starting with 0"
          />
        </div>
      </div>
      
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <b>Total</b>
              <b>KES{getTotalCartAmount()}</b>
            </div>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Processing...' : 'PROCEED TO PAYMENT'}
          </button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder