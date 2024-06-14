import React, { useState } from 'react';
import { Box, Button, Modal, IconButton, Grid, InputAdornment, TextField } from '@mui/material';
import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';
import { FaInfoCircle, FaCalendarAlt, FaUser, FaRegBuilding, FaFileAlt, FaImage } from 'react-icons/fa'; // Importing necessary icons
import { DatePicker } from '@mui/lab'; // Import DatePicker component from MUI lab package

function BlogsContent() {
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({});

  const inputFields = [
    { name: 'title', label: 'Title', type: 'text', icon: <FaInfoCircle /> },
    { name: 'author', label: 'Author', type: 'text', icon: <FaUser /> },
    { name: 'publish_date', label: 'Publish Date', type: 'date', icon: <FaCalendarAlt /> },
    { name: 'category', label: 'Category', type: 'text', icon: <FaRegBuilding /> },
    { name: 'content', label: 'Content', type: 'textarea', icon: <FaFileAlt /> }, // Changed to textarea
    { name: 'image', label: 'Image', type: 'file', icon: <FaImage /> }, // Changed to file input
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
    const newValue = name === 'image' ? files[0] : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = () => {
    // Add your submission logic here
    console.log("Form submitted:", formData);
    handleCloseModal();
  };

  const renderInputFields = () => {
    return inputFields.map((field, index) => (
      <Grid item xs={12} key={index}>
        {field.type === 'date' ? (
          <DatePicker
            disableToolbar
            variant="inline"
            inputVariant="outlined"
            label={field.label}
            fullWidth
            name={field.name}
            value={formData[field.name] || null}
            onChange={(newValue) => setFormData({ ...formData, [field.name]: newValue })}
            renderInput={(params) => <TextField {...params} />}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {field.icon}
                </InputAdornment>
              ),
            }}
          />
        ) : field.type === 'textarea' ? ( // Render textarea for content
          <TextField
            multiline
            rows={4}
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
        ) : field.type === 'file' ? ( // Render file input for image
          <div>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="contained-button-file"
              type="file"
              name={field.name}
              onChange={handleChange}
            />
            <label htmlFor="contained-button-file">
              <Button variant="contained" component="span" startIcon={field.icon}>
                {formData[field.name] ? formData[field.name].name : 'Choose Image'}
              </Button>
            </label>
          </div>
        ) : (
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
        )}
      </Grid>
    ));
  };

  return (
    <div>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleOpenModal}>
          Add Blog
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
            alignItems:
'center',
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
                <h2 id="modal-title">Add Blog</h2>
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
            <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default BlogsContent;
