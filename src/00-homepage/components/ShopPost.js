import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

import './../styles/ShopPost.scss'

import ShopPic from './../../dotown/toast.png'

function shopPost({ shopInfo }) {
  const { sid, member_sid, title, img, content, mb_name } = shopInfo
  return (
    <div className="y-shop-card-container">
      <Link
        to={`/forum/cook/inner${shopInfo.sid}`}
        style={{ textDecoration: 'none' }}
      >
        <div className="y-shop-top">
          <div className="y-shop-author">
            <p className="y-shop-author-name">{shopInfo.mb_name}</p>
            <p className="y-shop-author-account">{shopInfo.sid}</p>
          </div>
          <div className="y-shop-title">
            <p>{title}</p>
          </div>
        </div>
        <div className="y-shop-text">
          <p>{content}</p>
        </div>
        <div className="y-shop-pic">
          <img src={ShopPic} alt="shop banner" />
        </div>
      </Link>
    </div>
  )
}

export default shopPost
