import { Register } from './components/Register'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <div className="App w-full h-screen flex items-center justify-center p-2">
      <Register />
      <ToastContainer />
    </div>
  )
}

export default App
