// index.js
import express from "express";
import passport from "passport";
import session from "express-session";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import { pool, query } from "./src/utils/database.js";

// Import all routes
import doctorRoutes from "./src/routes/doctorRoutes.js";
import patientRoutes from "./src/routes/patientRoutes.js";
import departmentRoutes from "./src/routes/departmentRoutes.js";
import feesRoutes from "./src/routes/feesRoutes.js";
import receptionistRoutes from "./src/routes/receptionistRoutes.js";
import labRoutes from "./src/routes/labRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import prescriptionRoutes from "./src/routes/prescriptionRoutes.js";
import slotsRoutes from "./src/routes/slotsRoutes.js";
import reportRoutes from "./src/routes/reportRoutes.js";
import appointmentRoutes from "./src/routes/appointmentRoutes.js";
import billRoutes from "./src/routes/billingAndChargesRoutes.js";
import roombedRoutes from "./src/routes/roombedRoutes.js";
import accountantRoutes from "./src/routes/accountantRoutes.js";
import courseRoutes from "./src/routes/couresRoutes.js";
import forgotRoutes from "./src/routes/forgotRoutes.js";
import pdfRoutes from "./src/routes/pdfRoutes.js";

// Fix __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(
  session({
    secret: 'keyboard_cat',
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/doctor', doctorRoutes);
app.use('/roombed', roombedRoutes);
app.use('/patient', patientRoutes);
app.use('/department', departmentRoutes);
app.use('/receptionist', receptionistRoutes);
app.use('/lab', labRoutes);
app.use('/fees', feesRoutes);
app.use('/user', userRoutes);
app.use('/prescription', prescriptionRoutes);
app.use('/appointment', appointmentRoutes);
app.use('/bill', billRoutes);
app.use('/slots', slotsRoutes);
app.use('/report', reportRoutes);
app.use('/accountant', accountantRoutes);
app.use('/treatment', courseRoutes);
app.use('/forgot', forgotRoutes);
app.use('/pdf', pdfRoutes);

app.use('/uploads', express.static(path.join(__dirname, "src/uploads")));  

const PORT = process.env.PORT || 3005;

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
