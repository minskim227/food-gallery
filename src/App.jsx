import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './index.css'
import Layout from './components/Layout'
import FoodLayout from './components/FoodLayout'
import Home from './pages/Home'
import Gallery from './pages/Gallery'
import Food from './pages/Food'
import FoodFullImage from './pages/FoodFullImage'
import FoodMap from './pages/FoodMap'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='gallery' element={<Gallery />} />
          <Route path='gallery/:id' element={<FoodLayout />}>
            <Route index element={<Food />} />
            <Route path='fullimage' element={<FoodFullImage />} />
            <Route path='map' element={<FoodMap />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
