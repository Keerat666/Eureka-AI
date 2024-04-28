let express = require('express');
    let router = express.Router();
    let crud = require('../middlewares/tidb_crud');
    const Project = require('../models/topics');
    
    router.get('/test', function(req, res) {
        res.send('Route is Up and Running.');
    });
    
    router.post('/createTable', function(req, res) {
        crud.createTable(req, res, Project)
    });
    
    router.post('/insertRecord', function(req, res) {
        crud.createEntry(req, res, req.query.tableName)
    });
    
    router.get('/all', function(req, res) {
        crud.getAllEntries(req, res, req.query.tableName)
    });
    
    router.get('/ByID', function(req, res) {
        crud.getEntryByID(req, res, req.query.tableName)
    });
    
    router.put('/edit', function(req, res) {
        crud.updateEntryByID(req, res, UserModel,req.query.tableName);
    });
    
    router.delete('/delete', function(req, res) {
        crud.deleteEntryByID(req, res, req.query.tableName);
    });
    
    module.exports = router;