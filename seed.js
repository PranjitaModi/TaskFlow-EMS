import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import Employee from './models/Employee.js';
import Admin from './models/Admin.js';

export const initialEmployees = [
    {
        "id": 1,
        "firstName": "Alex",
        "email": "e@e.com",
        "password": "123",
        "taskCounts": {
            "active": 2,
            "newTask": 1,
            "completed": 1,
            "failed": 0
        },
        "tasks": [
            {
                "active": true,
                "newTask": true,
                "completed": false,
                "failed": false,
                "taskTitle": "Re-architect Portal Interface",
                "taskDescription": "Optimize the home landing layout for seamless client telemetry and brand cohesion.",
                "taskDate": "2026-06-12",
                "category": "Interface Design" 
            },
            {
                "active": false,
                "newTask": false,
                "completed": true,
                "failed": false,
                "taskTitle": "Stakeholder Alignment Sync",
                "taskDescription": "Discuss critical project deliverables and agree on key timeline milestones.",
                "taskDate": "2026-06-10",
                "category": "Operations Sync"
            },
            {
                "active": true,
                "newTask": false,
                "completed": false,
                "failed": false,
                "taskTitle": "Resolve Telemetry Anomalies",
                "taskDescription": "Debug and patch high-priority data visualizer crashes reported in telemetry logs.",
                "taskDate": "2026-06-14",
                "category": "Core Engineering"
            }
        ]
    },
    {
        "id": 2,
        "firstName": "Sophia",
        "email": "sophia@taskflowems.com",
        "password": "123",
        "taskCounts": {
            "active": 1,
            "newTask": 0,
            "completed": 1,
            "failed": 0
        },
        "tasks": [
            {
                "active": true,
                "newTask": false,
                "completed": false,
                "failed": false,
                "taskTitle": "Optimize Data Ingestion Pipeline",
                "taskDescription": "Refactor index definitions and query structures for sub-second telemetry retrieval.",
                "taskDate": "2026-06-11",
                "category": "Data Platforms"
            },
            {
                "active": false,
                "newTask": false,
                "completed": true,
                "failed": false,
                "taskTitle": "Prototype Integration Sandbox",
                "taskDescription": "Produce high-fidelity interactive wireframes for the workspace portal.",
                "taskDate": "2026-06-09",
                "category": "Interface Design"
            }
        ]
    },
    {
        "id": 3,
        "firstName": "Marcus",
        "email": "marcus@taskflowems.com",
        "password": "123",
        "taskCounts": {
            "active": 2,
            "newTask": 1,
            "completed": 1,
            "failed": 0
        },
        "tasks": [
            {
                "active": true,
                "newTask": true,
                "completed": false,
                "failed": false,
                "taskTitle": "Synthesize Briefing Materials",
                "taskDescription": "Compile quarterly roadmap progress decks and metrics visualizations.",
                "taskDate": "2026-06-13",
                "category": "Strategic Ops"
            },
            {
                "active": true,
                "newTask": false,
                "completed": false,
                "failed": false,
                "taskTitle": "Conduct Quality Assurance Audit",
                "taskDescription": "Audit current codebase against modern performance guidelines and clean code patterns.",
                "taskDate": "2026-06-12",
                "category": "Core Engineering"
            },
            {
                "active": false,
                "newTask": false,
                "completed": true,
                "failed": false,
                "taskTitle": "Validate Release Candidate",
                "taskDescription": "Execute regression test suite on staging deployment and log anomalies.",
                "taskDate": "2026-06-08",
                "category": "Quality Sync"
            }
        ]
    },
    {
        "id": 4,
        "firstName": "Elena",
        "email": "elena@taskflowems.com",
        "password": "123",
        "taskCounts": {
            "active": 2,
            "newTask": 1,
            "completed": 0,
            "failed": 0
        },
        "tasks": [
            {
                "active": true,
                "newTask": true,
                "completed": false,
                "failed": false,
                "taskTitle": "Draft System Integration Guide",
                "taskDescription": "Document REST API schema definitions and webhook integration steps.",
                "taskDate": "2026-06-13",
                "category": "Documentation"
            },
            {
                "active": true,
                "newTask": false,
                "completed": false,
                "failed": false,
                "taskTitle": "Establish Automation Pipeline",
                "taskDescription": "Set up build hooks, unit test checks, and containerized deployment workflows.",
                "taskDate": "2026-06-11",
                "category": "Infrastructure"
            }
        ]
    },
    {
        "id": 5,
        "firstName": "Kaelen",
        "email": "kaelen@taskflowems.com",
        "password": "123",
        "taskCounts": {
            "active": 2,
            "newTask": 1,
            "completed": 1,
            "failed": 0
        },
        "tasks": [
            {
                "active": true,
                "newTask": true,
                "completed": false,
                "failed": false,
                "taskTitle": "Redesign Workspace Theme",
                "taskDescription": "Incorporate clean slate design, premium glassmorphism, and color hierarchy.",
                "taskDate": "2026-06-14",
                "category": "Interface Design"
            },
            {
                "active": false,
                "newTask": false,
                "completed": true,
                "failed": false,
                "taskTitle": "Ship Production Artifacts",
                "taskDescription": "Trigger secure CD pipeline to roll out production build release v1.4.0.",
                "taskDate": "2026-06-09",
                "category": "Infrastructure"
            },
            {
                "active": true,
                "newTask": false,
                "completed": false,
                "failed": false,
                "taskTitle": "Examine Performance Telemetry",
                "taskDescription": "Synthesize feedback surveys and review browser performance reports.",
                "taskDate": "2026-06-12",
                "category": "Operations Sync"
            }
        ]
    }
];

export const initialAdmins = [
    {
        "id": 1,
        "email": "director@taskflowems.com",
        "password": "123"
    },
    {
        "id": 2,
        "email": "admin@me.com",
        "password": "123"
    }
];

export const seedDatabase = async () => {
    try {
        const empCount = await Employee.countDocuments();
        if (empCount === 0) {
            await Employee.insertMany(initialEmployees);
            console.log('Seeded initial employees into MongoDB.');
        }

        const adminCount = await Admin.countDocuments();
        if (adminCount === 0) {
            await Admin.insertMany(initialAdmins);
            console.log('Seeded initial admin into MongoDB.');
        }
    } catch (err) {
        console.error('Error seeding database:', err);
    }
};

if (process.argv[2] === '--run') {
    connectDB().then(async () => {
        await seedDatabase();
        process.exit(0);
    });
}
