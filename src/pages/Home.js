import React from 'react';
import '../styles/Home.css';

const Home = () => {
  const role = localStorage.getItem('role'); // Get user role

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <h1>Welcome to the E-Library</h1>
        <p>Access thousands of digital resources — anytime, anywhere.</p>

        <div className="button-group">
          {role === 'admin' && (
            <a href="/upload" className="cta-button">Upload Content</a>
          )}
          <a href="/latest" className="cta-button secondary">Latest Books</a>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Use E-Library?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Vast Collection</h3>
            <p>E-books, journals, videos, and more — all in one place.</p>
          </div>
          <div className="feature-card">
            <h3>Smart Search</h3>
            <p>Quickly find content using filters and recommendations.</p>
          </div>
          <div className="feature-card">
            <h3>Secure & Private</h3>
            <p>Your content and access are protected with role-based permissions.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
