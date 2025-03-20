import { Provider } from 'react-redux'
import Body from './components/Body'
import Header from './components/Header'
import store from './utils/redux/store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body></Body>,
    children: []
  }
])

function App() {

  return (
    <Provider store={store}>
      <div>
        <Header></Header>
        <RouterProvider router={appRouter}></RouterProvider>
      </div>
    </Provider>
  )
}

export default App
