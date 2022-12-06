import '../styles/06-event-02-events.scss'
import React, { useEffect, useState } from 'react'

import jblueM from '../svg/blueMountain.svg'
import jriceM from '../svg/riceMountain.svg'
import jgreenM from '../svg/greenMountain.svg'
import jorangeM from '../svg/orangeMountain.svg'
import log from 'eslint-plugin-react/lib/util/log'
import jEmptyHeart from '../svg/heart-none.svg'
import jHeart from '../svg/full-heart.svg'
import { useTimeTable } from './../context/useTimeTable'
import axios from 'axios'

function CategoryTab(props) {
  const { text, activeCat, catIndex, handleSwitchCat } = props

  return (
    <li>
      <div
        onClick={() => {
          handleSwitchCat(catIndex)
        }}
        className={activeCat === catIndex ? 'cactive' : ''}
      >
        {text}
      </div>
    </li>
  )
}

function Events({ origins }) {
  const [cate, setCate] = useState(1)
  const [epage, setEpage] = useState(1)
  const [cateRow, setCateRow] = useState([])

  const [jmactive, setJmactive] = useState(1)

  const [registeredNum, setRegisteredNum] = useState(0)
  const { timeTable, removeTimeTable, setWhichHover } = useTimeTable()
  const [likeImg, setLikeImg] = useState(jEmptyHeart)

  const onAddLike = async (cateRow) => {
    console.log('cateRow', cateRow)
    try {
      const res = await axios.post(`http://localhost:3004/event/event-add`, {
        memberSid: 1,
        eventSid: cateRow.sid,
      })
      setLikeImg(jHeart)
    } catch (err) {
      console.log(err.message)
    }
  }

  const getRegeistered = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3004/event/event-registered/$1`
      )
      console.log(res)
      setRegisteredNum(res)
    } catch (err) {
      console.log(err.message)
    }
  }
  useEffect(() => {
    const new_row = origins.filter((e) => {
      return e.cate === cate
    })
    setCateRow(new_row)
  }, [cate, origins, timeTable])

  useEffect(() => {
    // getRegeistered()
  }, [])

  useEffect(() => {
    cateRow[epage - 1]?.like ? setLikeImg(jHeart) : setLikeImg(jEmptyHeart)
  }, [cateRow])

  const handleSwitchCat = (catIndex) => {
    setCate(catIndex)
  }

  const categories = ['工作坊', '音樂', '講座', 'VR體驗', '劇場']
  const mountainColor = ['blue', 'rice', 'green', 'orange']

  return (
    <>
      <div className="j-event-middle-events">
        <div className="j-cate-banner">
          <div className="j-cate-banner-deco">
            <div>{cateRow[epage - 1]?.nick}</div>
          </div>
        </div>

        <ul className="j-cate-group">
          {categories.map((cat, i) => (
            <CategoryTab
              key={i}
              text={cat}
              activeCat={cate}
              catIndex={i + 1}
              handleSwitchCat={handleSwitchCat}
            />
          ))}
        </ul>

        <div className="j-mountains">
          <div className={`j-blue-mountain ${jmactive === 1 ? 'mactive' : ''}`}>
            <img
              src={jblueM}
              alt=""
              onClick={() => {
                setEpage(1)
                setJmactive(1)
              }}
            />
          </div>
          <div className={`j-rice-mountain ${jmactive === 2 ? 'mactive' : ''}`}>
            <img
              src={jriceM}
              alt=""
              onClick={() => {
                setEpage(2)
                setJmactive(2)
              }}
            />
          </div>
          <div
            className={`j-green-mountain ${jmactive === 3 ? 'mactive' : ''}`}
          >
            <img
              src={jgreenM}
              alt=""
              onClick={() => {
                setEpage(3)
                setJmactive(3)
              }}
            />
          </div>
          <div
            className={`j-orange-mountain ${jmactive === 4 ? 'mactive' : ''}`}
          >
            <img
              src={jorangeM}
              alt=""
              onClick={() => {
                setEpage(4)
                setJmactive(4)
              }}
            />
          </div>
        </div>

        {origins.length > 0 && (
          <div>
            {cateRow.length > 0 && (
              <div
                className="j-event-card"
                style={{ background: `${cateRow[epage - 1].styles}` }}
                key={cateRow[epage - 1].name}
              >
                <span className="j-lego">
                  <div className="j-card-name">
                    {cateRow[epage - 1].name}
                    <img
                      onClick={() => onAddLike(cateRow[epage - 1])}
                      src={likeImg}
                      alt=""
                    />
                  </div>
                  <div className="j-card-image">
                    <img
                      src={`/06-event-img/${cateRow[epage - 1].img}`}
                      alt=""
                    />
                  </div>
                  <div className="j-card-text">
                    {cateRow[epage - 1].content}
                  </div>
                  <div className="j-card-sold">
                    {/* {registeredNum} */}
                    {/* {cateRow[epage - 1].maximum} */}
                    {/* <img src={jHeart} alt="" /> */}
                    報名額滿
                  </div>
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default Events
