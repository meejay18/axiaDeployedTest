import bookModel from '../model/book.model.js';
import userModel from '../model/user.model.js';

export const createBook = async (req, res) => {
 const { authors, ...others } = req.body;
 const { id } = req.user;
 const allAuthors = [id, ...authors];

 try {
  const newBook = new bookModel({ authors: allAuthors, ...others });
  const savedBook = await newBook.save();

  for (const authorId of allAuthors) {
   await userModel.findByIdAndUpdate(
    authorId,
    { $push: { books: savedBook.id } },
    { new: true }
   );
  }
  return res.status(201).json({
   message: 'Book created successfully',
   data: savedBook,
  });
 } catch (error) {
  return res.status(500).json({
   message: 'Error creating book',
   error: error.message,
  });
 }
};

export const getOneBook = async (req, res) => {
 const { bookId } = req.params;

 try {
  const book = await bookModel.findById(bookId).populate('authors');

  return res.status(201).json({
   message: 'Book created successfully',
   data: book,
  });
 } catch (error) {
  return res.status(500).json({
   message: 'Error getting book',
   error: error.message,
  });
 }
};
