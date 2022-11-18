import './styles/global.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import MyContextProviders from './contexts/MyContextProviders'
import Homepage from './00-homepage/pages/Homepage'
import Menu from './components/Menu'

// 00-cart
import CartList from './01-cart/pages/CartList'

// 02-forum
import PostCook from './02-forum/pages/Post_cook'
import ForumHome from './02-forum/pages/ForumHome'

// 03-shop
import ShopList from './03-shop/03-shop-list'
import ShopHome from './03-shop/03-shop-home'

// 05-member
import UserSign from './05-member/UserSign'
import ResetPass from './05-member/ResetPass'
import ForgotPass from './05-member/ForgotPass'
import UserProfile from './05-member/UserProfile'

function App() {
  return (
<<<<<<< HEAD
    <BrowserRouter>
      <MyContextProviders>
        <Routes>
          {/* <Route path="/" element={<Homepage />} />
          <Route path="/cart" element={<CartList />} /> */}

          {/* 02-forum */}
          {/* <Route path="/forum" element={<ForumHome />} />
          <Route path="/forum/cook" element={<PostCook />} /> */}

          {/* 03-shop */}
          {/* <Route path="/shop" element={<ShopList />} /> */}
          {/* <Route path="/shop" element={<ShopHome />} /> */}

          {/* 05-member */}
          <Route path="/login" element={<SignUp />} />
          {/* <Route path="/forgot-pass" element={<ForgotPass />} />
          <Route path="/reset-pass" element={<ResetPass />} /> */}
        </Routes>
      </MyContextProviders>
    </BrowserRouter>
=======
    <>
      <BrowserRouter>
        <MyContextProviders>
          <Routes>
            <Route path="/" element={<HomePage />} />

            {/* 05-member */}
            <Route path="/login" element={<UserSign />} />
            <Route path="/forgot-pass" element={<ForgotPass />} />
            <Route path="/reset-pass" element={<ResetPass />} />
            <Route path="/profile" element={<UserProfile />} />
            {/* <div className="container">
              <div className="row top-section">
                <Route path="/login" element={<SignUp />} />
              </div>
            </div> */}
          </Routes>
        </MyContextProviders>
      </BrowserRouter>
    </>
>>>>>>> origin/sharon
  )
}

export default App
