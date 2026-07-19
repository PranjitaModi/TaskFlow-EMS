import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
    taskTitle: { type: String, required: true },
    taskDescription: { type: String, required: true },
    taskDate: { type: String, required: true },
    category: { type: String, required: true },
    active: { type: Boolean, default: false },
    newTask: { type: Boolean, default: true },
    completed: { type: Boolean, default: false },
    failed: { type: Boolean, default: false }
}, { timestamps: true });

const TaskCountsSchema = new mongoose.Schema({
    active: { type: Number, default: 0 },
    newTask: { type: Number, default: 0 },
    completed: { type: Number, default: 0 },
    failed: { type: Number, default: 0 }
}, { _id: false });

const EmployeeSchema = new mongoose.Schema({
    id: { type: Number },
    firstName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    taskCounts: { type: TaskCountsSchema, default: () => ({}) },
    tasks: [TaskSchema]
}, { timestamps: true });

const Employee = mongoose.model('Employee', EmployeeSchema);
export default Employee;
