import userModel from '../model/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import env from 'dotenv'
import fs from 'fs/promises'
import cloudinary from '../utils/cloudinary.js'
env.config()

export const createUser = async (req, res, next) => {
  const { name, email, password, ...others } = req.body
  if (!email || !password) {
    return res.status(400).json({
      message: 'Invalid credentials',
    })
  }

  try {
    const existingUser = await userModel.findOne({ email })
    if (existingUser) {
      const error = new Error('User already exists')
      error.status = 409
      error.details = { field: 'email' }
      return next(error)
    }
    // const isUser = await userModel.findOne({ email });
    // if (isUser) {
    //  return res.status(404).json({
    //   message: 'User already exists. Create new account',
    //  });
    // }
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(password, salt)

    const newUser = await userModel.create({
      name,
      email,
      password: hashed,
      ...others,
    })

    return res.status(201).json({
      message: 'User Created Successfully',
      data: newUser,
    })
  } catch (error) {
    error.status = 401
    return next(error)
  }
}

export const getAllUsers = async (req, res) => {
  try {
    // const users = await userModel
    //  .find({ gender: 'male', age: { $gt: 20, $lt: 50 } })
    //  //  .limit(1)
    //  .select({ name: 1, _id: 0, gender: 1, email: 1, age: 1 })
    //  .sort({ age: -1 });

    // const users = await userModel
    //  .find()
    //  .where('age')
    //  .gt(20)
    //  .where('gender')
    //  .equals('male')
    //  .where('age')
    //  .lt(60);

    const users = await userModel.aggregate([
      {
        $match: {
          gender: 'male',
          //  age: { $gt: 20, $lt: 50 },
        },
      },
      {
        $limit: 6,
      },
      {
        $project: {
          name: 1,
          age: 1,
          _id: 0,
          gender: 1,
        },
      },
      {
        $sort: {
          age: -1,
        },
      },
    ])

    return res.status(200).json({
      message: 'Users successfully gotten',
      data: users,
    })
  } catch (error) {
    return res.status(404).json({
      message: 'Error getting users',
      error: error.message,
    })
  }
}
export const getOneUser = async (req, res) => {
  const { id } = req.params
  console.log(req.params.id)

  try {
    const user = await userModel.findById(id).populate('kyc').populate('posts')
    console.log(user)

    //  .populate('books');
    return res.status(200).json({
      message: 'Users successfully gotten',
      data: user,
    })
  } catch (error) {
    return res.status(404).json({
      message: 'Error getting users',
      error: error.message,
    })
  }
}

export const updateUser = async (req, res) => {
  const { id } = req.params
  const data = req.body

  try {
    const updatedUser = await userModel.findByIdAndUpdate(id, data, {
      new: true,
    })
    return res.status(200).json({
      message: 'Users successfully updated',
      data: updatedUser,
    })
  } catch (error) {
    return res.status(404).json({
      message: 'Error getting users',
      error: error.message,
    })
  }
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({
      message: 'Invalid credentials',
    })
  }

  try {
    const user = await userModel.findOne({ email })
    if (!user) {
      return res.status(404).json({
        message: 'user does not exist, create a new account',
      })
    }

    const checkPassword = await bcrypt.compare(password, user.password)
    if (!checkPassword) {
      return res.status(404).json({
        message: 'Password mismatch',
      })
    }

    const token = jwt.sign({ name: user.name, id: user.id }, process.env.JWT_SECRET, { expiresIn: '2hr' })
    // console.log(token);

    return res
      .cookie('token', token, {
        maxAge: 1000 * 60 * 60,
        secure: true,
        httpOnly: true,
      })
      .json({
        message: 'This was successfull',
      })
  } catch (error) {
    return res.status(404).json({
      message: 'Error logging in',
      error: error.message,
    })
  }
}

export const deleteUser = async (req, res) => {
  const { id } = req.params
  try {
    const deletedUser = await userModel.findByIdAndDelete(id)
    return res.status(200).json({
      message: 'User userDeleted successfully',
      data: deletedUser,
    })
  } catch (error) {
    return res.status(404).json({
      message: 'Error deleting user',
      error: error.message,
    })
  }
}

export const statusCode = async (req, res, next) => {
  console.log(req.body)
  return res.send('successful')
}

// uploading single file field
export const singleFile = async (req, res) => {
  const response = await cloudinary.uploader.upload(req.file.path, {
    resource_type: 'video',
    folder: 'video',
  })
  console.log(response)
  await fs.unlink(req.file.path)

  return res.send('Single file upload successful')
}

// uploading multiple file fields
export const arrayFile = async (req, res) => {
  console.log(req.files)
  console.log(req.body)
  return res.send('Array file upload successful')
}

// uploading multiple fields
export const multipleFiles = async (req, res) => {
  console.log(req.files)
  console.log(req.body)
  return res.send('multiple fields upload successful')
}
// export const redirect = async (req, res, next) => {
//  throw new Error('Another error occured here');
// };
