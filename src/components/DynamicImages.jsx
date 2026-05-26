import React from 'react';
import { Box } from '@mui/material';

/**
 * Upper side is full logo, bottom size is only logo.
 * Assumes a 1:2 aspect ratio source where top half is Full and bottom is Icon.
 */
export const SplitLogo = ({ isFull, height = 32 }) => {
  return (
    <Box
      sx={{
        height,
        width: isFull ? height * 4 : height,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <img
        src="/logo.png"
        alt="Dholera Logo"
        style={{
          height: height * 2, // Source is twice the display height
          position: 'absolute',
          top: isFull ? 0 : -height, // Show top half if full, bottom if not
          left: '50%',
          transform: 'translateX(-50%)',
          objectFit: 'contain'
        }}
      />
    </Box>
  );
};

/**
 * Main image which contains 3 sub images.
 * Assumes a 1:3 aspect ratio source (Vertical stack).
 */
export const TripleSplitImage = ({ index, height = 300 }) => {
  return (
    <Box
      sx={{
        height,
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
        borderRadius: 2,
        boxShadow: 2
      }}
    >
      <img
        src="/sub1.png"
        alt={`Section ${index}`}
        style={{
          width: '100%',
          height: height * 3, // Source is 3x the display height
          position: 'absolute',
          top: -(index - 1) * height,
          left: 0,
          objectFit: 'cover'
        }}
      />
    </Box>
  );
};
