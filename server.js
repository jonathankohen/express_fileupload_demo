const express = require('express'),
    file_upload = require('express-fileupload');

const app = express();

app.use(file_upload());

// upload endpoint
app.post('/upload', (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ msg: 'No file was uploaded' });
    }

    const file = req.files.file;

    file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }

        res.json({ file_name: file.name, file_path: `/uploads/${file.name}` });
    });
});

app.listen(5000, () => console.log(`Listening on port 5000`));
