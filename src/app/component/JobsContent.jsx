"use client"
import React, { useState } from 'react';
import { Box, Button, Modal, IconButton, Grid, InputAdornment, TextField } from '@mui/material';
import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';
import { FaInfoCircle } from 'react-icons/fa';
import dynamic from 'next/dynamic';
import DOMPurify from 'dompurify';
import parse from 'html-react-parser';
import 'react-quill/dist/quill.snow.css';

const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });

function JobsContent() {
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [jsonData, setJsonData] = useState(null); // State to store JSON data for display

  const inputFields = [
    { name: 'title', label: 'Title', type: 'text', icon: <FaInfoCircle /> },
    { name: 'content', label: 'Content', type: 'editor' },
  ];

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      [{ align: [] }],
      [{ color: [] }],
      ['code-block'],
      ['clean'],
    ],
  };

  const quillFormats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'align',
    'color',
    'code-block',
  ];

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditorChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    // Sanitize the HTML content
    const sanitizedHTML = DOMPurify.sanitize(formData.content || '');
    
    // Create JSON data
    const jsonData = {
      title: formData.title || '',
      content: sanitizedHTML,
    };

    // Store JSON data in local storage
    localStorage.setItem('jobFormData', JSON.stringify(jsonData));

    // Update state to display JSON data
    setJsonData(jsonData);
    console.log(jsonData)

    // Close the modal
    handleCloseModal();
  };

  const renderInputFields = () => {
    return inputFields.map((field, index) => (
      <Grid item xs={12} key={index}>
        {field.type === 'text' ? (
          <TextField
            fullWidth
            name={field.name}
            label={field.label}
            type={field.type}
            value={formData[field.name] || ''}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {field.icon}
                </InputAdornment>
              ),
            }}
          />
        ) : field.type === 'editor' ? (
          <div style={{ width: '100%', height: '400px' }}>
            <QuillEditor
              value={formData[field.name] || ''}
              onChange={(value) => handleEditorChange(field.name, value)}
              modules={quillModules}
              formats={quillFormats}
              style={{ height: '90%' }}
            />
          </div>
        ) : null}
      </Grid>
    ));
  };

  return (
    <div>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleOpenModal}>
          Add Jobs
        </Button>
      </Box>
      {/* Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)', // Center the modal vertically and horizontally
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            width: { xs: '95%', sm: '90%', md: '80%' }, // Responsive width
            height: { xs: '95%', sm: '85%', md: '80%' }, // Responsive height
            maxHeight: '90%',
            overflowY: 'auto',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <h2 id="modal-title">Add Jobs</h2>
            </Box>
            <IconButton onClick={handleCloseModal}>
              <CloseIcon />
            </IconButton>
          </Box>
          {/* Form Fields */}
          <Grid container spacing={2}>
            {renderInputFields()}
          </Grid>
          {/* Submit Button */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
      {/* Display Title and Content */}
      {jsonData && (
        <Box mt={4}>
          <h2>Entered Title:</h2>
          <div>{jsonData.title}</div>
          <h2>Entered Content:</h2>
          <div>{parse(DOMPurify.sanitize(jsonData.content || ''))}</div>
        </Box>
      )}
    </div>
  );
}

export default JobsContent;
