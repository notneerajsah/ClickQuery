import jwt from 'jsonwebtoken';

// Function to generate JWT token
function generateToken(user) {
    return jwt.sign({ userId: user.user_id, username: user.username,useremail:user.email }, process.env.JWT_SECRET, { expiresIn: '2h' });
}

// Function to validate JWT token
function validate(token) {
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        console.log("payload::", payload);
        return payload;
    } catch (error) {
        // Handle invalid token
        return null;
    }
}

export { generateToken, validate };
