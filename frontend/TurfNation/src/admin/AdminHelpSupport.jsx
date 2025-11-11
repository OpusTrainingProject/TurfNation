import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminHelpSupport = () => {
  const [queries, setQueries] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      concernType: 'BOOKING_RELATED',
      description: 'Unable to complete my booking for the turf. Payment was deducted but booking confirmation was not received. I tried multiple times but the system keeps showing an error. This is very frustrating as I need the booking for tomorrow. Please help resolve this issue urgently.',
      date: '2025-11-10'
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@example.com',
      concernType: 'TURF_RELATED',
      description: 'The turf facilities were not as described on the website. The lighting was insufficient for evening matches and the turf quality was poor with patches of grass missing. The restroom facilities were also not clean. Very disappointed with the overall experience and expect better maintenance.',
      date: '2025-11-09'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.j@example.com',
      concernType: 'PAYMENT_RELATED',
      description: 'Refund not received even after 7 business days of cancellation. Transaction ID: TXN123456789. I have followed up multiple times but getting no response. The customer service team promised the refund would be processed within 5 business days but nothing has been credited to my account yet.',
      date: '2025-11-08'
    }
  ]);

  const handleResolve = (id) => {
    setQueries(queries.filter(q => q.id !== id));
    toast.success('Query marked as resolved!', {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  const getConcernBadge = (type) => {
    const badges = {
      BOOKING_RELATED: { color: 'bg-blue-100 text-blue-700 border-blue-300', icon: '🎫', label: 'Booking' },
      TURF_RELATED: { color: 'bg-green-100 text-green-700 border-green-300', icon: '⚽', label: 'Turf' },
      PAYMENT_RELATED: { color: 'bg-purple-100 text-purple-700 border-purple-300', icon: '💳', label: 'Payment' },
      OTHER: { color: 'bg-gray-100 text-gray-700 border-gray-300', icon: '📋', label: 'Other' }
    };
    return badges[type] || badges.OTHER;
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
                    <tr key={query.id} className="table-row-hover">
                      <td className="px-5 py-6">
                        <span className="text-base font-bold text-gray-900">{index + 1}</span>
                      </td>
                      <td className="px-5 py-6">
                        <div className="flex items-center">
                          <div className="w-11 h-11 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-base mr-3 flex-shrink-0">
                            {query.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-base font-semibold text-gray-900 break-words">{query.name}</span>
                        </div>
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
                          {query.description}
                        </p>
                      </td>
                      <td className="px-5 py-6">
                        <span className="text-base text-gray-600 font-medium whitespace-nowrap">{query.date}</span>
                      </td>
                      <td className="px-5 py-6 text-center">
                        <button
                          onClick={() => handleResolve(query.id)}
                          className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-base font-bold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400"
                        >
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Resolve
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
