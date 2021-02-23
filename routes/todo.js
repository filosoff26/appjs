const express = require("express");
const router = express.Router();
const { check, validationResult } = require('express-validator');
const connectDB = require("../config/db");

// add new todo
router.post(
    "/",
    [
        check("title", "Укажите название задачи").not().isEmpty(),
        check("todo", "Укажите задачу!").not().isEmpty(),
    ],
    async (req, res) => {
        // check errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array() });
        }

        // sql query
        const { title, todo } = req.body;
        let data = { title, todo };
        let sql = "INSERT INTO todos SET ?";
        connectDB.query(sql, data, (err, result) => {
            if (err) {
                res.status(500).send("Ошибка сервера");
                throw err;
            } else {
                res.send("Задача добавлена");
            }
        });
    }
);

// get all todos
router.get("/", async (req, res) => {
    let sql = "SELECT * FROM todos";
    connectDB.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});

// update todo
router.put(
    "/",
    [
        check("id_todo", "Вы не выбрали задачу"),
        check("title", "Укажите название задачи"),
        check("todo", "Укажите задачу!"),
    ],
    async (req, res) => {
        // check errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array() });
        }

        // sql query
        const { id_todo, title, todo } = req.body;
        let sql = `UPDATE todos SET title = "${title}", todo = "${todo}" WHERE id_todo = ${id_todo}`;
        connectDB.query(sql, (err) => {
            if (err) {
                res.status(500).send("Ошибка сервера");
                throw err;
            } else {
                res.send("Задача обновлена");
            }
        });
    }
);

// delete todo
router.delete(
    "/",
    [
        check("id_todo", "Вы не выбрали задачу"),
    ],
    async (req, res) => {
        // check errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array() });
        }

        // sql query
        const { id_todo } = req.body;
        let sql = `DELETE FROM todos WHERE id_todo = ${id_todo}`;
        await connectDB.query(sql, (err) => {
            if (err) {
                res.status(500).send("Ошибка сервера");
                throw err;
            } else {
                res.send("Задача удалена");
            }
        });
    }
);


module.exports = router;
