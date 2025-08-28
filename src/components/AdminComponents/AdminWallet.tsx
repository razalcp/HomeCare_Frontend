
// import React, { useEffect, useState } from 'react';
// import { adminApi } from 'src/utils/axios/axiosConfig';

// interface ITransaction {
//   amount: number;
//   transactionId: string;
//   transactionType: 'credit' | 'debit';
//   date?: string;
//   appointmentId?: string;
// }

// interface IAdminWallet {
//   _id: string;
//   adminId: string;
//   balance: number;
//   transactions: ITransaction[];
//   totalTransactions: number;
//   createdAt?: string;
//   updatedAt?: string;
// }

// const AdminWallet = () => {
//   const [wallet, setWallet] = useState<IAdminWallet | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterType, setFilterType] = useState('all');
//   const transactionsPerPage = 10;
//   const adminId = "admin";

//   useEffect(() => {
//     const fetchWallet = async () => {
//       try {
//         const res = await adminApi.get(`/getWalletData/${adminId}`, {
//           params: { page: currentPage, limit: transactionsPerPage }
//         });
//         setWallet(res.data);
//       } catch (err) {
//         console.error('Error fetching wallet:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWallet();
//   }, [adminId, currentPage]);

//   const handlePrevious = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   const handleNext = () => {
//     if (wallet && currentPage < Math.ceil(wallet.totalTransactions / transactionsPerPage)) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (!wallet) return <div>No wallet data found.</div>;

//   const totalPages = Math.ceil(wallet.totalTransactions / transactionsPerPage);

//   const filteredTransactions = wallet.transactions.filter((tx) => {
//     const lowerSearch = searchTerm.toLowerCase();
//     const matchesSearch =
//       tx.transactionId.toLowerCase().includes(lowerSearch) ||
//       tx.transactionType.toLowerCase().includes(lowerSearch) ||
//       tx.amount.toString().includes(lowerSearch) ||
//       (tx.date && new Date(tx.date).toLocaleString().toLowerCase().includes(lowerSearch));

//     const matchesFilter = filterType === 'all' || tx.transactionType === filterType;
//     return matchesSearch && matchesFilter;
//   });

//   return (
//     <div className="p-4 max-w-3xl mx-auto">
//       <h2 className="text-xl font-bold mb-4 text-center">Revenue Management</h2>
//       <div className="mb-6 text-center">
//         <p className="text-lg font-semibold">
//           <strong>Balance:</strong> ₹{wallet.balance.toFixed(2)}
//         </p>
//       </div>

//       {/* Filter + Search Controls */}
//       <div className="flex justify-between items-center mb-4 gap-2">
//         <input
//           type="text"
//           placeholder="Search ID, Type, Amount, Date"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="border px-2 py-1 rounded w-full"
//         />
//         <select
//           value={filterType}
//           onChange={(e) => setFilterType(e.target.value)}
//           className="border px-2 py-1 rounded"
//         >
//           <option value="all">All</option>
//           <option value="credit">Credit</option>
//           <option value="debit">Debit</option>
//         </select>
//       </div>

//       <h3 className="text-lg font-semibold mb-2">Transactions</h3>
//       <table className="w-full table-auto border">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="p-2 border">#</th>
//             <th className="p-2 border">Transaction ID</th>
//             <th className="p-2 border">Type</th>
//             <th className="p-2 border">Amount</th>
//             <th className="p-2 border">Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredTransactions.map((tx, index) => (
//             <tr key={tx.transactionId} className="text-center">
//               <td className="p-2 border">
//                 {(currentPage - 1) * transactionsPerPage + index + 1}
//               </td>
//               <td className="p-2 border">
//                 TXN-{tx.transactionId.slice(-6).toUpperCase()}
//               </td>
//               <td className={`p-2 border ${tx.transactionType === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
//                 {tx.transactionType}
//               </td>
//               <td className="p-2 border">₹{tx.amount}</td>
//               <td className="p-2 border">
//                 {tx.date ? new Date(tx.date).toLocaleString() : 'N/A'}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Pagination Controls */}
//       <div className="mt-4 flex justify-center gap-4">
//         <button
//           onClick={handlePrevious}
//           disabled={currentPage === 1}
//           className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
//         >
//           Previous
//         </button>

//         <span className="flex items-center px-2 text-sm">
//           Page {currentPage} of {totalPages}
//         </span>

//         <button
//           onClick={handleNext}
//           disabled={currentPage === totalPages}
//           className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdminWallet;


/////////////////////////////////////////////

import React, { useEffect, useRef, useState } from 'react';
import { adminApi } from 'src/utils/axios/axiosConfig';

interface ITransaction {
  amount: number;
  transactionId: string;
  transactionType: 'credit' | 'debit';
  date?: string;
  appointmentId?: string;
}

interface IAdminWallet {
  _id: string;
  adminId: string;
  balance: number;
  transactions: ITransaction[];
  totalTransactions: number;
  createdAt?: string;
  updatedAt?: string;
}

const AdminWallet = () => {
  const [wallet, setWallet] = useState<IAdminWallet | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const transactionsPerPage = 10;
  const adminId = "admin";

  const fetchWallet = async (page: number, search: string, filter: string) => {
    try {
      setLoading(true);
      const res = await adminApi.get(`/getWalletData/${adminId}`, {
        params: {
          page,
          limit: transactionsPerPage,
          search,
          type: filter !== "all" ? filter : undefined,
        }
      });
      setWallet(res.data);
    } catch (err) {
      console.error('Error fetching wallet:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchWallet(currentPage, searchTerm, filterType);
    }, 1000);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchTerm, currentPage, filterType]);

  const handleClearSearch = () => {
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (wallet && currentPage < Math.ceil(wallet.totalTransactions / transactionsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // if (loading) return <div>Loading...</div>;
  if (!wallet) return <div>No wallet data found.</div>;

  const totalPages = Math.ceil(wallet.totalTransactions / transactionsPerPage);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">Revenue Management</h2>
      <div className="mb-6 text-center">
        <p className="text-lg font-semibold">
          <strong>Balance:</strong> ₹{wallet.balance.toFixed(2)}
        </p>
      </div>

      {/* Search & Filter */}
      <div className="flex justify-between items-center mb-4 gap-2">
        <input
          type="text"
          placeholder="Search ID, Type, Amount, Date"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="border px-2 py-1 rounded w-full"
        />
        <select
          value={filterType}
          onChange={(e) => {
            setFilterType(e.target.value);
            setCurrentPage(1);
          }}
          className="border px-2 py-1 rounded"
        >
          <option value="all">All</option>
          <option value="credit">Credit</option>
          <option value="debit">Debit</option>
        </select>
        {searchTerm && (
          <button
            onClick={handleClearSearch}
            className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
          >
            Clear
          </button>
        )}
      </div>
      {loading && <div className="text-sm text-gray-500 text-center">Loading...</div>}


      {/* Transactions Table */}
      <h3 className="text-lg font-semibold mb-2">Transactions</h3>
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">#</th>
            <th className="p-2 border">Transaction ID</th>
            <th className="p-2 border">Type</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Date</th>
          </tr>
        </thead>
        <tbody>
          {wallet.transactions.map((tx, index) => (
            <tr key={tx.transactionId} className="text-center">
              <td className="p-2 border">{(currentPage - 1) * transactionsPerPage + index + 1}</td>
              <td className="p-2 border">TXN-{tx.transactionId.slice(-6).toUpperCase()}</td>
              <td className={`p-2 border ${tx.transactionType === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                {tx.transactionType}
              </td>
              <td className="p-2 border">₹{tx.amount}</td>
              <td className="p-2 border">{tx.date ? new Date(tx.date).toLocaleString() : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-center gap-4">
        <button onClick={handlePrevious} disabled={currentPage === 1} className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50">
          Previous
        </button>
        <span className="flex items-center px-2 text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNext} disabled={currentPage === totalPages} className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50">
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminWallet;
