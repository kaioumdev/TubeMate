import { Provider } from 'react-redux'
import Body from './components/Body'
import Header from './components/Header'
import store from './utils/redux/store';

function App() {

  return (
    <Provider store={store}>
      <div>
        <Header></Header>
        <Body></Body>
      </div>
    </Provider>
  )
}

export default App
