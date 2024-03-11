import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../lib/mongodb';

interface ResponseData {
    message: string;
}

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    if (req.method === 'POST') {
        try {
            // Connect to the database
            const { db } = await connectToDatabase();

            // Extract user data from request body
            const userData = req.body;

            // Upsert user data based on the email field
            const updateResult = await db.collection('users').updateOne(
                { name: userData.name, image: userData.image },
                { $set: userData },
                { upsert: true }
            );

            // Check the result and respond accordingly
            if (updateResult.matchedCount === 0 && updateResult.upsertedCount === 1) {
                // A new user was created
                return res.status(201).json({ message: 'User created successfully' });
            } else if (updateResult.matchedCount === 1) {
                // An existing user was updated
                return res.status(200).json({ message: 'User updated successfully' });
            } else {
                // Handle unexpected outcome
                console.error('Unexpected result from updateOne', updateResult);
                return res.status(500).json({ message: 'Unexpected error updating user' });
            }
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
