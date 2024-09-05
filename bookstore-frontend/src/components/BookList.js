import React, { useEffect, useState } from 'react';
import api from '../services/api';

function BookList({ onEdit, onDelete }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get('/books');
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <h2>Book List</h2>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            {book.title} by {book.author} - ${book.price} ({book.stock} in stock)
            <button onClick={() => onEdit(book)}>Edit</button>
            <button onClick={() => onDelete(book._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
