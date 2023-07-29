import './App.css'
import ProductList from './component/List'
import LayoutAdmin from './layout/LayoutAdmin'
import LayoutClient from './layout/layoutClient'

function App() {
  return (
    <div>
      <LayoutAdmin/>
      <ProductList/>
    </div>
  )
}

export default App
