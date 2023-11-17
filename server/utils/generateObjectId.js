import { ObjectId } from 'mongodb'

const generateObjectId = () => {
  return new ObjectId().toHexString()
}

const newObjectId = generateObjectId()
console.log(newObjectId) // 5f8a1d5b8b0b2b1b2c9b3b4c
