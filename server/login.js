// import bcrypt from 'bcrypt';
// import { MongoClient } from 'mongodb';

// const uri = 'your-mongodb-connection-string';
// const client = new MongoClient(uri);

// async function connect() {
//   await client.connect();
//   console.log('Connected to MongoDB');

//   const db = client.db('lms-management-system');
//   const usersCollection = db.collection('Users');

//   return usersCollection;
// }

// export default function(app) {
//   app.post('/login', async (req, res) => {
//     const usersCollection = await connect();
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: 'Invalid form data' });
//     }

//     const user = await usersCollection.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const passwordMatch = await bcrypt.compare(password, user.password);

//     if (!passwordMatch) {
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     return res.status(200).json({ message: 'Login Successful' });
//   });
// }