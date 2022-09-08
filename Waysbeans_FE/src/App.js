import { Route, Routes, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import "./assets/css/style.css"
import { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";


// Pages
import Home from './pages/Home';
import DetailProduct from "./pages/DetailProduct";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import AddProduct from "./pages/AddProduct";
import IncomeTransaction from "./pages/IncomeTransaction";
import ListProduct from "./pages/ListProduct";
import UpdateProduct from "./pages/UpdateProduct";
// API
import { API, setAuthToken } from './config/api';

// Init token on axios every time the app is refreshed
if (localStorage.token) {
  setAuthToken(localStorage.token)
}
function App() {

  let navigate = useNavigate();

  // Init user context
  const [state, dispatch] = useContext(UserContext);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token)
    }
    // Redirect Auth
    if (state.isLogin === false) {
      navigate('/');
    } else {
      if (state.user.status === 'admin') {
        navigate('/transaction');
      } else if (state.user.status === 'customer') {
        navigate('/');
      }
    }
  }, [state]);

  // Check user token :
  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR',
        });
      }

      // Get user data
      let payload = response.data.data;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/detail-product/:id" element={<DetailProduct />}/>
      <Route path="/cart" element={ <Cart /> } />
      <Route path="/profile" element={ <Profile /> } />
      <Route path="/add-product" element={ <AddProduct /> } />
      <Route path="/transaction" element={ <IncomeTransaction /> } />
      <Route path="/list-product" element={ <ListProduct /> } />
      <Route path="/update-product/:id" element={ <UpdateProduct /> } />
    </Routes>
  );
}

export default App;
