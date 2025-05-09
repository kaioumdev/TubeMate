import { Provider } from 'react-redux'
import Body from './components/Body'
import Header from './components/Header'
import store from './utils/redux/store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainContainer from './components/MainContainer';
import WatchPage from './components/WatchPage';
import SearchResults from './components/SearchResults';

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body></Body>,
    children: [
      {
        path: "/",
        element: <MainContainer></MainContainer>
      },
      {
        path: "watch",
        element: <WatchPage></WatchPage>
      }
    ]
  }
])

function App() {

  return (
    <Provider store={store}>
      <div>
        <Header></Header>
        <SearchResults></SearchResults>
        <RouterProvider router={appRouter}></RouterProvider>
      </div>
    </Provider>
  )
}

export default App
