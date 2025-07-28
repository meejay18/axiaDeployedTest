import express from 'express'
const app = express()
import env from 'dotenv'
import userRoute from './route/user.route.js'
import postRoute from './route/post.route.js'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import kycRoute from './route/kyc.route.js'
import bookRoute from './route/book.route.js'
env.config()
app.use(express.json())
app.use(
  express.text({
    type: ['text/plain', 'application/javascript', 'text/html', 'application/xml'],
  })
)

const port = process.env.PORT || 5000
app.use(express.urlencoded())
// app.use(express.text({ type:  }));
// app.use(express.text({ type: }));
app.use(cookieParser())

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Database connected')
  })
  .catch(() => {
    console.log('error connecting with database')
  })

app.use(userRoute)
app.use(postRoute)
app.use(kycRoute)
app.use(bookRoute)

// universal Error handling
// app.use((error, req, res, next) => {
//  return res
//   .status(error.status || 500)
//   .json({ message: error.message || 'Something went wrong' });
// });

app.use((error, req, res, next) => {
  return res.status(error.status || 500).json({ message: error.message || 'Something went wrong' })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
