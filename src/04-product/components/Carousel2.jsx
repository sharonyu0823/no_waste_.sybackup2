import { useState, useEffect } from "react";
import axios from "axios";
import "./style/Carousel.scss";

export default function Carousel({ sid }) {
  const [carousel, setCarousel] = useState([]);
  const [myArray, setMyArray] = useState([0, 0, 0]);
  const [myZindexArr, setMyZindexArr] = useState([0, 0, 0]);
  const [imgArray, setImgArray] = useState([]);
  
  async function getCarousel() {
    try {
      const response = await axios.get(
        `http://localhost:3004/product/picture?sid=` + sid
      );
      const Pdata = response.data.product_rows[0];
      setImgArray(Pdata.picture.split(","));
      setCarousel(Pdata);
      console.log(Pdata);
    } catch (e) {
      console.error(e.message);
    }
  }

  function handleClick(e) {
    console.log("e", e.target.innerText);

    if (e.target.innerText === "0") {
      setMyArray([1, 1, -2]);
      setMyZindexArr([1, 0, 0]);
    }
    if (e.target.innerText === "1") {
      setMyArray([0, 0, 0]);
      setMyZindexArr([0, 1, 0]);
    }
    if (e.target.innerText === "2") {
      setMyArray([2, -1, -1]);
      setMyZindexArr([0, 0, 2]);
    }
  }

  useEffect(() => {
    getCarousel();
  }, []);

  return (
    <div>
      {imgArray.length > 0 && (
        <div className="a-caroudelWrapper">
          <div
            className="bg-1"
            style={{
              // width: "200px",
              // height: "200px",
              // fontSize: "1.5rem",
              // backgroundImage: `url('/04-product/img/${imgArray[0]}')`,
              transform: `translateX(${myArray[0] * 200}px)`,
              transition: "transform 1s",
              zIndex: `${myZindexArr[0]}`,
            }}
            onClick={(e) => {
              handleClick(e);
            }}
          >
          <img src={`/04-product/img/${imgArray[0]}`} alt="" />
            0
          </div>

          {imgArray[1] && (
            <div
              className="bg-2"
              style={{
                // backgroundImage: `url('/04-product/img/${imgArray[1]}')`,
                transform: `translateX(${myArray[1] * 200}px)`,
                transition: "transform 1s .1s",
                zIndex: `${myZindexArr[1]}`,
              }}
              onClick={(e) => handleClick(e)}
            >
            <img src={`/04-product/img/${imgArray[1]}`} alt="" />
              1
            </div>
          )}

          {imgArray[2] && (
            <div
              className="bg-3"
              style={{
                // backgroundImage: `url('/04-product/img/${imgArray[2]}')`,
                transform: `translateX(${myArray[2] * 200}px)`,
                transition: "transform 1s .2s",
                zIndex: `${myZindexArr[2]}`,
              }}
              onClick={(e) => handleClick(e)}
            >
            <img src={`/04-product/img/${imgArray[2]}`} alt=""/>
              2
            </div>
          )}
        </div>
      )}
    </div>
  );
}
