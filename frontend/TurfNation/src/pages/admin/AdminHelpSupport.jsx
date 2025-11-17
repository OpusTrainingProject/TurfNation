// // src/pages/admin/AdminHelpSupport.jsx
// import { useState, useEffect } from 'react';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { getActiveConcerns, markAsResolved } from '../../services/helpSupportService';

// const AdminHelpSupport = () => {
//   const [queries, setQueries] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [resolvingId, setResolvingId] = useState(null);

//   // Fetch active concerns on component mount
//   useEffect(() => {
//     fetchActiveConcerns();
//   }, []);

//   // Function to fetch all active concerns from backend
//   const fetchActiveConcerns = async () => {
//     try {
//       setLoading(true);
//       const data = await getActiveConcerns();
//       setQueries(data);
//       console.log('Active concerns fetched:', data);
//     } catch (error) {
//       console.error('Error fetching concerns:', error);
//       toast.error('❌ Failed to load support queries');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Function to handle resolve button click
//   const handleResolve = async (id) => {
//     try {
//       setResolvingId(id);
      
//       // Call backend API to mark as resolved
//       await markAsResolved(id);
      
//       // Remove from local state after successful resolve
//       setQueries(queries.filter(q => q.helpsupportId !== id));
      
//       toast.success('✅ Query marked as resolved!', {
//         position: 'top-right',
//         autoClose: 3000,
//       });
//     } catch (error) {
//       console.error('Error resolving concern:', error);
//       const errorMessage = error.response?.data?.message || 'Failed to resolve query';
//       toast.error(`❌ ${errorMessage}`);
//     } finally {
//       setResolvingId(null);
//     }
//   };

//   // Function to get badge styling based on concern type
//   const getConcernBadge = (type) => {
//     const badges = {
//       BOOKING_RELATED: { color: 'bg-blue-100 text-blue-700 border-blue-300', icon: '🎫', label: 'Booking' },
//       TURF_RELATED: { color: 'bg-green-100 text-green-700 border-green-300', icon: '⚽', label: 'Turf' },
//       PAYMENT_RELATED: { color: 'bg-purple-100 text-purple-700 border-purple-300', icon: '💳', label: 'Payment' },
//       OTHER: { color: 'bg-gray-100 text-gray-700 border-gray-300', icon: '📋', label: 'Other' }
//     };
//     return badges[type] || badges.OTHER;
//   };

//   // Function to format date
//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-IN', { 
//       year: 'numeric', 
//       month: '2-digit', 
//       day: '2-digit' 
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-emerald-50 py-8 px-6">
//       <style>{`
//         @keyframes slideDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
//         @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
//         .animate-slideDown { animation: slideDown 0.5s ease-out; }
//         .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
//         .table-row-hover:hover { background-color: rgba(16, 185, 129, 0.05); transition: all 0.2s ease; }
//         .description-cell { white-space: pre-wrap; word-wrap: break-word; line-height: 1.7; }
//       `}</style>

//       <ToastContainer />

//       <div className="w-full max-w-full mx-auto">
//         {/* Header Section */}
//         <div className="mb-6 animate-slideDown">
//           <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
//             <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-500 px-8 py-5">
//               <h1 className="text-3xl font-bold text-white flex items-center">
//                 <svg className="w-8 h-8 mr-3" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C17.802 8.249 18 9.1 18 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-4.374-1.85l1.33-1.33a3.996 3.996 0 002.639.775 3.996 3.996 0 001.24-.197zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd" />
//                 </svg>
//                 Active Support Queries
//               </h1>
//               <p className="text-green-100 mt-2 text-base">Manage and resolve customer support requests</p>
//             </div>
//           </div>
//         </div>

//         {/* Loading State */}
//         {loading ? (
//           <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-16 text-center animate-fadeIn">
//             <svg className="animate-spin h-12 w-12 mx-auto text-green-500 mb-4" fill="none" viewBox="0 0 24 24">
//               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//             </svg>
//             <p className="text-gray-600 font-semibold text-lg">Loading support queries...</p>
//           </div>
//         ) : (
//           /* Table Section */
//           <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden animate-fadeIn">
//             <table className="w-full">
//               <thead>
//                 <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
//                   <th className="px-5 py-4 text-left text-sm font-black text-gray-700 uppercase tracking-wider" style={{width: '5%'}}>Sr. No</th>
//                   <th className="px-5 py-4 text-left text-sm font-black text-gray-700 uppercase tracking-wider" style={{width: '12%'}}>Name</th>
//                   <th className="px-5 py-4 text-left text-sm font-black text-gray-700 uppercase tracking-wider" style={{width: '16%'}}>Email</th>
//                   <th className="px-5 py-4 text-left text-sm font-black text-gray-700 uppercase tracking-wider" style={{width: '12%'}}>Concern Type</th>
//                   <th className="px-5 py-4 text-left text-sm font-black text-gray-700 uppercase tracking-wider" style={{width: '40%'}}>Description</th>
//                   <th className="px-5 py-4 text-left text-sm font-black text-gray-700 uppercase tracking-wider" style={{width: '8%'}}>Date</th>
//                   <th className="px-5 py-4 text-center text-sm font-black text-gray-700 uppercase tracking-wider" style={{width: '7%'}}>Action</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {queries.length > 0 ? (
//                   queries.map((query, index) => {
//                     const badge = getConcernBadge(query.concernType);
//                     return (
//                       <tr key={query.id} className="table-row-hover">
//                         <td className="px-5 py-6">
//                           <span className="text-base font-bold text-gray-900">{index + 1}</span>
//                         </td>
//                         <td className="px-5 py-6">
//                           <div className="flex items-center">
//                             {/* <div className="w-11 h-11 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-base mr-3 flex-shrink-0">
                             
//                             </div> */}
//                              {/* {query.name?.charAt(0).toUpperCase() || 'U'} */}
//                                     {/* {query.name} */}
//                             <span className="text-base font-semibold text-gray-900 break-words">{query.name}</span>
//                           </div>
//                         </td>
//                         <td className="px-5 py-6">
//                           <a href={`mailto:${query.email}`} className="text-base text-blue-600 hover:text-blue-800 hover:underline font-medium break-all">
//                             {query.email}
//                           </a>
//                         </td>
//                         <td className="px-5 py-6">
//                           <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-bold border ${badge.color}`}>
//                             <span className="mr-1.5 text-base">{badge.icon}</span>
//                             {badge.label}
//                           </span>
//                         </td>
//                         <td className="px-5 py-6">
//                           <p className="text-base text-gray-700 description-cell">
//                             {query.message || query.description || 'No description provided'}
//                           </p>
//                         </td>
//                         <td className="px-5 py-6">
//                           <span className="text-base text-gray-600 font-medium whitespace-nowrap">
//                             {formatDate(query.createdOn || query.date)}
//                           </span>
//                         </td>
//                         <td className="px-5 py-6 text-center">
//                           <button
//                             onClick={() => handleResolve(query.helpsupportId)}
//                             disabled={resolvingId === query.id}
//                             className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-base font-bold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
//                           >
//                             {resolvingId === query.id ? (
//                               <>
//                                 <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
//                                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                 </svg>
//                                 Resolving...
//                               </>
//                             ) : (
//                               <>
//                                 <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                                   <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                                 </svg>
//                                 Resolve
//                               </>
//                             )}
//                           </button>
//                         </td>
//                       </tr>
//                     );
//                   })
//                 ) : (
//                   <tr>
//                     <td colSpan="7" className="px-6 py-16 text-center">
//                       <div className="flex flex-col items-center">
//                         <svg className="w-20 h-20 text-green-300 mb-4" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                         </svg>
//                         <p className="text-green-600 font-bold text-2xl">All Clear! 🎉</p>
//                         <p className="text-gray-500 text-base mt-2">No active queries at the moment</p>
//                       </div>
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminHelpSupport;


// src/pages/admin/AdminHelpSupport.jsx
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminHelpSupport = () => {
  // Hardcoded initial queries
  const [queries, setQueries] = useState([
    {
      helpsupportId: 1,
      name: 'Rahul',
      email: 'rahula@example.com',
      concernType: 'BOOKING_RELATED',
      message: 'I booked a turf for tomorrow but I need to reschedule it to next week. How can I modify my booking?',
      createdOn: '2025-11-15'
    },
    {
      helpsupportId: 2,
      name: 'Priya',
      email: 'priya@example.com',
      concernType: 'PAYMENT_RELATED',
      message: 'Payment was deducted from my account but booking confirmation is not received. Transaction ID: pay_ABC123XYZ',
      createdOn: '2025-11-16'
    },
    {
      helpsupportId: 3,
      name: 'Amit',
      email: 'amit@example.com',
      concernType: 'TURF_RELATED',
      message: 'The turf at Green Valley Sports Complex does not have floodlights as mentioned in the description. Please update the facilities.',
      createdOn: '2025-11-17'
    },
    {
      helpsupportId: 4,
      name: 'Sneha Reddy',
      email: 'sneha.reddy@example.com',
      concernType: 'OTHER',
      message: 'Can you add a feature to book turfs for tournaments? We need to book for 3 consecutive days.',
      createdOn: '2025-11-17'
    }
  ]);

  const [resolvingId, setResolvingId] = useState(null);

  // Function to handle resolve button click
  const handleResolve = (id) => {
    setResolvingId(id);
    
    // Simulate API call delay
    setTimeout(() => {
      // Remove from local state
      setQueries(queries.filter(q => q.helpsupportId !== id));
      
      toast.success('✅ Query marked as resolved!', {
        position: 'top-right',
        autoClose: 3000,
      });
      
      setResolvingId(null);
    }, 500);
  };

  // Function to get badge styling based on concern type
  const getConcernBadge = (type) => {
    const badges = {
      BOOKING_RELATED: { color: 'bg-blue-100 text-blue-700 border-blue-300', icon: '🎫', label: 'Booking' },
      TURF_RELATED: { color: 'bg-green-100 text-green-700 border-green-300', icon: '⚽', label: 'Turf' },
      PAYMENT_RELATED: { color: 'bg-purple-100 text-purple-700 border-purple-300', icon: '💳', label: 'Payment' },
      OTHER: { color: 'bg-gray-100 text-gray-700 border-gray-300', icon: '📋', label: 'Other' }
    };
    return badges[type] || badges.OTHER;
  };

  // Function to format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-emerald-50 py-8 px-6">
      <style>{`
        @keyframes slideDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-slideDown { animation: slideDown 0.5s ease-out; }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
        .table-row-hover:hover { background-color: rgba(16, 185, 129, 0.05); transition: all 0.2s ease; }
        .description-cell { white-space: pre-wrap; word-wrap: break-word; line-height: 1.7; }
      `}</style>

      <ToastContainer />

      <div className="w-full max-w-full mx-auto">
        {/* Header Section */}
        <div className="mb-6 animate-slideDown">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-500 px-8 py-5">
              <h1 className="text-3xl font-bold text-white flex items-center">
                <svg className="w-8 h-8 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C17.802 8.249 18 9.1 18 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-4.374-1.85l1.33-1.33a3.996 3.996 0 002.639.775 3.996 3.996 0 001.24-.197zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd" />
                </svg>
                Active Support Queries
              </h1>
              <p className="text-green-100 mt-2 text-base">Manage and resolve customer support requests</p>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden animate-fadeIn">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                <th className="px-5 py-4 text-left text-sm font-black text-gray-700 uppercase tracking-wider" style={{width: '5%'}}>Sr. No</th>
                <th className="px-5 py-4 text-left text-sm font-black text-gray-700 uppercase tracking-wider" style={{width: '12%'}}>Name</th>
                <th className="px-5 py-4 text-left text-sm font-black text-gray-700 uppercase tracking-wider" style={{width: '16%'}}>Email</th>
                <th className="px-5 py-4 text-left text-sm font-black text-gray-700 uppercase tracking-wider" style={{width: '12%'}}>Concern Type</th>
                <th className="px-5 py-4 text-left text-sm font-black text-gray-700 uppercase tracking-wider" style={{width: '40%'}}>Description</th>
                <th className="px-5 py-4 text-left text-sm font-black text-gray-700 uppercase tracking-wider" style={{width: '8%'}}>Date</th>
                <th className="px-5 py-4 text-center text-sm font-black text-gray-700 uppercase tracking-wider" style={{width: '7%'}}>Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {queries.length > 0 ? (
                queries.map((query, index) => {
                  const badge = getConcernBadge(query.concernType);
                  return (
                    <tr key={query.helpsupportId} className="table-row-hover">
                      <td className="px-5 py-6">
                        <span className="text-base font-bold text-gray-900">{index + 1}</span>
                      </td>
                      <td className="px-5 py-6">
                        <span className="text-base font-semibold text-gray-900 break-words">{query.name}</span>
                      </td>
                      <td className="px-5 py-6">
                        <a href={`mailto:${query.email}`} className="text-base text-blue-600 hover:text-blue-800 hover:underline font-medium break-all">
                          {query.email}
                        </a>
                      </td>
                      <td className="px-5 py-6">
                        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-bold border ${badge.color}`}>
                          <span className="mr-1.5 text-base">{badge.icon}</span>
                          {badge.label}
                        </span>
                      </td>
                      <td className="px-5 py-6">
                        <p className="text-base text-gray-700 description-cell">
                          {query.message}
                        </p>
                      </td>
                      <td className="px-5 py-6">
                        <span className="text-base text-gray-600 font-medium whitespace-nowrap">
                          {formatDate(query.createdOn)}
                        </span>
                      </td>
                      <td className="px-5 py-6 text-center">
                        <button
                          onClick={() => handleResolve(query.helpsupportId)}
                          disabled={resolvingId === query.helpsupportId}
                          className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-base font-bold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                          {resolvingId === query.helpsupportId ? (
                            <>
                              <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Resolving...
                            </>
                          ) : (
                            <>
                              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              Resolve
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center">
                      <svg className="w-20 h-20 text-green-300 mb-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <p className="text-green-600 font-bold text-2xl">All Clear! 🎉</p>
                      <p className="text-gray-500 text-base mt-2">No active queries at the moment</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHelpSupport;

