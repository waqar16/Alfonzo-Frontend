import React, { useState } from 'react';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import { FiUsers, FiFileText, FiDollarSign, FiSearch, FiCalendar, FiFilter } from 'react-icons/fi';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement } from 'chart.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement);

const AdminDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Alex Johnson', email: 'alex@example.com', role: 'User' },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com', role: 'Admin' },
  ];

  const payments = [
    { id: 1, user: 'John Doe', amount: '$200', status: 'Completed', date: '2024-09-10' },
    { id: 2, user: 'Jane Smith', amount: '$150', status: 'Pending', date: '2024-09-11' },
    { id: 3, user: 'Alex Johnson', amount: '$300', status: 'Completed', date: '2024-09-12' },
  ];

  const handleSearch = (e) => setSearchQuery(e.target.value.toLowerCase());

  const handleRoleChange = (e) => setSelectedRole(e.target.value);

  const handleStatusChange = (e) => setSelectedStatus(e.target.value);

  const filteredUsers = users
    .filter((user) => (selectedRole === 'All' ? true : user.role === selectedRole))
    .filter((user) => user.name.toLowerCase().includes(searchQuery));

  const filteredPayments = payments
    .filter((payment) => (selectedStatus === 'All' ? true : payment.status === selectedStatus))
    .filter((payment) => {
      const paymentDate = new Date(payment.date);
      return paymentDate >= startDate && paymentDate <= endDate;
    });

  const lineChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Active Users',
        data: [12, 19, 3, 5, 2, 3],
        borderColor: '#6366F1',
        backgroundColor: 'rgba(99, 102, 241, 0.3)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'New Registrations',
        data: [8, 10, 12, 15, 10, 7],
        borderColor: '#EC4899',
        backgroundColor: 'rgba(236, 72, 153, 0.3)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'User Growth Over Time',
        font: { size: 18 },
        color: '#374151',
      },
    },
    elements: {
      line: {
        borderWidth: 2,
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(209, 213, 219, 0.2)',
        },
      },
      y: {
        grid: {
          color: 'rgba(209, 213, 219, 0.2)',
        },
      },
    },
  };

  const barChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Registrations by Month',
        data: [5, 10, 15, 20, 25, 30],
        backgroundColor: '#6366F1',
        borderColor: '#6366F1',
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Monthly User Registrations',
        font: { size: 18 },
        color: '#374151',
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(209, 213, 219, 0.2)',
        },
      },
      y: {
        grid: {
          color: 'rgba(209, 213, 219, 0.2)',
        },
      },
    },
  };

  const pieChartData = {
    labels: ['Admin', 'User'],
    datasets: [
      {
        label: 'User Roles',
        data: [2, 2],
        backgroundColor: ['#6366F1', '#EC4899'],
        hoverOffset: 4,
      },
    ],
  };

  const pieChartOptions = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 space-y-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 shadow-lg rounded-lg flex items-center justify-between">
          <div className="flex items-center">
            <FiUsers className="text-4xl text-indigo-600" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-600">Total Users</h3>
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 shadow-lg rounded-lg flex items-center justify-between">
          <div className="flex items-center">
            <FiFileText className="text-4xl text-green-600" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-600">Templates Created</h3>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 shadow-lg rounded-lg flex items-center justify-between">
          <div className="flex items-center">
            <FiDollarSign className="text-4xl text-pink-600" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-600">Revenue</h3>
              <p className="text-2xl font-bold text-gray-900">$1200</p>
            </div>
          </div>
        </div>
      </div>

      {/* Small Grid Charts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 shadow-lg rounded-lg flex flex-col items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-600 mb-4">User Roles</h3>
          <Doughnut data={pieChartData} options={pieChartOptions} />
        </div>
        <div className="bg-white p-6 shadow-lg rounded-lg flex flex-col items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-600 mb-4">Revenue Trend</h3>
          <Line data={lineChartData} options={lineChartOptions} />
        </div>
        <div className="bg-white p-6 shadow-lg rounded-lg flex flex-col items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-600 mb-4">Monthly Registrations</h3>
          <Bar data={barChartData} options={barChartOptions} />
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-8 shadow-lg rounded-lg mb-10">
        <h3 className="text-2xl font-bold text-gray-700 mb-6">Search and Filters</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="border rounded-lg py-2 px-4 w-full"
              value={searchQuery}
              onChange={handleSearch}
            />
            <FiSearch className="absolute top-2 right-2 text-gray-500" />
          </div>
          <div className="relative">
            <select
              className="border rounded-lg py-2 px-4 w-full"
              value={selectedRole}
              onChange={handleRoleChange}
            >
              <option value="All">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
            <FiFilter className="absolute top-2 right-2 text-gray-500" />
          </div>
          <div className="relative">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="border rounded-lg py-2 px-4 w-full"
              placeholderText="Start Date"
            />
            <FiCalendar className="absolute top-2 right-2 text-gray-500" />
          </div>
          <div className="relative">
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              className="border rounded-lg py-2 px-4 w-full"
              placeholderText="End Date"
            />
            <FiCalendar className="absolute top-2 right-2 text-gray-500" />
          </div>
        </div>
      </div>

      {/* Users Section */}
      <div className="bg-white p-8 shadow-lg rounded-lg mb-10">
        <h3 className="text-2xl font-bold text-gray-700 mb-6">Users</h3>
        <table className="min-w-full bg-white border rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left font-semibold text-gray-600">Name</th>
              <th className="py-2 px-4 text-left font-semibold text-gray-600">Email</th>
              <th className="py-2 px-4 text-left font-semibold text-gray-600">Role</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 text-gray-800">{user.name}</td>
                <td className="py-2 px-4 text-gray-800">{user.email}</td>
                <td className="py-2 px-4 text-gray-800">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Payments Section */}
      <div className="bg-white p-8 shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold text-gray-700 mb-6">Recent Payments</h3>
        <table className="min-w-full bg-white border rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left font-semibold text-gray-600">User</th>
              <th className="py-2 px-4 text-left font-semibold text-gray-600">Amount</th>
              <th className="py-2 px-4 text-left font-semibold text-gray-600">Status</th>
              <th className="py-2 px-4 text-left font-semibold text-gray-600">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((payment) => (
              <tr key={payment.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 text-gray-800">{payment.user}</td>
                <td className="py-2 px-4 text-gray-800">{payment.amount}</td>
                <td className="py-2 px-4 text-gray-800">
                  <span
                    className={`px-2 py-1 text-sm font-medium rounded-lg ${
                      payment.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {payment.status}
                  </span>
                </td>
                <td className="py-2 px-4 text-gray-800">{payment.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
