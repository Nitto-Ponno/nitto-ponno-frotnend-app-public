import React from 'react';

function template({ children }: { children: React.ReactNode }) {
  console.log('first');
  return children;
}

export default template;
