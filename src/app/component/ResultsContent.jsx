import React, { useState } from 'react';
import { Box, Button, Modal, IconButton, Grid, InputAdornment, TextField } from '@mui/material';
import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';
import { FaInfoCircle, FaCalendarAlt, FaLink } from 'react-icons/fa'; // Importing necessary icons
import { DatePicker } from '@mui/lab'; // Import DatePicker component from MUI lab package

function ResultsContent() {
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({});

  const inputFields = [
    { name: 'publish_date', label: 'Publish Date', type: 'date', icon: <FaCalendarAlt /> },
    { name: 'exam_name', label: 'Exam Name', type: 'text', icon: <FaInfoCircle /> },
    { name: 'description', label: 'Description', type: 'text', icon: <FaInfoCircle /> },
    { name: 'result_link', label: 'Result Link', type: 'text', icon: <FaLink /> },
 
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
          Add Result
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
                <h2 id="modal-title">Add Result</h2>
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

export default ResultsContent;
