
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import userApi from 'src/utils/axios/axiosConfig';

interface ITransaction {
  amount: number;
  transactionId: string;
  transactionType: 'credit' | 'debit';
  date?: string;
  appointmentId?: string;
}

interface IUserWallet {
  _id: string;
  userId: string;
  balance: number;
  transactions: ITransaction[];
  totalTransactions: number;
  totalPages: number;
  currentPage: number;
}

const UserWallet = () => {
  const [wallet, setWallet] = useState<IUserWallet | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 10; // Items per page

  const userInfo = useSelector((state: any) => state.user.userInfo);

  const fetchWallet = async () => {
    setLoading(true);
    try {
      const res: any = await userApi.get(`/getWalletData/${userInfo._id}?page=${page}&limit=${limit}`);
      setWallet(res.data);
    } catch (err) {
      console.error('Error fetching wallet:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userInfo._id) {
      fetchWallet();
    }
  }, [userInfo._id, page]);

  const handlePrev = () => {
    if (page > 1) setPage(prev => prev - 1);
  };

  const handleNext = () => {
    if (wallet && page < wallet.totalPages) setPage(prev => prev + 1);
  };

  if (loading) return <div>Loading...</div>;
  if (!wallet) return <div>No wallet data found.</div>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">My Wallet</h2>
      <div className="mb-6">
        <p><strong>Balance:</strong> ₹{wallet.balance.toFixed(2)}</p>
      </div>

      <h3 className="text-lg font-semibold mb-2">Transactions</h3>
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">#</th>
            <th className="p-2 border">Transaction ID</th>
            <th className="p-2 border">Type</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Date & Time</th>
          </tr>
        </thead>
        <tbody>
          {wallet.transactions.map((tx, index) => (
            <tr key={tx.transactionId} className="text-center">
              <td className="p-2 border">{(page - 1) * limit + index + 1}</td>
              <td className="p-2 border">
                TXN-{tx.transactionId.slice(-6).toUpperCase()}
              </td>

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
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {wallet.currentPage} of {wallet.totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={page === wallet.totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserWallet;
