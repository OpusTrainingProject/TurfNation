    import './App.css'
    import { Routes, Route } from "react-router-dom";
    import { ToastContainer } from "react-toastify";
    import SignIn from './pages/user/SignIn'
    import SignUp from './pages/user/SignUp'
    import AdminSidebar from "./pages/admin/AdminSidebar";
    import AdminHelpSupport from "./pages/admin/AdminHelpSupport";
    import AdminDashboard from "./pages/admin/AdminDashboard";
    import HomePage from './pages/user/HomePage';
    import UserDashboard from './pages/user/UserDashboard';
    import AdminPayments from './pages/admin/AdminPayments'

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

    function App() {
      return (
        <>
    <Routes>
      {/* Public routes  */}
      <Route path='/signup' element={<SignUp />} />
      <Route path='/signin' element={<SignIn />} />
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<HomePage />} />

      {/* User routes */}
      <Route path='/user' >
      <Route path='dashboard' element={<UserDashboard />} />
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
