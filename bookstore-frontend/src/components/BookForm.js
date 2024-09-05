import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../services/api';

const Label = styled.label`
  font-size: 16px;
  color: #333;
  margin-bottom: 5px;
`;

const Input = styled.input`
  margin-bottom: 15px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
`;

function BookForm({ selectedBook, onSave }) {
  const [book, setBook] = useState({
    title: '',
    author: '',
    genre: '',
    price: '',
    stock: '',
  });

  useEffect(() => {
    if (selectedBook) {
      setBook(selectedBook);
    }
  }, [selectedBook]);

  const handleChange = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (book._id) {
        await api.put(`/books/${book._id}`, book);
      } else {
        await api.post('/books', book);
      }
      onSave();
      setBook({ title: '', author: '', genre: '', price: '', stock: '' });
    } catch (error) {
      console.error("Error saving book", error);
    }
  };

  return (
    <FormContainer>
      <h2>{book._id ? 'Edit Book' : 'Add New Book'}</h2>
      <form onSubmit={handleSubmit}>
        <Label htmlFor="title">Título do Livro:</Label>
        <Input
          id="title"
          type="text"
          name="title"
          value={book.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        
        <Label htmlFor="author">Autor do Livro:</Label>
        <Input
          id="author"
          type="text"
          name="author"
          value={book.author}
          onChange={handleChange}
          placeholder="Author"
          required
        />
        
        <Label htmlFor="genre">Gênero:</Label>
        <Input
          id="genre"
          type="text"
          name="genre"
          value={book.genre}
          onChange={handleChange}
          placeholder="Genre"
          required
        />
        
        <Label htmlFor="price">Preço:</Label>
        <Input
          id="price"
          type="number"
          name="price"
          value={book.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />
        
        <Label htmlFor="stock">Estoque:</Label>
        <Input
          id="stock"
          type="number"
          name="stock"
          value={book.stock}
          onChange={handleChange}
          placeholder="Stock"
          required
        />
        
        <button type="submit">{book._id ? 'Update' : 'Create'}</button>
      </form>
    </FormContainer>
  );
}

export default BookForm;

