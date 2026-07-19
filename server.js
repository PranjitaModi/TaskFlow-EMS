import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import { seedDatabase, initialEmployees, initialAdmins } from './seed.js';
import Employee from './models/Employee.js';
import Admin from './models/Admin.js';

const app = express();

app.use(cors());
app.use(express.json());

// In-Memory Fallback State (used if MongoDB service is offline)
let memoryEmployees = JSON.parse(JSON.stringify(initialEmployees));
let memoryAdmins = JSON.parse(JSON.stringify(initialAdmins));

// Attempt DB Connection & Seeding
connectDB().then((isConnected) => {
    if (isConnected) {
        seedDatabase();
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    const isConnected = mongoose.connection.readyState === 1;
    res.json({
        readyState: mongoose.connection.readyState,
        database: mongoose.connection.name || 'In-Memory',
        host: mongoose.connection.host || 'local',
        status: isConnected ? 'ok' : 'fallback_memory_mode',
        message: isConnected 
            ? 'EMS Backend connected to MongoDB Atlas' 
            : 'EMS Backend running in fallback mode'
    });
});

// Get all employees
app.get('/api/employees', async (req, res) => {
    try {
        if (mongoose.connection.readyState === 1) {
            const employees = await Employee.find().sort({ id: 1 });
            return res.json(employees);
        }
        res.json(memoryEmployees);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Auth Login endpoint
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        if (mongoose.connection.readyState === 1) {
            const admin = await Admin.findOne({ email, password });
            if (admin) {
                return res.json({ role: 'admin', data: { email: admin.email, id: admin.id } });
            }

            const employee = await Employee.findOne({ email, password });
            if (employee) {
                return res.json({ role: 'employee', data: employee });
            }

            return res.status(401).json({ error: 'Invalid Credentials' });
        }

        // Fallback login
        const admin = memoryAdmins.find(a => a.email === email && a.password === password);
        if (admin) {
            return res.json({ role: 'admin', data: { email: admin.email, id: admin.id } });
        }

        const employee = memoryEmployees.find(e => e.email === email && e.password === password);
        if (employee) {
            return res.json({ role: 'employee', data: employee });
        }

        return res.status(401).json({ error: 'Invalid Credentials' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create Task endpoint
app.post('/api/tasks', async (req, res) => {
    const { asignTo, taskTitle, taskDescription, taskDate, category } = req.body;

    if (!asignTo || !taskTitle) {
        return res.status(400).json({ error: 'Assignee and task title are required.' });
    }

    try {
        const newTask = {
            taskTitle,
            taskDescription,
            taskDate,
            category,
            active: false,
            newTask: true,
            completed: false,
            failed: false
        };

        if (mongoose.connection.readyState === 1) {
            const employee = await Employee.findOne({
                firstName: { $regex: new RegExp(`^${asignTo.trim()}$`, 'i') }
            });

            if (!employee) {
                return res.status(404).json({ error: `Teammate "${asignTo}" not found in registry.` });
            }

            employee.tasks.push(newTask);
            employee.taskCounts.newTask = (employee.taskCounts.newTask || 0) + 1;
            await employee.save();

            const allEmployees = await Employee.find().sort({ id: 1 });
            return res.json({ message: 'Task created successfully in MongoDB', employee, allEmployees });
        }

        // Fallback in-memory
        const employee = memoryEmployees.find(
            e => e.firstName.trim().toLowerCase() === asignTo.trim().toLowerCase()
        );

        if (!employee) {
            return res.status(404).json({ error: `Teammate "${asignTo}" not found in registry.` });
        }

        employee.tasks.push(newTask);
        employee.taskCounts.newTask = (employee.taskCounts.newTask || 0) + 1;

        res.json({ message: 'Task created successfully (In-Memory)', employee, allEmployees: memoryEmployees });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update Task Status endpoint (accept, complete, fail)
app.put('/api/tasks/status', async (req, res) => {
    const { employeeEmail, taskTitle, taskDate, action } = req.body;

    try {
        if (mongoose.connection.readyState === 1) {
            const employee = await Employee.findOne({ email: employeeEmail });
            if (!employee) {
                return res.status(404).json({ error: 'Employee not found.' });
            }

            const task = employee.tasks.find(
                t => t.taskTitle === taskTitle && t.taskDate === taskDate
            );

            if (!task) {
                return res.status(404).json({ error: 'Task not found.' });
            }

            if (action === 'accept') {
                if (task.newTask) {
                    task.newTask = false;
                    task.active = true;
                    employee.taskCounts.active = (employee.taskCounts.active || 0) + 1;
                    employee.taskCounts.newTask = Math.max(0, (employee.taskCounts.newTask || 0) - 1);
                }
            } else if (action === 'completed') {
                task.active = false;
                task.completed = true;
                employee.taskCounts.completed = (employee.taskCounts.completed || 0) + 1;
                employee.taskCounts.active = Math.max(0, (employee.taskCounts.active || 0) - 1);
            } else if (action === 'failed') {
                task.active = false;
                task.failed = true;
                employee.taskCounts.failed = (employee.taskCounts.failed || 0) + 1;
                employee.taskCounts.active = Math.max(0, (employee.taskCounts.active || 0) - 1);
            }

            await employee.save();

            const allEmployees = await Employee.find().sort({ id: 1 });
            return res.json({ message: 'Task status updated in MongoDB', employee, allEmployees });
        }

        // Fallback in-memory
        const employee = memoryEmployees.find(e => e.email === employeeEmail);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found.' });
        }

        const task = employee.tasks.find(
            t => t.taskTitle === taskTitle && t.taskDate === taskDate
        );

        if (!task) {
            return res.status(404).json({ error: 'Task not found.' });
        }

        if (action === 'accept') {
            if (task.newTask) {
                task.newTask = false;
                task.active = true;
                employee.taskCounts.active = (employee.taskCounts.active || 0) + 1;
                employee.taskCounts.newTask = Math.max(0, (employee.taskCounts.newTask || 0) - 1);
            }
        } else if (action === 'completed') {
            task.active = false;
            task.completed = true;
            employee.taskCounts.completed = (employee.taskCounts.completed || 0) + 1;
            employee.taskCounts.active = Math.max(0, (employee.taskCounts.active || 0) - 1);
        } else if (action === 'failed') {
            task.active = false;
            task.failed = true;
            employee.taskCounts.failed = (employee.taskCounts.failed || 0) + 1;
            employee.taskCounts.active = Math.max(0, (employee.taskCounts.active || 0) - 1);
        }

        res.json({ message: 'Task status updated (In-Memory)', employee, allEmployees: memoryEmployees });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Express server running on http://localhost:${PORT}`);
});
