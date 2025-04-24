import './App.css'
import Table from './components/Table'
import { Provider } from 'react-redux'
import {store} from "./store"

function App() {

  return (
    <Provider store={store}>
    <div >
      <Table/>
    </div>
    </Provider>
  )
}

export default App
