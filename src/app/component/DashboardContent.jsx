import React from 'react';
import { Grid, Typography, Card, CardContent } from '@mui/material';

function DashboardContent() {
  // Sample static data arrays
  const jobsData = ['Job 1', 'Job 2', 'Job 3']; // Example: Array of jobs
  const admitCardsData = ['Admit Card 1', 'Admit Card 2']; // Example: Array of admit cards
  const resultsData = ['Result 1', 'Result 2', 'Result 3', 'Result 4']; // Example: Array of results
  const blogsData = ['Blog 1', 'Blog 2', 'Blog 3', 'Blog 4', 'Blog 5']; // Example: Array of blogs

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      {/* Metrics Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: '#1a237e', color: '#fff' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Jobs Posted
              </Typography>
              <Typography variant="h3" component="div">
                {jobsData.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: '#006064', color: '#fff' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Admit Cards
              </Typography>
              <Typography variant="h3" component="div">
                {admitCardsData.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: '#004d40', color: '#fff' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Results
              </Typography>
              <Typography variant="h3" component="div">
                {resultsData.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: '#4a148c', color: '#fff' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Blogs
              </Typography>
              <Typography variant="h3" component="div">
                {blogsData.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Activities Section */}
      <Grid container spacing={3} style={{ marginTop: '2rem' }}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Activities
              </Typography>
              {/* Example of a list of recent activities */}
              <ul>
                <li>User John Doe registered</li>
                <li>User Jane Smith logged in</li>
                <li>New product added to inventory</li>
              </ul>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default DashboardContent;
