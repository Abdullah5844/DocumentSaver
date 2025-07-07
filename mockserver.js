// mockServer.js (Run this separately)
const express = require('express');
const app = express();
app.use(express.json());

app.post('/validate-token', (req, res) => {
    const { token } = req.body;

    // For demonstration, hardcoded token handling
    if (token === 'admin-token') {
        return res.json({ id: 1, role: 'Admin', fullName: 'Admin User' });
    } else if (token === 'user-token') {
        return res.json({ id: 2, role: 'Regular', fullName: 'Regular User' });
    } else {
        return res.status(401).json({ message: 'Invalid token' });
    }
});

app.listen(4000, () => console.log('Mock Server running on port 4000'));
