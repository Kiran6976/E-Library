import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Upload.css';
import { useNavigate } from 'react-router-dom';

const Upload = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    type: '',
    publicationDate: '',
    keywords: ''
  });

  const [file, setFile] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
      setUnauthorized(true);
    }
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handleCoverImageChange = (e) => setCoverImage(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please upload the book file.");

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    data.append("file", file);
    if (coverImage) data.append("coverImage", coverImage);

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/content/upload", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });
      alert("Upload successful!");
      navigate('/latest');
    } catch (err) {
      console.error("Upload error:", err.response?.data || err.message);
      alert(`Upload failed: ${err.response?.data?.message || err.message}`);
    }
  };

  if (unauthorized) {
    return (
      <div className="unauthorized-message">
        <h2>Access Denied</h2>
        <p>Only administrators can upload content.</p>
        <button onClick={() => navigate('/')}>Return Home</button>
      </div>
    );
  }

  return (
    <div className="upload-container">
      <h2>📤 Upload Digital Content</h2>
      <form onSubmit={handleSubmit} className="upload-form">
        <input name="title" placeholder="Title" onChange={handleChange} required />
        <input name="author" placeholder="Author" onChange={handleChange} required />
        <textarea name="description" placeholder="Description" onChange={handleChange} />
        <select name="type" onChange={handleChange} required>
          <option value="">Select Type</option>
          <option value="ebook">E-Book</option>
          <option value="audio">Audio</option>
          <option value="video">Video</option>
        </select>
        <input type="date" name="publicationDate" onChange={handleChange} />
        <input name="keywords" placeholder="Comma-separated keywords" onChange={handleChange} />

        <label>📚 Upload Book File</label>
        <input type="file" accept=".pdf,.mp3,.mp4,.epub" onChange={handleFileChange} required />

        <label>🖼️ Upload Cover Image</label>
        <input type="file" accept="image/*" onChange={handleCoverImageChange} />

        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default Upload;
