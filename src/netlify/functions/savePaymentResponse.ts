import { Handler } from '@netlify/functions';
import sqlite3 from 'sqlite3';

const handler: Handler = async function(event: any, context) {
    // Connect to a file-based SQLite database (replace 'database.db' with your desired file name)
    const db = new sqlite3.Database('database.db');

    try {
        const {
            amount,
            msisdn,
            mpesa_receipt,
        } = JSON.parse(event.body);

        const query = `
            CREATE TABLE IF NOT EXISTS payments (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                amount INTEGER,
                msisdn TEXT,
                mpesa_receipt TEXT
            );

            INSERT INTO payments (amount, msisdn, mpesa_receipt)
            VALUES (?, ?, ?)
        `;

        db.run(query, [amount, msisdn, mpesa_receipt], function(err) {
            if (err) {
                console.error('Error inserting data:', err);
                return {
                    statusCode: 500,
                    body: JSON.stringify({ error: 'Internal Server Error' }),
                };
            }

            console.log('Payment response saved successfully');
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Payment response saved successfully' }),
        };
    } catch (error) {
        console.error('Error processing payment data:', error);

        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    } finally {
        // Close the database connection
        db.close();
    }
};

export { handler };
