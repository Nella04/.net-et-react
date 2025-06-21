import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
} from "@mui/material";

const reviewsData = [
  { label: "Positive", value: 70 },
  { label: "Neutral", value: 20 },
  { label: "Negative", value: 10 },
];

const CustomerReviews = () => {
  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: 3,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
        bgcolor: "#f1f1f1", width : "770px", height : "100px", marginLeft : "50px"
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Customer Reviews
        </Typography>

        <Box display="flex" justifyContent="space-between">
          {reviewsData.map((review, index) => (
            <Box key={index} sx={{ width: "32%", mb: 2 }}>
              <Box display="flex" justifyContent="space-between" mb={0.5}>
                <Typography variant="body2" color="text.secondary">
                  {review.label}
                </Typography>
                <Typography variant="body2" fontWeight="bold">
                  {review.value}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={review.value}
                sx={{
                  height: 14,
                  borderRadius: 5,
                  backgroundColor: "#f0f0f0",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor:
                      review.label === "Positive"
                        ? "#4caf50"
                        : review.label === "Neutral"
                        ? "#ffb300"
                        : "#f44336",
                  },
                }}
              />
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default CustomerReviews;