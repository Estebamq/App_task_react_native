import {connect} from '../database';

export const getTasks = async (req, res) => {
    const db = await connect();
    const [rows] = await db.query('SELECT * FROM tasks');
    res.json(rows);
}

export const getTaskId = async (req, res) => {
    const db = await connect();
    const [rows] = await db.query('SELECT * FROM tasks WHERE id=?',[req.params.id,]);
    res.json(rows[0]);
};


export const getTasksCount = async (req, res) => {
    const db = await connect();
    const [rows] = await db.query('SELECT COUNT(*) FROM tasks');
    res.json(rows[0]["COUNT(*)"]);
    
};

export const saveTask = async (req, res) => {
    const db = await connect();
    const results = await db.query('INSERT INTO tasks(title,description) VALUES(?,?)',[req.body.title,req.body.description]);
    res.json({
        id:results.insertId,
        ...req.body,
    });
};
export const deleteTask = async (req, res) => {
    const db = await connect();
    await db.query('DELETE FROM tasks WHERE id=?',[req.params.id,]);
    res.sendStatus(204);
}

export const updateTask = async (req, res) => {
    const db = await connect();
    await db.query('UPDATE tasks SET ? WHERE id = ?',[req.body,req.params.id]);
    res.sendStatus(204);
}