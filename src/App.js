import './App.css';
import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';
import { websiteTheme } from './Theme/WebAppTheme';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from './components/State/Authentication/Action';
import { getCartByUserId } from './components/State/Customer/Cart/Action';
import Routers from './Routers/Routers';

function App() {

  const dispatch = useDispatch();
  const jwtToken = localStorage.getItem("jwtToken");
  const role = localStorage.getItem("role");
  const { auth } = useSelector(store => store);
  useEffect(() => {
    if (jwtToken !== null && jwtToken !== undefined) {
      dispatch(getUser(auth.jwtToken || jwtToken));
      dispatch(getCartByUserId({ jwtToken: jwtToken, userId: auth.user?.id }));
    }
  }, [auth.jwtToken]);

  return (
    <ThemeProvider theme={websiteTheme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: { backgroundColor: "#f5f5f5" },
        }}
      />
      <Routers />
    </ThemeProvider>
  );
}

export default App;
