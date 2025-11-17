import './App.css'
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SignIn from './pages/user/SignIn'
import SignUp from './pages/user/SignUp'
import AdminSidebar from "./admin/AdminSidebar";
import AdminHelpSupport from "./admin/AdminHelpSupport";
import AdminPayments from "./admin/AdminPayments";
import AdminDashboard from "./admin/AdminDashboard";
import HomePage from './pages/user/HomePage';
import UserDashboard from './pages/user/UserDashboard';

// Dummy pages
const AddTurf = () => (
  <div className="p-8">
    <h1 className="text-4xl font-bold text-gray-900">Add New Turf</h1>
    <p className="text-gray-600 mt-2">Create a new turf listing</p>
  </div>
);

const ManageTurfs = () => (
  <div className="p-8">
    <h1 className="text-4xl font-bold text-gray-900">Manage Turfs</h1>
    <p className="text-gray-600 mt-2">Edit or delete existing turfs</p>
  </div>
);

const Bookings = () => (
  <div className="p-8">
    <h1 className="text-4xl font-bold text-gray-900">All Bookings</h1>
    <p className="text-gray-600 mt-2">View all turf bookings</p>
  </div>
);

const Login = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-gray-900">Login Page</h1>
      <p className="text-gray-600 mt-2">Authentication page</p>
    </div>
  </div>
);

// function App() {
//   return (
//     <>
//       <ToastContainer />
//       <Routes>
//         {/* Public routes */}
//         <Route path='/signup' element={<SignUp />} />
//         <Route path='/signin' element={<SignIn />} />
//         <Route path='/' element={<HomePage/>}/>
//         <Route path='/login' element={<Login />} />
//         <Route path='/dashboard' element={<UserDashboard/>}/>

//         {/* Admin layout route */}
//         <Route path='/admin' element={<AdminSidebar />}>
//           <Route path='dashboard' element={<AdminDashboard />} />
//           <Route path='add-turf' element={<AddTurf />} />
//           <Route path='manage-turfs' element={<ManageTurfs />} />
//           <Route path='support' element={<AdminHelpSupport />} />
//           <Route path='payments' element={<AdminPayments />} />
//           <Route path='bookings' element={<Bookings />} />
//           {/* Default admin page */}
//           <Route index element={<AdminDashboard />} />
//         </Route>
//       </Routes>
//     </>
//   );
// }



    function App() {
      return (
        <>
    <Routes>
      {/* Public routes */}
      <Route path='/signup' element={<SignUp />} />
      <Route path='/signin' element={<SignIn />} />
      <Route path='/' element={<HomePage />} />
      <Route path='/dashboard' element={<PublicDashboard />} />
      <Route path='/guide' element={<HowItWorksPage/>}/>
      <Route path='/help' element={<HelpSupport/>}/>


      {/* User routes */}
      <Route path='/user' >
      <Route path='dashboard' element={<UserDashboard />} />
      <Route path='home' element={<UserHomePage/>}/>
      <Route path='review' element={<ReviewSection/>}/>
      <Route path='profile' element={<UserProfile/>}/>
      <Route path='booking' element={<BookingPage/>}/>
      </Route>

        {/* User routes */}
        <Route path='/user/dashboard' element={<UserDashboard />} />

        {/* Admin layout route with nested routes */}
        <Route path='/admin' element={<AdminSidebar />}>
          <Route index element={<AdminDashboard />} />
          <Route path='dashboard' element={<AdminDashboard />} />
          <Route path='add-turf' element={<AddTurf />} />
          <Route path='manage-turfs' element={<ManageTurfs />} />
          <Route path='bookings' element={<Bookings />} />
          <Route path='payments' element={<AdminPayments />} />
          <Route path='support' element={<AdminHelpSupport />} />
        </Route>

        {/* Catch-all route - redirects unknown paths to homepage */}
        <Route path='*' element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
