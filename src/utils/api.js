const API_BASE_URL = 'http://localhost:5000/api';

export const fetchEmployees = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/employees`);
        if (!response.ok) throw new Error('Failed to fetch employees');
        return await response.json();
    } catch (error) {
        console.error('Error in fetchEmployees:', error);
        return [];
    }
};

export const loginUser = async (email, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            throw new Error(errData.error || 'Invalid credentials');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const createEmployeeTask = async (taskPayload) => {
    try {
        const response = await fetch(`${API_BASE_URL}/tasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskPayload)
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'Failed to create task');
        }
        return data;
    } catch (error) {
        throw error;
    }
};

export const updateTaskStatus = async (statusPayload) => {
    try {
        const response = await fetch(`${API_BASE_URL}/tasks/status`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(statusPayload)
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'Failed to update task status');
        }
        return data;
    } catch (error) {
        throw error;
    }
};
