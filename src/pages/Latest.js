import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Library.css';
import { FaBook, FaFilePdf, FaHeadphones, FaVideo } from 'react-icons/fa';

const Latest = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/content/all')
      .then(res => {
        const sorted = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setBooks(sorted.slice(0, 10));
      })
      .catch(err => console.error(err));
  }, []);

  const getFileIcon = (type) => {
    switch (type) {
      case 'ebook':
        return <FaFilePdf size={24} color="#d9534f" />;
      case 'audio':
        return <FaHeadphones size={24} color="#5bc0de" />;
      case 'video':
        return <FaVideo size={24} color="#5cb85c" />;
      default:
        return <FaBook size={24} color="#337ab7" />;
    }
  };

  return (
    <div className="library-container">
      <h2>📚 Latest Uploaded Books</h2>
      <div className="library-grid">
        {books.map((item) => (
          <div key={item._id} className="book-card">
            {/* ✅ Display cover image if available */}
            {item.coverImageUrl && (
              <img
                src={`http://localhost:5000/${item.coverImageUrl}`}
                alt="cover"
                className="cover-image"
              />
            )}

            {/* File Type Icon */}
            <div className="book-icon">{getFileIcon(item.type)}</div>

            {/* Book Info */}
            <h3>{item.title}</h3>
            <p><strong>Author:</strong> {item.author}</p>
            <p><strong>Type:</strong> {item.type}</p>
            <p><strong>Uploaded By:</strong> {item.uploadedBy?.name || 'Unknown'}</p>
            <p><strong>Keywords:</strong> {item.metadata?.keywords?.join(', ') || 'N/A'}</p>

            {/* Download Link */}
            <a
              href={`http://localhost:5000/${item.fileUrl}`}
              target="_blank"
              rel="noreferrer"
              className="view-link"
            >
              📥 View / Download
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Latest;
