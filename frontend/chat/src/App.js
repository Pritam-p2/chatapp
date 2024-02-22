import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import './App.css';
import { Provider } from 'react-redux'
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path='/listings/:id' element={<ListingDetail />} /> */}
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
