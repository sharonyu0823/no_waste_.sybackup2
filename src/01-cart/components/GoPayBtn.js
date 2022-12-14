import React, { useState, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import dayjs from 'dayjs'

import CartInfoContext from '../contexts/CartInfoContext'
import AuthContext from '../../contexts/AuthContext'

import ModalConfirm from '../../components/ModalConfirm'
import ModalNotification from '../../components/ModalNotification'

import './../styles/GoPayBtn.scss'

function GoPayBtn({ pickup, pay }) {
  const navigate = useNavigate()

  const {
    cartItem,
    handleEmptyCart,
    checkCartEmpty,
    emptyCart,
    setEmptyCart,
    ModalNotification,
    ModalConfirm,
  } = useContext(CartInfoContext)

  const { myAuth, setMyAuth, logout, deleteAccountD } = useContext(AuthContext)

  const [isOpen, setIsOpen] = useState(false)
  const [headerMg, setHeaderMg] = useState('')
  const [bodyMg, setBodyMg] = useState('')

  const closeModal = () => {
    setIsOpen(false)
    navigate('/login')
  }
  const { totalAmount, totalItem, totalSalePrice, totalUnitPrice, userCart } =
    cartItem

  const GoPay = async () => {
    if (myAuth.authorised) {
      const ordernum = dayjs(new Date()).format('YYYYMMDDHHmmss')
      // console.log(order_num)
      const mid = myAuth.mb_sid

      const {
        totalAmount,
        totalItem,
        totalSalePrice,
        totalUnitPrice,
        userCart,
      } = cartItem

      const emptyCart = {
        userCart: [],
        totalItem: 0,
        totalUnitPrice: 0,
        totalSalePrice: 0,
        totalAmount: 0,
      }

      if (pay === 1) {
        const res = await axios.post(
          // `http://localhost:3004/cart/add-order/${mid}`,
          `http://localhost:3004/cart/linepay/${ordernum}?mid=${mid}`,
          cartItem
        )
        console.log(`Pay coded: ${pay}`, res.data)

        // const confirm = await axios.get(`${res.data.url}`)
        if (res.data.success) {
          navigate('/cart/done')
          console.log('LINE Pay付款成功，導向訂單完成頁')
        }
      } else if (pay === 2) {
        const res = await axios.post(
          // `http://localhost:3004/cart/add-order/${mid}`,
          `http://localhost:3004/cart/linepay/${mid}`,
          cartItem
        )
        // console.log('GoPay', res.data)
        localStorage.setItem('cartItem', JSON.stringify(emptyCart))
        setEmptyCart(true)
        console.log('TapPay付款，購物車已清空')
      } else {
        alert('請選擇付款方式！')
      }
    } else {
      // setIsOpen(true)
      // setHeaderMg('會員')
      // setBodyMg('請先註冊/登入！')
    }
  }

  return (
    <>
      <div className="y-go-pay-border">
        <p className="y-go-pay" onClick={GoPay}>
          前往結賬
        </p>
      </div>
      {/* <ModalNotification
        closeModal={closeModal}
        isOpen={isOpen}
        NotificationHeader={headerMg}
        NotificationBody={bodyMg}
      /> */}
    </>
  )
}

export default GoPayBtn
