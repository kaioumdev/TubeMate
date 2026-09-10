import { useEffect } from 'react'
import { Provider, useDispatch } from 'react-redux'
import store from './utils/redux/store'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Body from './components/Body'
import MainContainer from './components/MainContainer'
import WatchPage from './components/WatchPage'
import ShowSearchResults from './components/ShowSearchResults'
import ShortsPage from './components/ShortsPage'
import SignInPage from './components/SignInPage'
import { onAuthChange, serializeUser } from './utils/firebase'
import { setUser, clearUser, setAuthLoading } from './utils/redux/authSlice'

/* ── Auth listener — sits inside Provider so it can dispatch ── */
const AuthListener = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setAuthLoading(true))
    // onAuthStateChanged fires immediately with the persisted session
    const unsubscribe = onAuthChange((firebaseUser) => {
      if (firebaseUser) {
        dispatch(setUser(serializeUser(firebaseUser)))
      } else {
        dispatch(clearUser())
      }
    })
    return () => unsubscribe()
  }, [dispatch])

  return null
}

/* ── Router ─────────────────────────────────────────────── */
const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Body />,
    children: [
      { index: true,       element: <MainContainer /> },
      { path: 'watch',     element: <WatchPage /> },
      { path: 'search',    element: <ShowSearchResults /> },
      { path: 'shorts',    element: <ShortsPage /> },
      { path: 'signin',    element: <SignInPage /> },
    ],
  },
])

/* ── App root ────────────────────────────────────────────── */
function App() {
  return (
    <Provider store={store}>
      {/* AuthListener dispatches setUser/clearUser on every auth state change */}
      <AuthListener />
      <RouterProvider router={appRouter} />
    </Provider>
  )
}

export default App
