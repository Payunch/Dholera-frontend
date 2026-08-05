import React from'react';
import Image from'next/image';

/**
 * Upper side is full logo, bottom size is only logo.
 * Assumes a 1:2 aspect ratio source where top half is Full and bottom is Icon.
 */
export const SplitLogo = ({ isFull, height = 32 }) => {
 return (
 <div
 style={{
 height,
 width: isFull ? height * 4 : height * 1.2,
 display:'flex',
 alignItems:'center',
 justifyContent:'center'
 }}
 >
 <Image
 src="/logo.png"
 alt="Dholera Logo"
 width={128} // Approximate width based on 4:1 aspect ratio for height 32
 height={32}
 priority
 style={{
 height,
 width:'100%',
 objectFit:'contain'
 }}
 />
 </div>
 );
};

/**
 * Main image which contains 3 sub images. 
 * Assumes a 1:3 aspect ratio source (Vertical stack).
 */
export const TripleSplitImage = ({ index, height = 300 }) => {
 return (
 <div
 style={{
 height,
 width:'100%',
 overflow:'hidden',
 position:'relative',
 borderRadius:'0.5rem',
 boxShadow:'0 4px 6px -1px rgb(0 0 0 / 0.1)'
 }}
 >
 <Image
 src="/sub1.png"
 alt={`Section ${index}`}
 width={800} // Large enough width
 height={height * 3}
 style={{
 width:'100%',
 height: height * 3, // Source is 3x the display height
 position:'absolute',
 top: -(index - 1) * height,
 left: 0,
 objectFit:'cover'
 }}
 />
 </div>
 );
};
