import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';
import { Provider } from 'react-redux'
import store from './store/store';
import { useEffect, useState } from 'react';
import useWebSocket, { ReadyState } from "react-use-websocket"


// import { useDispatch,useSelector } from 'react-redux';


function App() {
  // const dispatch = useDispatch()
  // const mychats = useSelector((state) => state.mychats)
  const [isLoggedout, setIsLoggedout] = useState(false)
  const WS_URL = process.env.REACT_APP_WS + "lastseen/universal/"

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    WS_URL,
    {
      share: false,
      shouldReconnect: () => true,
    },
  )



  const loggingout = () => {
    console.log("logging out the user")
    setIsLoggedout(true)
  }

  if (isLoggedout) {
    const token = localStorage.getItem('access')
    console.log(token)
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    if (readyState === ReadyState.OPEN) {
      console.log("ready state")
      sendJsonMessage({
        token: token
      })
    }

    if (readyState === ReadyState.CLOSED) {
      console.log("closed")
    }
  }


  useEffect(() => {
    const handleBeforeUnload = () => {
      console.log('Performing cleanup before unload...');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home logout={loggingout} />} />
          {/* <Route path='/listings/:id' element={<ListingDetail />} /> */}
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
