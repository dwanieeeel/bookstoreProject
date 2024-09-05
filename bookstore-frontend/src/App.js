
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import api from './services/api';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f0f0f0;
  min-height: 100vh;
`;

const Header = styled.header`
  background-color: #282c34;
  padding: 20px;
  color: white;
  text-align: center;
  width: 100%;
  margin-bottom: 20px;
`;

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await api.get('/books');
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const addBook = async (book) => {
    try {
      const response = await api.post('/books', book);
      setBooks([...books, response.data]);
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  const deleteBook = async (id) => {
    try {
      await api.delete(`/books/${id}`);
      setBooks(books.filter(book => book._id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const editBook = async (updatedBook) => {
    try {
      const response = await api.put(`/books/${updatedBook._id}`, updatedBook);
      setBooks(books.map(book => book._id === updatedBook._id ? response.data : book));
    } catch (error) {
      console.error("Error editing book:", error);
    }
  };

  return (
    <AppContainer>
      <Header>
        <h1>Bookstore Management</h1>
      </Header>
      <BookForm addBook={addBook} />
      <BookList books={books} onEdit={editBook} onDelete={deleteBook} />
    </AppContainer>
  );
}
export default App;