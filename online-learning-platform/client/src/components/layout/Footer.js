import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center">
      Online Learning Platform &copy; {new Date().getFullYear()}
    </footer>
  );
};

export default Footer;