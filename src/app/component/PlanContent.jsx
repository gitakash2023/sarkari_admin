import React, { useState } from 'react';
import { Box, Button, Modal, IconButton, Grid, InputAdornment, TextField, MenuItem } from '@mui/material';
import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';
import { FaMoneyBillWave, FaAd, FaNewspaper, FaBook, FaCheckSquare, FaListUl, FaBookOpen, FaRegNewspaper, FaRegListAlt } from 'react-icons/fa';

function PlanContent() {
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({});

  const inputFields = [
    { name: 'price', label: 'Price', type: 'select', options: ['200', '500'], icon: <FaMoneyBillWave /> },
    { name: 'google_ads', label: 'Google Ads', type: 'select', options: ['Yes', 'No'], icon: <FaAd /> },
    { name: 'other_ads', label: 'Other Ads', type: 'select', options: ['Yes', 'No'], icon: <FaAd /> },
    { name: 'old_papers', label: 'Old Papers', type: 'select', options: ['Yes', 'No'], icon: <FaNewspaper /> },
    { name: 'books', label: 'Books', type: 'select', options: ['Yes', 'No'], icon: <FaBook /> },
    { name: 'filtered_job', label: 'Filtered Job', type: 'select', options: [ '3 Filter', '10 Filtered'], icon: <FaCheckSquare /> },
    { name: 'mock_test', label: 'Mock Test', type: 'select', options: ['Yes', 'No'], icon: <FaListUl /> },
    { name: 'notification', label: 'Notification', type: 'select', options: ['Yes', 'No'], icon: <FaBookOpen /> },
    { name: 'all_job', label: 'All Job', type: 'select', options: ['Yes', 'No'], icon: <FaRegNewspaper /> },
    { name: 'admit_card', label: 'Admit Card', type: 'select', options: ['Yes', 'No'], icon: <FaRegListAlt /> },
    { name: 'sarkari_result', label: 'Sarkari Result', type: 'select', options: ['Yes', 'No'], icon: <FaRegListAlt /> },
    { name: 'exam_answer_key', label: 'Exam Answer Key', type: 'select', options: ['Yes', 'No'], icon: <FaRegListAlt /> },
    { name: 'old_free_books', label: 'Old Free Books', type: 'select', options: ['Yes', 'No'], icon: <FaRegListAlt /> },
  ];

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = value === 'Yes' ? true : value === 'No' ? false : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('YOUR_BACKEND_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Data sent to backend:', data);
      handleCloseModal();
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
  };

  const renderInputFields = () => {
    return inputFields.map((field, index) => (
      <Grid item xs={12} key={index}>
        {field.type === 'select' ? (
          <TextField
            select
            fullWidth
            variant="outlined"
            label={field.label}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {field.icon}
                </InputAdornment>
              ),
            }}
          >
            {field.options.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
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
          Add Plan
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
                <h2 id="modal-title">Add Plan</h2>
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

export default PlanContent;
