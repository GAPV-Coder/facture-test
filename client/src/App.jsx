/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import BooksPages from "./pages/booksPages";

function App() {
  return (
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/books" element={<BooksPages />} />
        </Routes>
      </Router>
  );
}

export default App;
