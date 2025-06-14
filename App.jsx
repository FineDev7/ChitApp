import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, Users, TrendingUp, Calendar, DollarSign } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';


const ChitManagementSystem = () => {
  // Initialize members
  const initializeMembers = () => {
    const members = [];
    for (let i = 1; i <= 25; i++) {
      members.push({
        id: i,
        name: `Member ${i}`,
        phone: `98765432${String(i).padStart(2, '0')}`,
        address: `Address ${i}, Kanayannur, Kerala`,
        totalPaid: 0,
        outstanding: 0
      });
    }
    return members;
  };


  // Initialize payment data
  const initializePayments = () => {
    const payments = {};
    for (let month = 1; month <= 26; month++) {
      payments[month] = {};
      for (let member = 1; member <= 25; member++) {
        payments[month][member] = {
          status: 'unpaid', // 'paid', 'unpaid', 'partial'
          amount: 0,
          paymentDate: '',
          dueDate: `2024-${String(month).padStart(2, '0')}-01`
        };
      }
    }
    return payments;
  };


  const [members, setMembers] = useState(initializeMembers());
  const [payments, setPayments] = useState(initializePayments());
  const [currentMonth, setCurrentMonth] = useState(1);
  const [selectedMember, setSelectedMember] = useState(null);


  // Calculate totals and update member data
  useEffect(() => {
    const updatedMembers = members.map(member => {
      let totalPaid = 0;
      for (let month = 1; month <= 26; month++) {
        if (payments[month][member.id]) {
          totalPaid += payments[month][member.id].amount;
        }
      }
      const expectedTotal = currentMonth * 6000;
      const outstanding = Math.max(0, expectedTotal - totalPaid);
      
      return {
        ...member,
        totalPaid,
        outstanding
      };
    });
    setMembers(updatedMembers);
  }, [payments, currentMonth]);


  const updatePayment = (month, memberId, status, amount = 0, date = '') => {
    setPayments(prev => ({
      ...prev,
      [month]: {
        ...prev[month],
        [memberId]: {
          ...prev[month][memberId],
          status,
          amount: status === 'paid' ? 6000 : amount,
          paymentDate: date || new Date().toISOString().split('T')[0]
        }
      }
    }));
  };


  const updateMemberDetails = (memberId, field, value) => {
    setMembers(prev => prev.map(member => 
      member.id === memberId ? { ...member, [field]: value } : member
    ));
  };


  // Calculate monthly totals for graph
  const getMonthlyData = () => {
    const monthlyData = [];
    for (let month = 1; month <= 26; month++) {
      let totalCollected = 0;
      let paidCount = 0;
      let partialCount = 0;
      let unpaidCount = 0;


      for (let member = 1; member <= 25; member++) {
        const payment = payments[month][member];
        totalCollected += payment.amount;
        
        if (payment.status === 'paid') paidCount++;
        else if (payment.status === 'partial') partialCount++;
        else unpaidCount++;
      }


      monthlyData.push({
        month: `Month ${month}`,
        total: totalCollected,
        paid: paidCount,
        partial: partialCount,
        unpaid: unpaidCount,
        expected: 25 * 6000
      });
    }
    return monthlyData;
  };


  // Get individual member data for graph
  const getMemberData = (memberId) => {
    const memberData = [];
    let cumulative = 0;
    for (let month = 1; month <= 26; month++) {
      cumulative += payments[month][memberId]?.amount || 0;
      memberData.push({
        month: `M${month}`,
        amount: payments[month][memberId]?.amount || 0,
        cumulative: cumulative,
        expected: month * 6000
      });
    }
    return memberData;
  };


  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'partial': return <AlertCircle className="w-5 h-5 text-blue-500" />;
      default: return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };


  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'bg-green-100 border-green-300';
      case 'partial': return 'bg-blue-100 border-blue-300';
      default: return 'bg-red-100 border-red-300';
    }
  };


  const monthlyData = getMonthlyData();
  const currentMonthTotal = monthlyData[currentMonth - 1]?.total || 0;


  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Chit Fund Management System</h1>
        <div className="flex gap-4 text-sm text-gray-600">
          <span>25 Members</span>
          <span>26 Months</span>
          <span>₹6,000/month</span>
          <span>Total Fund: ₹39,00,000</span>
        </div>
      </div>


      {/* Dashboard Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
          <div className="flex items-center">
            <Calendar className="w-8 h-8 text-blue-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Current Month</p>
              <p className="text-2xl font-bold">{currentMonth}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
          <div className="flex items-center">
            <DollarSign className="w-8 h-8 text-green-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Month Collection</p>
              <p className="text-2xl font-bold">₹{currentMonthTotal.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-purple-500">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-purple-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Active Members</p>
              <p className="text-2xl font-bold">25</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-orange-500">
          <div className="flex items-center">
            <TrendingUp className="w-8 h-8 text-orange-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Collection Rate</p>
              <p className="text-2xl font-bold">{Math.round((currentMonthTotal / (25 * 6000)) * 100)}%</p>
            </div>
          </div>
        </div>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Members List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-4">Members</h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {members.map(member => (
                <div 
                  key={member.id}
                  className={`p-3 border rounded cursor-pointer transition-colors ${
                    selectedMember === member.id ? 'bg-blue-50 border-blue-300' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedMember(member.id)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={member.name}
                        onChange={(e) => updateMemberDetails(member.id, 'name', e.target.value)}
                        className="font-medium text-sm w-full border-0 p-0 focus:ring-0"
                        placeholder="Member Name"
                      />
                      <input
                        type="text"
                        value={member.phone}
                        onChange={(e) => updateMemberDetails(member.id, 'phone', e.target.value)}
                        className="text-xs text-gray-600 w-full border-0 p-0 focus:ring-0"
                        placeholder="Phone Number"
                      />
                      <textarea
                        value={member.address}
                        onChange={(e) => updateMemberDetails(member.id, 'address', e.target.value)}
                        className="text-xs text-gray-600 w-full border-0 p-0 focus:ring-0 resize-none"
                        rows="2"
                        placeholder="Address"
                      />
                    </div>
                    <div className="text-right ml-2">
                      <div className="text-xs text-green-600">₹{member.totalPaid.toLocaleString()}</div>
                      {member.outstanding > 0 && (
                        <div className="text-xs text-red-600">Due: ₹{member.outstanding.toLocaleString()}</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>


        {/* Payment Collection Table */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Payment Collection</h2>
              <div className="flex items-center gap-2">
                <label className="text-sm">Month:</label>
                <select 
                  value={currentMonth} 
                  onChange={(e) => setCurrentMonth(parseInt(e.target.value))}
                  className="border rounded px-2 py-1"
                >
                  {[...Array(26)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>Month {i + 1}</option>
                  ))}
                </select>
              </div>
            </div>


            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Member</th>
                    <th className="text-center p-2">Status</th>
                    <th className="text-center p-2">Amount</th>
                    <th className="text-center p-2">Date</th>
                    <th className="text-center p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map(member => {
                    const payment = payments[currentMonth][member.id];
                    return (
                      <tr key={member.id} className={`border-b ${getStatusColor(payment.status)}`}>
                        <td className="p-2 font-medium">{member.name}</td>
                        <td className="p-2 text-center">
                          {getStatusIcon(payment.status)}
                        </td>
                        <td className="p-2 text-center">
                          {payment.status === 'partial' ? (
                            <input
                              type="number"
                              value={payment.amount}
                              onChange={(e) => updatePayment(currentMonth, member.id, 'partial', parseInt(e.target.value) || 0)}
                              className="w-20 text-center border rounded px-1"
                              max="6000"
                            />
                          ) : (
                            <span>₹{payment.amount.toLocaleString()}</span>
                          )}
                        </td>
                        <td className="p-2 text-center">
                          <input
                            type="date"
                            value={payment.paymentDate}
                            onChange={(e) => updatePayment(currentMonth, member.id, payment.status, payment.amount, e.target.value)}
                            className="text-xs border rounded px-1"
                          />
                        </td>
                        <td className="p-2 text-center">
                          <div className="flex gap-1 justify-center">
                            <button
                              onClick={() => updatePayment(currentMonth, member.id, 'paid')}
                              className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
                            >
                              Paid
                            </button>
                            <button
                              onClick={() => updatePayment(currentMonth, member.id, 'partial', 0)}
                              className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
                            >
                              Partial
                            </button>
                            <button
                              onClick={() => updatePayment(currentMonth, member.id, 'unpaid', 0)}
                              className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                            >
                              Unpaid
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>


            <div className="mt-4 p-3 bg-gray-50 rounded">
              <div className="flex justify-between text-sm">
                <span>Expected: ₹{(25 * 6000).toLocaleString()}</span>
                <span>Collected: ₹{currentMonthTotal.toLocaleString()}</span>
                <span>Pending: ₹{((25 * 6000) - currentMonthTotal).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Charts */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Collection Chart */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-4">Monthly Collection Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="total" stroke="#8884d8" name="Collected" />
              <Line type="monotone" dataKey="expected" stroke="#ff7300" name="Expected" strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>


        {/* Individual Member Chart */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Individual Member Progress</h3>
            <select 
              value={selectedMember || 1} 
              onChange={(e) => setSelectedMember(parseInt(e.target.value))}
              className="border rounded px-2 py-1"
            >
              {members.map(member => (
                <option key={member.id} value={member.id}>{member.name}</option>
              ))}
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={getMemberData(selectedMember || 1)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#8884d8" name="Monthly Payment" />
              <Line type="monotone" dataKey="expected" stroke="#ff7300" name="Expected Cumulative" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};


export default ChitManagementSystem;