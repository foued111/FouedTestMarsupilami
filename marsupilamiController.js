const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('marsupilami');

router.get('/', (req, res) => {
    res.render("employee/addOrEdit", {
        viewTitle: "Insert Employee"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var marsupilami = new marsupilami();
    marsupilami.id=req.body.id;
    marsupilami.age = req.body.age;
    marsupilami.famille = req.body.famille;
    marsupilami.race = req.body.race;
    marsupilami.nourriture = req.body.nourriture;
    marsupilami.save((err, doc) => {
        if (!err)
            res.redirect('marsupilami/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: "Insert marsupilami",
                    marsupilami: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Employee.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('marsupilami/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("marsupilami/addOrEdit", {
                    viewTitle: 'Update marsupilami',
                    employee: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    marsupilami.find((err, docs) => {
        if (!err) {
            res.render("marsupilami/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving marsupilami list :' + err);
        }
    });
});



router.get('/:id', (req, res) => {
    Employee.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("marsupilami/addOrEdit", {
                viewTitle: "Update marsupilami",
                employee: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/marsupilami/list');
        }
        else { console.log('Error in marsupilami delete :' + err); }
    });
});

module.exports = router;