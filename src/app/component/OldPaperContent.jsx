import React, { useState } from 'react';
import { Box, Button, Modal, IconButton, Grid, InputAdornment, TextField } from '@mui/material';
import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';
import { FaNewspaper, FaBook, FaFileAlt } from 'react-icons/fa'; // Importing necessary icons

function OldPaperContent() {
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [pdfFile, setPdfFile] = useState(null);

  const inputFields = [
    { name: 'post_title', label: 'Post Title', type: 'text', icon: <FaNewspaper /> },
    { name: 'category', label: 'Category', type: 'text', icon: <FaBook /> },
    { name: 'subject', label: 'Subject', type: 'text', icon: <FaBook /> },
    { name: 'paper_year', label: 'Paper Year', type: 'text', icon: <FaNewspaper /> },
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

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setPdfFile(selectedFile);
  };

  const handleSubmit = () => {
    // Add your submission logic here
    const formDataWithFile = { ...formData, pdf_file: pdfFile };
    console.log("Form submitted:", formDataWithFile);
    handleCloseModal();
  };

  const renderInputFields = () => {
    return inputFields.map((field, index) => (
      <Grid item xs={12} key={index}>
        <TextField
          variant="outlined"
          fullWidth
          name={field.name}
          value={formData[field.name] || ''}
          onChange={handleChange}
          label={field.label}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {field.icon}
              </InputAdornment>
            ),
          }}
        />
      </Grid>
    ));
  };

  return (
    <div>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleOpenModal}>
          Add Old Paper
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
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              width: '90%',
              maxHeight: '90%',
              overflowY: 'auto',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <h2 id="modal-title">Add Old Paper</h2>
              </Box>
              <IconButton onClick={handleCloseModal}>
                <CloseIcon />
              </IconButton>
            </Box>
            {/* Form Fields */}
            <Grid container spacing={2}>
              {renderInputFields()}
              {/* File Input */}
              <Grid item xs={12}>
                <input
                  type="file"
                  accept=".pdf"
                  id="contained-button-file"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
                <label htmlFor="contained-button-file">
                  <Button variant="contained" component="span" startIcon={<FaFileAlt />}>
                    {pdfFile ? pdfFile.name : 'Choose PDF'}
                  </Button>
                </label>
              </Grid>
            </Grid>
            {/* Submit Button */}
            <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default OldPaperContent;
