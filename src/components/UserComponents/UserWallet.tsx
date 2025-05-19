import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
  createdAt?: string;
  updatedAt?: string;
}

const UserWallet = () => {
  const [wallet, setWallet] = useState<IUserWallet | null>(null);
  const [loading, setLoading] = useState(true);
  const userInfo = useSelector((state: any) => state.user.userInfo);

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const res: any = await userApi.get(`/getWalletData/${userInfo._id}`);
        setWallet(res.data);
      } catch (err) {
        console.error('Error fetching wallet:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWallet();
  }, [userInfo._id]);

  if (loading) return <div>Loading...</div>;
  if (!wallet) return <div>No wallet data found.</div>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">My Wallet</h2>
      <div className="mb-6">
        {/* <p><strong>User ID:</strong> {wallet.userId}</p> */}
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
            {/* <th className="p-2 border">Appointment ID</th> */}
            <th className="p-2 border">Date & Time</th>
          </tr>
        </thead>
        <tbody>
          {wallet.transactions.map((tx, index) => (
            <tr key={tx.transactionId} className="text-center">
              <td className="p-2 border">{index + 1}</td>
              <td className="p-2 border">{tx.transactionId}</td>
              <td className={`p-2 border ${tx.transactionType === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                {tx.transactionType}
              </td>
              <td className="p-2 border">₹{tx.amount}</td>
              {/* <td className="p-2 border">{tx.appointmentId || 'N/A'}</td> */}
              <td className="p-2 border">{tx.date ? new Date(tx.date).toLocaleString() : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserWallet;
