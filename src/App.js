import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ParentNav from './components/ParentNav';
import Signup from './components/Signup';
import axios from 'axios';
import NewRecord from './components/NewRecord';
import AllData from './components/AllData';
import Login from './components/Login';
import PaymentHistory from './components/PaymentHistory';
import Search from './components/Search';
import Account from './components/Account';
import Summary from './components/Summary';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

function App() {  
  return (
    <>    
    <Routes>
        <Route path='/' element={<ParentNav />}>
        <Route index element={<Home />} />
        <Route path='/new-user-register' element={<Signup />} />
        <Route path='/login' element={<Login />} />       
        <Route path='/add-new-user' element={<NewRecord />} />
        <Route path='/get-all-data' element={<AllData />} />
        <Route path='/update/:id' element={<NewRecord />} />
        <Route path='/search' element={<Search />} />
        <Route path='/payment-history' element={<PaymentHistory />} />
        <Route path='/account' element={<Account />} />        
        <Route path='/summary' element={<Summary />} />        
        </Route>
    </Routes>          
    </>
  );
}

export default App;
