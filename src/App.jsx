import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

// PAGES
import Homepage from './pages/Homepage'
import Product from './pages/Product'
import Pricing from './pages/Pricing'
import Login from './pages/Login'
import AppLayout from './pages/AppLayout'
import PageNotFound from './pages/PageNotFound'

// COMPONENTS
import City from './components/City'
import CityList from './components/CityList'
import CountryList from './components/CountryList'
import Form from './components/Form'

const BASE_URL = 'http://localhost:9000'

function App() {
  const [cities, setCities] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true)

        const res = await fetch(`${BASE_URL}/cities`)
        const data = await res.json()

        setCities(data)
      } catch {
        alert('There was an error loading data...')
      } finally {
        setIsLoading(false)
      }
    }

    fetchCities()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />

        <Route path="app" element={<AppLayout />}>
          <Route index element={<Navigate replace to="cities" />} />

          <Route
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          />

          <Route path="cities/:id" element={<City />} />

          <Route
            path="countries"
            element={<CountryList cities={cities} isLoading={isLoading} />}
          />

          <Route path="form" element={<Form />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
