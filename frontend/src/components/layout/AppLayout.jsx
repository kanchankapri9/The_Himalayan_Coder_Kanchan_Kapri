import Navbar from './Navbar'
import Footer from './Footer'
import './AppLayout.css'

function AppLayout({ children }) {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="app-layout__main">{children}</main>
      <Footer />
    </div>
  )
}

export default AppLayout
