import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bell, Search, Palette, X, User, LogOut } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const themeColors = [
  { name: 'Red', value: '#FF0000' },
  { name: 'Cyan', value: '#00FFFF' },
  { name: 'Orange', value: '#FFA500' },
  { name: 'Green', value: '#00FF00' },
];

export default function HealthDashboard() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedColor, setSelectedColor] = useState(themeColors[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false); // State for profile dropdown

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen); // Toggle profile menu

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Running (km)',
        data: [30, 45, 125, 240, 96, 50, 170, 360, 80, 77, 90, 280],
        borderColor: '#4ECDC4',
        tension: 0.4,
      },
      {
        label: 'Calories Burnt',
        data: [300, 350, 400, 380, 450, 420, 500, 480, 550, 520, 600, 580],
        borderColor: '#FF6B6B',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      y: {
        type: 'linear',
        min: 0,
        max: 1000,
        ticks: {
          stepSize: 200,
        },
      },
      x: {
        type: 'category',
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Running and Calories Burnt Over Time',
      },
    },
  };

  const healthMetrics = [
    { label: 'BMI', value: '21', icon: '📊' },
    { label: 'Status', value: 'Healthy', icon: '❤️' },
    { label: 'Running', value: '3km', icon: '🏃' },
    { label: 'Calories Burnt', value: '300', icon: '🔥' },
    { label: 'Weight', value: '80kg', icon: '⚖️' },
  ];

  return (
    <div className={`dashboard ${isDarkMode ? 'dark' : 'light'}`}>
      <header>
  <div className="header-left">
    <h1 style={{ color: selectedColor.value }}>Health Dashboard</h1> {/* Change text color dynamically */}
    <div className="search-container">
      <input type="text" placeholder="Search..." />
      <Search className="search-icon" size={20} />
    </div>
  </div>
  <div className="header-right">
    <div className="notification">
      <Bell className="bell-icon" />
      <span className="notification-count">3</span>
    </div>
    <button onClick={toggleSidebar} className="theme-toggle">
      <Palette size={24} />
    </button>
    <div className="profile">
            <button onClick={toggleProfileMenu} className="profile-button">
              {/* <img src="/placeholder.svg?height=32&width=32" alt="Profile" className="profile-pic" /> */}
              <span>Anshul Singla</span>
            </button>
            {isProfileMenuOpen && (
              <div className="profile-menu">
                <div className="profile-option">
                  <User size={20} />
                  <span>Profile</span>
                </div>
                <div className="profile-option">
                  <LogOut size={20} />
                  <span>Logout</span>
                </div>
              </div>
            )}
    </div>
  </div>
</header>
      <main>
        <div className="health-metrics">
          {healthMetrics.map((metric, index) => (
            <div
              key={index}
              className="metric-card"
              style={{
                backgroundColor: hoveredCard === index ? selectedColor.value : 'inherit',
                transform: hoveredCard === index ? 'scale(1.05)' : 'scale(1)',
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="metric-icon">{metric.icon}</div>
              <h3>{metric.label}</h3>
              <p>{metric.value}</p>
            </div>
          ))}
        </div>
        <div className="chart-container">
          <Line data={chartData} options={chartOptions} />
        </div>
      </main>
      {isSidebarOpen && (
        <div className="theme-sidebar">
          <div className="sidebar-header">
            <h2>Theme Settings</h2>
            <button onClick={toggleSidebar} className="close-button">
              <X size={24} />
            </button>
          </div>
          <div className="theme-options">
            <h3>Choose Mode</h3>
            <div className="mode-options">
              <button
                onClick={() => setIsDarkMode(false)}
                className={`mode-button ${!isDarkMode ? 'active' : ''}`}
              >
                Light
              </button>
              <button
                onClick={() => setIsDarkMode(true)}
                className={`mode-button ${isDarkMode ? 'active' : ''}`}
              >
                Dark
              </button>
            </div>
          </div>
          <div className="color-options">
            <h3>Choose Color</h3>
            {themeColors.map((color) => (
              <div key={color.name} className="color-option">
                <button
                  onClick={() => setSelectedColor(color)}
                  className="color-button"
                  style={{ backgroundColor: color.value }}
                >
                  {selectedColor.name === color.name && (
                    <svg className="check-icon" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
                <span>{color.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      <style jsx>{`
        .dashboard {
          min-height: 100vh;
          font-family: Arial, sans-serif;
          transition: background-color 0.3s, color 0.3s;
        }
        .dark {
          background-color: #1a202c;
          color: white;
        }
        .light {
          background-color: #f7fafc;
          color: #1a202c;
        }
        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          border-bottom: 1px solid #e2e8f0;
        }
        .header-left, .header-right {
          display: flex;
          align-items: center;
        }
        .search-container {
          position: relative;
          margin-left: 1rem;
        }
        .search-container input {
          padding: 0.5rem 1rem 0.5rem 2rem;
          border-radius: 9999px;
          border: 1px solid #e2e8f0;
        }
        .search-icon {
          position: absolute;
          left: 0.5rem;
          top: 50%;
          transform: translateY(-50%);
          color: #718096;
        }
        .notification {
          position: relative;
          margin-right: 1rem;
        }
        .notification-count {
          position: absolute;
          top: -0.5rem;
          right: -0.5rem;
          background-color: #e53e3e;
          color: white;
          font-size: 0.75rem;
          width: 1rem;
          height: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
        }
        .theme-toggle {
          background: none;
          border: none;
          cursor: pointer;
          margin-right: 1rem;
          color: inherit;
        }
        .bell-icon {
          cursor: pointer;
        }
        .profile {
          position: relative;
        }
        .profile-button {
          display: flex;
          align-items: center;
          border: none;
          background: none;
          cursor: pointer;
          color: var(--text-color);
        }
        .profile-pic {
          border-radius: 50%;
          margin-right: 0.5rem;
        }
        .profile-menu {
          position: absolute;
          top: 100%;
          right: 0;
          background-color: grey;
          border-radius: 0.5rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          overflow: hidden;
          z-index: 10;
          color: var(--text-color);
        }
        .profile-option {
          display: flex;
          align-items: center;
          padding: 0.5rem 1rem;
          cursor: pointer;
          transition: background-color 0.3s;
          color: var(--text-color);
        }
        .profile-option:hover {
          background-color: #808080;
        }
        .profile-option svg {
          margin-right: 0.5rem;
        }
        main {
          padding: 2rem;
        }
        .health-metrics {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .metric-card {
          padding: 1.5rem;
          border-radius: 0.5rem;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
          transition: all 0.3s ease;
        }
        .metric-icon {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }
        .metric-card h3 {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }
        .metric-card p {
          font-size: 1.5rem;
          font-weight: 700;
        }
        .chart-container {
          background-color: white;
          padding: 1.5rem;
          border-radius: 0.5rem;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
          height: 400px;
          width: 60%;
          display: flex;
          align-items: centre;
          justify-content: centre;
          margin:0 auto;
        }
        
        .theme-sidebar {
          position: fixed;
          top: 0;
          right: 0;
          width: 300px;
          height: 100vh;
          background-color: #2d3748;
          color: white;
          padding: 2rem;
          box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
          overflow-y: auto;
        }
        .sidebar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        .close-button {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
        }
        .theme-options, .color-options {
          margin-bottom: 2rem;
        }
        .theme-options h3, .color-options h3 {
          margin-bottom: 1rem;
        }
        .mode-options {
          display: flex;
          gap: 1rem;
        }
        .mode-button {
          padding: 0.5rem 1rem;
          border: 1px solid white;
          background: none;
          color: white;
          cursor: pointer;
          border-radius: 0.25rem;
        }
        .mode-button.active {
          background-color: white;
          color: #2d3748;
        }
        .color-option {
          display: flex;
          align-items: center;
          margin-bottom: 0.5rem;
        }
        .color-button {
          width: 2rem;
          height: 2rem;
          border-radius: 9999px;
          border: none;
          margin-right: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .check-icon {
          width: 1rem;
          height: 1rem;
          color: white;
        }
      `}</style>
    </div>
  );
}