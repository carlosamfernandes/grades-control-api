const express = require('express');
const fs = require('fs').promises;

const router = express.Router();

router.get('/', async (_, res) => {
    try {
        let data = await fs.readFile(global.fileName, 'utf8');
        let json = JSON.parse(data);
        delete json.nextId;
        res.send(json);
        logger.info(`GET /grades`);
    } catch (err) {
        res.status(400).send({ error: err.message });
        logger.error(`GET /grades - ${err.message}`);
    }
});

router.get('/:id', async (req, res) => {
    try {
        let data = await fs.readFile(global.fileName, 'utf8');
        let json = JSON.parse(data);
        const grade = json.grades.find(grade => grade.id === parseInt(req.params.id, 10));
        if (grade) {
            res.send(grade);
            logger.info(`GET /grade/:id - ${JSON.stringify(grade)}`);
        } else {
            res.end();
        }
    } catch (err) {
        res.status(400).send({ error: err.message });
        logger.error(`GET /grade/:id - ${err.message}`);
    }
});

router.post('/', async (req, res) => {
    let grade = req.body;
    try {
        let data = await fs.readFile(global.fileName, 'utf8');
        let json = JSON.parse(data);
        grade = { id: json.nextId++, ...grade, timestamp: new Date() };
        json.grades.push(grade);

        await fs.writeFile(global.fileName, JSON.stringify(json));
        res.end();

        logger.info(`POST /grades - ${JSON.stringify(grade)}`);

    } catch (err) {
        res.status(400).send({ error: err.message });
        logger.error(`POST /grades - ${err.message}`);
    }
});

router.put('/', async (req, res) => {
    try {
        let newGrade = req.body;
        let data = await fs.readFile(global.fileName, 'utf8');
        let json = JSON.parse(data);
        let oldIndex = json.grades.findIndex(grade => grade.id === newGrade.id);
        json.grades[oldIndex].student = newGrade.student;
        json.grades[oldIndex].subject = newGrade.subject;
        json.grades[oldIndex].type = newGrade.type;
        json.grades[oldIndex].value = newGrade.value;
        json.grades[oldIndex].timestamp = new Date();

        await fs.writeFile(global.fileName, JSON.stringify(json));
        res.end();
        logger.info(`PUT /grades - ${JSON.stringify(newGrade)}`);

    } catch (err) {
        res.status(400).send({ error: err.message });
        logger.error(`PUT /grades - ${err.message}`);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        let data = await fs.readFile(global.fileName, 'utf8');

        let json = JSON.parse(data);
        let grades = json.grades.filter(grade => grade.id !== parseInt(req.params.id, 10));
        json.grades = grades;

        await fs.writeFile(global.fileName, JSON.stringify(json));
        res.end();
        logger.info(`DELETE /grades/:id - ${req.params.id}`);

    } catch (err) {
        res.status(400).send({ error: err.message });
        logger.error(`DELETE /grades/:id - ${err.message}`);
    }
});

router.post('/totalGrade', async (req, res) => {
    try {
        let params = req.body;
        let data = await fs.readFile(global.fileName, 'utf8');
        let json = JSON.parse(data);

        let totalGrades = 0;
        json.grades.forEach(grade => {
            if ((grade.student === params.student) && (grade.subject === params.subject)) {
                totalGrades += grade.value;
            }
        });

        const result = `The sum of all grades in this subject from this student is ${totalGrades}`;
        res.send(JSON.stringify(result));
        logger.info(`POST /grades/totalGrade - ${JSON.stringify(params)} - result ${totalGrades}`);

    } catch (err) {
        res.status(400).send({ error: err.message });
        logger.error(`POST /grades/totalGrade - ${err.message}`);
    }
});

router.post('/averageGrade', async (req, res) => {
    try {
        let params = req.body;
        let data = await fs.readFile(global.fileName, 'utf8');
        let json = JSON.parse(data);

        let sumGrades = 0;
        let averageGrades = 0;
        let arrayAverageGrades = [];
        json.grades.forEach(grade => {
            if ((grade.subject === params.subject) && (grade.type === params.type)) {
                arrayAverageGrades.push(grade);
                sumGrades += grade.value;
                averageGrades = sumGrades / arrayAverageGrades.length;
            }
        });

        const result = `The average grade of this subject is ${averageGrades}`;
        res.send(JSON.stringify(result));

        logger.info(`POST /grades/averageGrade - ${JSON.stringify(params)} - result ${averageGrades}`);

    } catch (err) {
        res.status(400).send({ error: err.message });
        logger.error(`POST /grades/averageGrade - ${err.message}`);
    }
});

router.post('/topGrades', async (req, res) => {
    try {
        let params = req.body;
        let data = await fs.readFile(global.fileName, 'utf8');
        let json = JSON.parse(data);

        let arrayTopGrades = [];
        json.grades.forEach(grade => {
            if ((grade.subject === params.subject) && (grade.type === params.type)) {
                arrayTopGrades.push(grade);
            }
            arrayTopGrades.sort((a, b) => {
                return b.value - a.value;
            })
        });
        let slicedTopGrades = arrayTopGrades.slice(0, 3);
        res.send(JSON.stringify(slicedTopGrades));
        logger.info(`POST /grades/topGrades - ${JSON.stringify(params)} - result ${slicedTopGrades}`);

    } catch (err) {
        res.status(400).send({ error: err.message });
        logger.error(`POST /grades/topGrades - ${err.message}`);
    }
});

module.exports = router;