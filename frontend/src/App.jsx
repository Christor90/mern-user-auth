import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import UserDetails from './components/Auth/UserDetails';

function App() {
  // const handleFilter = (e) => {
  //   const value = e.target.value;
  //   console.log('Search input:', value); // You can handle filtering logic here
  // };

  return (
    <div className="relative h-full w-full">
      <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div class="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userDetails" element={<UserDetails />} />
          {/* Add more routes here if needed */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
