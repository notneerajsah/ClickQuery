import express from 'express';
import bodyParser from 'body-parser';
// import { decode } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import db from './db.js';
import cors from 'cors';
import { generateToken, validate } from './auth.js';
// import ddlroute from './DDLRoute/ddl.js';
import { v4 as uuidv4 } from 'uuid';
// import { combineSlices } from '@reduxjs/toolkit';

dotenv.config();
const saltRounds = 10;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT;

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    console.log("authotoken:", req.headers.authorization);

    if (!token) {
        return res.status(403).json({ message: 'Token not provided' });
    }

    try {
        const payload = validate(token);
        if (!payload) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.userId = payload.userId;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Failed to authenticate token' });
    }
};
//getall tabledata
app.get('/api/tabledata/:userId', async (req, res) => {
    const userId = req.params.userId;
    // console.log("get reques");
  
    try {
      // Assuming db.query returns a Promise that resolves with the result
      const result = await db.query('SELECT * FROM table_creation_logs WHERE user_id = $1', [userId]);
      
      // Assuming the result is an array of table data objects
      res.json(result);
    } catch (error) {
      console.error('Error fetching table data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
// Signup endpoint
// Signup endpoint
app.post('/api/signup', async (req, res) => {
    console.log("signup api hit::");
    const { username, email, password } = req.body;
    console.log("data:",req.body);
    console.log("password:",password)
    try {
      // Check for existing user
      const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [email]);
  
      if (checkResult.rows.length > 0) {
        return res.status(400).json({ message: "User already exists" });
      } else {
        // Generate a random salt and hash the password with the salt
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
  
        // Insert user into database
        const result = await db.query(
          "INSERT INTO users (user_id, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
          [uuidv4(), username, email, hash]
        );
  
        const user = result.rows[0];
        console.log("user:", user);
  
        // Generate and return token
        const token = generateToken(user); // Assuming generateToken creates a token from user object
        res.status(201).json({ token, user });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' }); // Handle potential errors gracefully
    }
});
  
// Login endpoint
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    console.log("login");


    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [email]);

    if (checkResult.rows.length === 0) {
        res.json({ message: 'User does not exist. Please sign up.' });
    } else {
        const user = checkResult.rows[0];
        console.log("checkResult:", checkResult);
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            const token = generateToken(user);
            res.status(200).json({ token, user,message: 'Login successful.' });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    }
});

// Logout endpoint
app.post('/api/logout', (req, res) => {
    res.status(200).json({ message: 'Logout successful' });
});

// Route to create a new table
// Route to create a new table and log the creation
app.post('/ddl/createtable', async (req, res) => {
    try {
        const { tablename, attributes, dataTypes, constraints } = req.body;
        const decodedToken = req.body.decodedToken;
        const userId = decodedToken.userId; // Extract user ID from the decoded token

        // Construct the CREATE TABLE query
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS ${tablename} (
                
                ${attributes.map((attribute, index) => `${attribute} ${dataTypes[index]} ${constraints[index] || ''}`).join(',\n')}
            );
        `;

        // Execute the CREATE TABLE query
        await db.query(createTableQuery);

        // Construct the INSERT query to log table creation
        const logTableCreationQuery = `
            INSERT INTO table_creation_logs (user_id, table_name)
            VALUES ($1, $2);
        `;
        
        // Execute the INSERT query to log table creation
        await db.query(logTableCreationQuery, [userId, tablename]);

        // Construct the ALTER TABLE query to add foreign key constraint
        const addForeignKeyQuery = `
            ALTER TABLE ${tablename}
            ADD CONSTRAINT fk_${tablename}_${userId}_user
            FOREIGN KEY (user_id)
            REFERENCES users(user_id)
            ON DELETE CASCADE;
        `;

        // Execute the ALTER TABLE query to add foreign key constraint
        
        await db.query(addForeignKeyQuery);

        res.json({ message: "Table created successfully" });
    } catch (error) {
        console.error("Error creating table:", error);
        res.status(500).json({ error: "An error occurred while creating the table" });
    }
});



// Route to drop a table
app.delete('/ddl/droptable/:tablename', async (req, res) => {
    try {
        const { tablename } = req.params;
        const userId = req.body.decodedToken.userId; // Extract userId from request body
        console.log("userId:", userId);

        // Check if the user has permission to drop the table
        const result = await db.query('SELECT * FROM table_creation_logs WHERE table_name = $1 AND user_id = $2', [tablename, userId]);
        console.log("result:", result.rows);
        if (result.rows.length === 0) {
            return res.json({ message: "Table not found" });
        }

        // Drop the table
        await db.query('DROP TABLE IF EXISTS ' + tablename);

        // Delete entry from table_creation_logs
        await db.query('DELETE FROM table_creation_logs WHERE table_name = $1 AND user_id = $2', [tablename, userId]);

        res.json({ message: "Table dropped successfully" });
    } catch (error) {
        console.error("Error dropping table:", error);
        res.status(500).json({ error: "An error occurred while dropping the table" });
    }
});
//rename table

//alter table endpoint
app.post('/ddl/renametable/:currentTableName/:newTableName', async (req, res) => {
    const { currentTableName, newTableName } = req.params;
    console.log("currentTableName:", currentTableName);
    console.log("newTableName:", newTableName);
    const userId = req.body.data.decodedToken.userId; 
    console.log("data",req.body.data.decodedToken.userId)
    
    try {
      // Check if the current table exists in the database
      const result = await db.query('SELECT * FROM table_creation_logs WHERE user_id = $1 and table_name = $2  ', [ userId,currentTableName]);
      // Rename the table in the database
      console.log("resutl:",result);
      if (result.rows.length === 0) {
        return res.json({ message: "Table not found" });
    }
    await db.query('UPDATE table_creation_logs SET table_name=$1 WHERE user_id=$2  and table_name = $3', [newTableName, userId,currentTableName]);
    await db.query(`ALTER TABLE "${currentTableName}" RENAME TO "${newTableName}"`);


    
  
      res.json({ message: `Table ${currentTableName} renamed to ${newTableName}` });
    } catch (error) {
      console.error('Error renaming table:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

// Route to rename a table
app.get('/api/columns/:tablename', async (req, res) => {
    const { tablename } = req.params;
  
    try {
      // Construct the SQL query to retrieve column names and data types for the specified table
      const queryText = `
        SELECT column_name, data_type
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = $1;
      `;
  
      // Execute the SQL query
      
      const result = await db.query(queryText, [tablename]);

  
      // Extract column names and data types from the result and send them as response
      const columns = result.rows.map(row => ({ name: row.column_name, type: row.data_type }));
      res.json({ columns });
    } catch (error) {
      console.error('Error fetching columns:', error);
      res.status(500).json({ error: 'An error occurred while fetching columns' });
    }
  });
  
// route to alter table
// app.post('/api/altertable/:userId/:tablename',async(req,res)=>{
//     const tablename=req.params.tablename;
//     const userId=req.params.userId;
    

// })


  
//insert into table
app.post('/api/insertData/', async (req, res) => {
    const { tableName, columnValues } = req.body;
    
    try {
        // Construct the SQL query to insert data into the specified table
        const columnNames = Object.keys(columnValues).join(', ');
        const values = Object.values(columnValues);
        const placeholders = values.map((_, index) => `$${index + 1}`).join(', ');
        console.log("value:",values);
        console.log("placeholdr:",placeholders);
        console.log("columnName:",columnNames);
        const queryText = `INSERT INTO ${tableName} (${columnNames}) VALUES (${placeholders})`;

        // Execute the SQL query
        await db.query(queryText, values);

        res.status(201).json({ message: `Data inserted into table "${tableName}" successfully.` });
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).json({ error: 'An error occurred while inserting data into the table.' });
    }
});

  //update table
app.post('/api/updatedata', async (req, res) => {
    try {
      // Extract data from the request body
      const { decodedToken,TableName,columnName, columnValue, whereCondition } = req.body;
      console.log("where condtion:",whereCondition);
      const userId=decodedToken.userId;
        // Check if the current table exists in the database
        const result = await db.query('SELECT * FROM table_creation_logs WHERE user_id = $1 and table_name = $2  ', [ userId,TableName]);
        // Rename the table in the database
        console.log("resutl:",result);
        if (result.rows.length === 0) {
          return res.json({ message: "Table not found" });
      }
      // Construct the SQL query
      await db.query(`UPDATE ${TableName} SET ${columnName} = $1 WHERE ${whereCondition}`, [columnValue]);

  console.log("decode for update:",decodedToken);
      // Execute the SQL query
    //   await db.query(query, [columnValue]);
  
      res.json({ message: 'Data updated successfully' });
    } catch (error) {
      console.error('Error updating data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
// delete data
app.post('/api/deletedata', async (req, res) => {
    try {
        console.log("delete:")
        // Extract data from the request body
        const {decodedToken, tableName, columnName, columnValue } = req.body;
        const userId=decodedToken.userId;
        console.log("decode:",decodedToken)
        console.log("tablename:",tableName);
        // Check if the current table exists in the database
        const result = await db.query('SELECT * FROM table_creation_logs WHERE user_id = $1 and table_name = $2  ', [ userId,tableName]);
        // Rename the table in the database
        console.log("resutl:",result);
        if (result.rows.length === 0) {
          return res.json({ message: "Table not found" });
      }
        // Construct the SQL query for deletion
        const query = `DELETE FROM ${tableName} WHERE ${columnName} = ${columnValue}`;
        console.log("decode for update:",decodedToken);
        // Send a response indicating successful deletion
        res.json({ message: 'Record deleted successfully' });
    } catch (error) {
        // Handle errors
        console.error('Error deleting record:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export { generateToken, validate };
