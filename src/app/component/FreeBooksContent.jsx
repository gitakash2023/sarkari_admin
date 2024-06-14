import React, { useState } from 'react';
import { Box, Button, Modal, IconButton, Grid, InputAdornment, TextField } from '@mui/material';
import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';
import { FaBook, FaRegBuilding, FaFileAlt } from 'react-icons/fa'; 

function FreeBooksContent() {
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [pdfFile, setPdfFile] = useState(null);

  const inputFields = [
    { name: 'name', label: 'Name of Book', type: 'text', icon: <FaBook /> },
    { name: 'category', label: 'Category', type: 'text', icon: <FaRegBuilding /> },
    { name: 'subject', label: 'Subject', type: 'text', icon: <FaRegBuilding /> },
    { name: 'description', label: 'Short Description', type: 'text', icon: <FaFileAlt /> },
  ];

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    // Set value for file input
    if (name === 'pdf') {
      setPdfFile(files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = () => {
    // Add your submission logic here
    console.log("Form submitted:", formData);
    console.log("PDF File:", pdfFile);
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
          Add Free Book
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
                <h2 id="modal-title">Add Free Book</h2>
              </Box>
              <IconButton onClick={handleCloseModal}>
                <CloseIcon />
              </IconButton>
            </Box>
            {/* Form Fields */}
            <Grid container spacing={2}>
              {renderInputFields()}
              {/* File input for PDF */}
              <Grid item xs={12}>
                <input
                  accept="application/pdf"
                  style={{ display: 'none' }}
                  id="contained-button-file"
                  type="file"
                  name="pdf"
                  onChange={handleChange}
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

export default FreeBooksContent;
