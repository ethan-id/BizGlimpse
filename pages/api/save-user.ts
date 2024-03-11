import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../lib/mongodb';

type ResponseData = {
  message: string;
};

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    if (req.method === 'POST') {
        try {
            // Connect to the database
            const { db } = await connectToDatabase();

            // Extract user data from request body
            const userData = req.body;

            // Check if the user already exists (assuming an email field for uniqueness)
            const userExists = await db.collection('users').findOne({ email: userData.email });

            if (userExists) {
                return res.status(409).json({ message: 'User already exists' });
            }

            // Add the new user to the database
            await db.collection('users').insertOne(userData);

            // Respond with a success message
            res.status(201).json({ message: 'User saved successfully' });
        } catch (error) {
            console.error('Request error', error);
            res.status(500).json({ message: 'Error saving user' });
        }
    } else {
        // Handle any non-POST requests
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}

export default handler;
