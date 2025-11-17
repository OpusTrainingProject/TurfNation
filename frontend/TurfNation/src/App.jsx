
// import './App.css' 
// import { Routes, Route, Navigate } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
// import SignIn from './pages/user/SignIn'
// import SignUp from './pages/user/SignUp'

// import AdminSidebar from "./pages/admin/AdminSidebar";
// import AdminHelpSupport from "./pages/admin/AdminHelpSupport";
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import HomePage from './pages/user/HomePage';
// import UserDashboard from './pages/user/UserDashboard';
// import AdminPayments from './pages/admin/AdminPayments';
// import ViewReviews from './pages/user/ViewReviews';


// // Dummy pages
// const AddTurf = () => (
//   <div className="p-8">
//     <h1 className="text-4xl font-bold text-gray-900">Add New Turf</h1>
//     <p className="text-gray-600 mt-2">Create a new turf listing</p>
//   </div>
// );

// const ManageTurfs = () => (
//   <div className="p-8">
//     <h1 className="text-4xl font-bold text-gray-900">Manage Turfs</h1>
//     <p className="text-gray-600 mt-2">Edit or delete existing turfs</p>
//   </div>
// );

// const Bookings = () => (
//   <div className="p-8">
//     <h1 className="text-4xl font-bold text-gray-900">All Bookings</h1>
//     <p className="text-gray-600 mt-2">View all turf bookings</p>
//   </div>
// );

// function App() {
//   return (
//     <>
//       <ToastContainer 
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />

//       <Routes>
//         {/* Public routes - Homepage should be first */}
//         <Route path='/' element={<HomePage />} />
//         <Route path='/signup' element={<SignUp />} />
//         <Route path='/signin' element={<SignIn />} />
//         <Route path='/login' element={<SignIn />} />

//         {/* Reviews route */}
//         <Route path='/reviews/:turfId' element={<ViewReviews />} />

//         {/* User routes */}
//         <Route path='/user/dashboard' element={<UserDashboard />} />

//         {/* Admin layout route with nested routes */}
//         <Route path='/admin' element={<AdminSidebar />}>
//           <Route index element={<AdminDashboard />} />
//           <Route path='dashboard' element={<AdminDashboard />} />
//           <Route path='add-turf' element={<AddTurf />} />
//           <Route path='manage-turfs' element={<ManageTurfs />} />
//           <Route path='bookings' element={<Bookings />} />
//           <Route path='payments' element={<AdminPayments />} />
//           <Route path='support' element={<AdminHelpSupport />} />
//         </Route>

//         {/* Catch-all route - redirects unknown paths to homepage */}
//         <Route path='*' element={<Navigate to="/" replace />} />
//       </Routes>
//     </>
//   );
// }

// export default App;


import './App.css' 
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import './App.css'
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SignIn from './pages/user/SignIn'
import SignUp from './pages/user/SignUp'

import AdminSidebar from "./pages/admin/AdminSidebar";
import AdminHelpSupport from "./pages/admin/AdminHelpSupport";
import AdminPayments from "./pages/admin/AdminPayments";
import AdminDashboard from "./pages/admin/AdminDashboard";

import AdminPayments from './pages/admin/AdminPayments';
import AddTurf from "./pages/admin/AddTurf";
import AllTurf from "./pages/admin/AllTurf";
import AllBookings from "./pages/admin/AllBookings";

import HomePage from './pages/user/HomePage';
import UserDashboard from './pages/user/UserDashboard';



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
          <Route path="add-turf" element={<AddTurf />} />
          <Route path="manage-turfs" element={<AllTurf />} />
          <Route path='bookings' element={<AllBookings />} />
          <Route path='payments' element={<AdminPayments />} />
          <Route path='support' element={<AdminHelpSupport />} />
        </Route>

        {/* Catch-all route - redirects unknown paths to admin dashboard */}
        <Route path='*' element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </>
  );
}

export default App;
