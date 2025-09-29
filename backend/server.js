import 'dotenv/config'; 
import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import cors from 'cors';

const app = express();

// --- KORRIGERAT: Flytta express.json() till toppen ---
// Middleware för att tolka inkommande JSON-förfrågningar (req.body)
app.use(express.json()); 

// Middleware för CORS
const allowedOrigins = "*"; 
app.use(cors({
    origin: allowedOrigins
}));
// --------------------------------------------------


// --- Produktmodell och Rutt ---
const productSchema = new mongoose.Schema({
    Product_ID: String,
    Product_Name: String,
    Price: Number,
    Stock: Number
});
const Product = mongoose.model('Product', productSchema);

// GET all products
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);  // return array of products
    } catch (error) {
        console.error("Fel vid hämtning av produkter:", error);
        res.status(500).json({ message: 'Fel vid hämtning av produkter.' });
    }
});
app.delete('/api/products/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Produkt borttagen!' });
    } catch (error) {
        console.error("Fel vid borttagning av produkt:", error);
        res.status(500).json({ message: 'Fel vid borttagning av produkt.' });
    }
});

app.post('/api/products', async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json({ message: 'Produkt sparad!', product });
    } catch (error) {
        console.error("Fel vid sparande av produkt:", error);
        res.status(500).json({ message: 'Fel vid sparande av produkt.' });
    }
});


// --- MongoDB Anslutning ---
const uri = process.env.MONGO_URI; 

if (!uri) {
    console.error("FATAL FEL: MONGO_URI är inte definierad i .env-filen.");
    process.exit(1);
}

mongoose.connect(uri)
    .then(() => console.log('Ansluten till MongoDB!'))
    .catch(err => {
        console.error('Kunde inte ansluta till databasen:', err.message);
        process.exit(1);
    });


// --- Användarmodell och Rutter ---

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true,
        trim: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    userRole: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }

});

const User = mongoose.model('User', userSchema);

// --- 4. Registrerings-Endpoint ---

app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    const saltRounds = 10; 

    // A. Validering
    if (!username || !password || password.length < 6) {
        return res.status(400).json({ message: "Användarnamn och lösenord (minst 6 tecken) måste anges." });
    }

    try {
        // B. Kontrollera om användaren redan finns
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: "Användarnamnet är redan upptaget." });
        }

        // C. Hasha lösenordet säkert
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // D. Skapa och spara den nya användaren i MongoDB
        const newUser = new User({ 
            username, 
            password: hashedPassword 
        });

        await newUser.save();

        // E. Svar vid framgång
        console.log(`Ny användare registrerad: ${username}`);
        res.status(201).json({ 
            message: "Registrering lyckades! Användare sparad i MongoDB.",
            userId: newUser._id 
        });

    } catch (error) {
        console.error("Fel vid registrering:", error);
        res.status(500).json({ message: "Internt serverfel vid registrering." });
    }
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(401).json({ message: "Ogiltigt användarnamn eller lösenord." });
    }

    const passwordmatch = await bcrypt.compare(password, user.password);
    if (!passwordmatch) {
        return res.status(401).json({ message: "Ogiltigt användarnamn eller lösenord." });
    }

    const verifiedUser = {
        id: user._id,
        username: user.username,
        role: user.userRole
    };
    
    res.status(200).json({
        message: "Inloggning lyckades!",
        user: verifiedUser
    });

});


const PORT = 3000;
app.listen(PORT, () => console.log(`Backend Server kör på http://localhost:${PORT}`));
