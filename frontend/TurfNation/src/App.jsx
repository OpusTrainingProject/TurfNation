    import './App.css'
    import { Routes, Route } from "react-router-dom";
    // import { ToastContainer } from "react-toastify";
    import SignIn from './pages/user/SignIn'
    import SignUp from './pages/user/SignUp'
    import AdminSidebar from "./pages/admin/AdminSidebar";
    import AdminHelpSupport from "./pages/admin/AdminHelpSupport";
    import AdminDashboard from "./pages/admin/AdminDashboard";
    import HomePage from './pages/public/HomePage';
    import UserDashboard from './pages/user/UserDashboard';
    import AdminPayments from './pages/admin/AdminPayments'
    import UserHomePage from './pages/user/UserHomePage'
import PublicDashboard from './pages/public/PublicDashboard';
import HowItWorksPage from './pages/public/HowItWorks';
import ReviewSection from './pages/user/ReviewSection';
import HelpSupport from './pages/user/HelpSupport';
import UserProfile from './pages/user/UserProfile';
import BookingPage from './pages/user/BookingPage';

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

      {/* Admin layout route */}
      <Route path='/admin' element={<AdminSidebar />}>
        <Route path='dashboard' element={<AdminDashboard />} />
        <Route path='add-turf' element={<AddTurf />} />
        <Route path='manage-turfs' element={<ManageTurfs />} />
        <Route path='support' element={<AdminHelpSupport />} />
        <Route path='payments' element={<AdminPayments />} />
        <Route path='bookings' element={<Bookings />} />
        <Route index element={<AdminDashboard />} /> 
      </Route>
    </Routes>

        </>
      );
    }

    export default App;
