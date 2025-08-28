
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { doctorApi } from 'src/utils/axios/axiosConfig';

interface ITransaction {
  amount: number;
  transactionId: string;
  transactionType: 'credit' | 'debit';
  date?: string;
  appointmentId?: string;
}

interface IDoctorWallet {
  _id: string;
  doctorId: string;
  balance: number;
  transactions: ITransaction[];
  createdAt?: string;
  updatedAt?: string;
}

const DoctorWallet = () => {
  const [wallet, setWallet] = useState<IDoctorWallet | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const transactionsPerPage = 10;

  const doctorInfo = useSelector((state: any) => state.doctor.doctorInfo);

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        setLoading(true);
        const res: any = await doctorApi.get(`/getWalletData/${doctorInfo._id}`, {
          params: { page: currentPage, limit: transactionsPerPage }
        });
        setWallet(res.data.wallet);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error('Error fetching wallet:', err);
      } finally {
        setLoading(false);
      }
    };

    if (doctorInfo?._id) fetchWallet();
  }, [doctorInfo._id, currentPage]);

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
            <th className="p-2 border">Date</th>
          </tr>
        </thead>
        <tbody>
          {wallet.transactions.map((tx, index) => (
            <tr key={tx.transactionId} className="text-center">
              <td className="p-2 border">{(currentPage - 1) * transactionsPerPage + index + 1}</td>
              <td className="p-2 border"> TXN-{tx.transactionId.slice(-6).toUpperCase()}</td>
              <td className={`p-2 border ${tx.transactionType === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                {tx.transactionType}
              </td>
              <td className="p-2 border">₹{tx.amount}</td>
              <td className="p-2 border">{tx.date ? new Date(tx.date).toLocaleString() : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-2 bg-gray-200 rounded"
          >
            Previous
          </button>
          <span className="mx-2">Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 mx-2 bg-gray-200 rounded"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default DoctorWallet;

