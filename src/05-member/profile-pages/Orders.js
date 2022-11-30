import '.././style/profile-pages/Orders.scss'

import React, { useEffect, useContext, useState } from 'react'
import UserProfileTmp from '../components/UserProfileTmp'
import { useLocation } from 'react-router-dom'
import AuthContext from '../../contexts/AuthContext'
import axios from 'axios'
import { PROFILE_ORDERS } from '../../my-config'

function Orders() {
  const [orderIndex, setOrderIndex] = useState(1)

  // 訂單數
  // 總共多少筆訂單
  const [mbTotalOrder, setMbTotalOrder] = useState(0)
  // 總共訂單資料用
  const [mbOrderDisplay, setMbOrderDisplay] = useState([])

  // 錯誤訊息用
  const [errorMbOrederMg, setErrorMbOrederMg] = useState('')

  // 訂單細項數
  // 訂單編號
  const [mbOrderNum, setMbOrderNum] = useState('')
  // 總共多少筆訂單細項
  const [mbTotalOrderDetails, setMbTotalOrderDetails] = useState(0)
  // 總共訂單細項資料用
  const [mbOrderDisplayDetails, setMbOrderDisplayDetails] = useState([])

  // ====================================

  function orderToggle() {
    if (orderIndex === 1) {
      setOrderIndex(0)
    } else {
      setOrderIndex(1)
    }
  }

  // ====================================
  // 讀取訂單
  const location = useLocation()
  const { myAuth } = useContext(AuthContext)

  async function getOrders() {
    const { data } = await axios.get(PROFILE_ORDERS, {
      headers: {
        Authorization: 'Bearer ' + myAuth.token,
      },
    })
    // console.log(myAuth)
    // console.log(myAuth.token)
    // console.log(data)
    // console.log(data.row.length)
    console.log(data.row)
    console.log(data.row[1])
    // console.log(response.data)

    if (data.success) {
      setMbTotalOrder(data.row.length)
      setMbOrderDisplay(data.row)
      // alert('有訂單')
    } else {
      setErrorMbOrederMg('目前沒有訂單')
    }

  }

  // console.log(mbOrderDisplay[0])
  // console.log(mbOrderDisplay[1])

  useEffect(() => {
    // console.log(2);
    getOrders()
  }, [location])

  // ====================================
  // 讀取訂單細節

  return (
    <>
      <div className="s-body-profile">
        <div className="s-container">
          <UserProfileTmp />
          <div className="s-main-content">
            <div className="s-o">
              <h2 className="s-o-title">訂單查詢</h2>
              <div className="s-o-card">
                {/* orders */}
                {mbTotalOrder === 0 ? (
                  <div className="s-o-data s-o-data-error">
                    {errorMbOrederMg}
                  </div>
                ) : (
                  Array(mbTotalOrder)
                    .fill(mbOrderDisplay)
                    .map((v, i) => {
                      console.log('v', v)
                      console.log('i', i)
                      console.log('v[i].order_sid', v[i].order_sid)

                      return (
                        <div key={v[i].order_sid} className="s-o-data">
                          <div className="s-o-line"></div>
                          <div className="s-o-items">
                            <h3 className="s-o-question">訂單日期</h3>
                            <span className="s-o-answer" id="mboDate">
                              {v[i].created_at}
                            </span>
                          </div>
                          <div className="s-o-items">
                            <h3 className="s-o-question">訂單編號</h3>
                            <span className="s-o-answer" id="mboNum">
                              {v[i].order_num}
                            </span>
                          </div>
                          <div className="s-o-items">
                            <h3 className="s-o-question">訂單金額</h3>
                            <span className="s-o-answer" id="mboTotalPrice">
                              {v[i].total}
                            </span>
                          </div>
                          <div className="s-o-items">
                            <h3 className="s-o-question">訂單狀態</h3>
                            <span className="s-o-answer" id="mboStatus">
                              {v[i].order_status}
                            </span>
                          </div>
                          <div className="s-o-items">
                            <h3 className="s-o-question">訂單備註</h3>
                            <span
                              className={
                                orderIndex === 1
                                  ? 's-o-answer s-mboNote1'
                                  : 's-o-answer s-mboNote1 s-o-active'
                              }
                              onClick={orderToggle}
                            >
                              查詢訂單
                            </span>
                            <span
                              className={
                                orderIndex === 1
                                  ? 's-o-answer s-mboNote2'
                                  : 's-o-answer s-mboNote2 s-o-active'
                              }
                              onClick={orderToggle}
                            >
                              收合訂單
                            </span>
                          </div>
                        </div>
                      )
                    })
                )}

                {/* order-details */}
              </div>
            </div>

            {/* <div className="s-o">
              <h2 className="s-o-title">訂單查詢</h2>
              <div className="s-o-card">
                <div className="s-o-data">
                  <div className="s-o-line"></div>
                  <div className="s-o-items">
                    <h3 className="s-o-question">訂單日期</h3>
                    <span className="s-o-answer" id="mboDate">
                      2022-10-05 14:42:59
                    </span>
                  </div>
                  <div className="s-o-items">
                    <h3 className="s-o-question">訂單編號</h3>
                    <span className="s-o-answer" id="mboNum">
                      20220923114231
                    </span>
                  </div>
                  <div className="s-o-items">
                    <h3 className="s-o-question">訂單金額</h3>
                    <span className="s-o-answer" id="mboTotalPrice">
                      NT $5000
                    </span>
                  </div>
                  <div className="s-o-items">
                    <h3 className="s-o-question">訂單狀態</h3>
                    <span className="s-o-answer" id="mboStatus">
                      {' '}
                      訂單完成{' '}
                    </span>
                  </div>
                  <div className="s-o-items">
                    <h3 className="s-o-question">訂單備註</h3>
                    <span
                      className={
                        orderIndex === 1
                          ? 's-o-answer s-mboNote1'
                          : 's-o-answer s-mboNote1 s-o-active'
                      }
                      onClick={orderToggle}
                    >
                      查詢訂單
                    </span>
                    <span
                      className={
                        orderIndex === 1
                          ? 's-o-answer s-mboNote2'
                          : 's-o-answer s-mboNote2 s-o-active'
                      }
                      onClick={orderToggle}
                    >
                      收合訂單
                    </span>
                  </div>
                </div>
                <div className="s-o-data-details-out">
                  <div
                    className={
                      orderIndex === 1
                        ? 's-o-data-details s-orderCloumn'
                        : 's-o-data-details s-orderCloumn s-o-active'
                    }
                  >
                    <div className="s-o-data-detail">
                      <div className="s-o-line-d"></div>
                      <div className="s-o-items-d">
                        <h3 className="s-o-question-d">商品名稱</h3>
                        <span className="s-o-answer-d">漢堡</span>
                      </div>
                      <div className="s-o-items-d">
                        <h3 className="s-o-question-d">優惠價</h3>
                        <span className="s-o-answer-d">$59</span>
                      </div>
                      <div className="s-o-items-d">
                        <h3 className="s-o-question-d">數量</h3>
                        <span className="s-o-answer-d" id="mbpDate">
                          4
                        </span>
                      </div>
                      <div className="s-o-items-d">
                        <h3 className="s-o-question-d">小計</h3>
                        <span className="s-o-answer-d">$236</span>
                      </div>
                    </div>
                    <div className="s-o-data-detail">
                      <div className="s-o-line-d"></div>
                      <div className="s-o-items-d">
                        <h3 className="s-o-question-d">商品名稱</h3>
                        <span className="s-o-answer-d">漢堡</span>
                      </div>
                      <div className="s-o-items-d">
                        <h3 className="s-o-question-d">優惠價</h3>
                        <span className="s-o-answer-d">$59</span>
                      </div>
                      <div className="s-o-items-d">
                        <h3 className="s-o-question-d">數量</h3>
                        <span className="s-o-answer-d">4</span>
                      </div>
                      <div className="s-o-items-d">
                        <h3 className="s-o-question-d">小計</h3>
                        <span className="s-o-answer-d">$236</span>
                      </div>
                    </div>
                    <div className="s-o-data-detail">
                      <div className="s-o-line-d"></div>
                      <div className="s-o-items-d">
                        <h3 className="s-o-question-d">商品名稱</h3>
                        <span className="s-o-answer-d">漢堡</span>
                      </div>
                      <div className="s-o-items-d">
                        <h3 className="s-o-question-d">優惠價</h3>
                        <span className="s-o-answer-d">$59</span>
                      </div>
                      <div className="s-o-items-d">
                        <h3 className="s-o-question-d">數量</h3>
                        <span className="s-o-answer-d">4</span>
                      </div>
                      <div className="s-o-items-d">
                        <h3 className="s-o-question-d">小計</h3>
                        <span className="s-o-answer-d">$236</span>
                      </div>
                    </div>
                    <div className="s-o-data-detail">
                      <div className="s-o-line-d"></div>
                      <div className="s-o-items-d">
                        <h3 className="s-o-question-d">商品名稱</h3>
                        <span className="s-o-answer-d">漢堡</span>
                      </div>
                      <div className="s-o-items-d">
                        <h3 className="s-o-question-d">優惠價</h3>
                        <span className="s-o-answer-d">$59</span>
                      </div>
                      <div className="s-o-items-d">
                        <h3 className="s-o-question-d">數量</h3>
                        <span className="s-o-answer-d">4</span>
                      </div>
                      <div className="s-o-items-d">
                        <h3 className="s-o-question-d">小計</h3>
                        <span className="s-o-answer-d">$236</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="s-o-data">
                  <div className="s-o-line"></div>
                  <div className="s-o-items">
                    <h3 className="s-o-question">訂單日期</h3>
                    <span className="s-o-answer" id="mboDate">
                      2022-10-05 14:42:59
                    </span>
                  </div>
                  <div className="s-o-items">
                    <h3 className="s-o-question">訂單編號</h3>
                    <span className="s-o-answer" id="mboNum">
                      20220923114231
                    </span>
                  </div>
                  <div className="s-o-items">
                    <h3 className="s-o-question">訂單金額</h3>
                    <span className="s-o-answer" id="mboTotalPrice">
                      NT $5000
                    </span>
                  </div>
                  <div className="s-o-items">
                    <h3 className="s-o-question">訂單狀態</h3>
                    <span className="s-o-answer" id="mboStatus">
                      {' '}
                      訂單完成{' '}
                    </span>
                  </div>
                  <div className="s-o-items">
                    <h3 className="s-o-question">訂單備註</h3>
                    <span className="s-o-answer s-mboNote1">查詢訂單</span>
                    <span className="s-o-answer s-mboNote2">收合訂單</span>
                  </div>
                </div>
                <div className="s-o-data-details-out">
                  <div className="s-o-data-details s-orderCloumn">
                    <div className="s-o-data-detail">
                      <div className="s-o-line-d"></div>
                      <div className="s-o-items-d">
                        <h3 className="s-o-question-d">商品名稱</h3>
                        <span className="s-o-answer-d">漢堡</span>
                      </div>
                      <div className="s-o-items-d">
                        <h3 className="s-o-question-d">優惠價</h3>
                        <span className="s-o-answer-d">$59</span>
                      </div>
                      <div className="s-o-items-d">
                        <h3 className="s-o-question-d">數量</h3>
                        <span className="s-o-answer-d" id="mbpDate">
                          4
                        </span>
                      </div>
                      <div className="s-o-items-d">
                        <h3 className="s-o-question-d">小計</h3>
                        <span className="s-o-answer-d">$236</span>
                      </div>
                    </div>
                    <div className="s-o-data-detail">
                      <div className="s-o-line-d"></div>
                      <div className="s-o-items-d">
                        <h3 className="s-o-question-d">商品名稱</h3>
                        <span className="s-o-answer-d">漢堡</span>
                      </div>
                      <div className="s-o-items-d">
                        <h3 className="s-o-question-d">優惠價</h3>
                        <span className="s-o-answer-d">$59</span>
                      </div>
                      <div className="s-o-items-d">
                        <h3 className="s-o-question-d">數量</h3>
                        <span className="s-o-answer-d">4</span>
                      </div>
                      <div className="s-o-items-d">
                        <h3 className="s-o-question-d">小計</h3>
                        <span className="s-o-answer-d">$236</span>
                      </div>
                    </div>
                    <div className="s-o-data-detail">
                      <div className="s-o-line-d"></div>
                      <div className="s-o-items-d">
                        <h3 className="s-o-question-d">商品名稱</h3>
                        <span className="s-o-answer-d">漢堡</span>
                      </div>
                      <div className="s-o-items-d">
                        <h3 className="s-o-question-d">優惠價</h3>
                        <span className="s-o-answer-d">$59</span>
                      </div>
                      <div className="s-o-items-d">
                        <h3 className="s-o-question-d">數量</h3>
                        <span className="s-o-answer-d">4</span>
                      </div>
                      <div className="s-o-items-d">
                        <h3 className="s-o-question-d">小計</h3>
                        <span className="s-o-answer-d">$236</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        <div className="s-footer"></div>
      </div>
    </>
  )
}

export default Orders
