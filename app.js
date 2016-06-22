var moment = require("moment");
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/sendi');
var Log = require('./models/log');
var router = express.Router();

router.use(function (req, res, next) {
  console.log('Request Type:', req.method);
  console.log('Time:', Date.now());
  next();
});

router.get('/hw', function (req, res) {
    res.send("Hello World!");
    //res.json({ message: 'Hello World!' });   
});

router.route('/logs')
    .post(function(req, res) {
        var log = new Log();
        log.name = req.body.name;

        log.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Log created!' });
        });        
    })
    .get(function(req, res) {
        Log.find(function(err, logs) {
            if (err)
                res.send(err);

            res.json(logs);
        });
    });    

router.route('/logs/:log_id')
    .get(function(req, res) {
        Log.findById(req.params.log_id, function(err, log) {
            if (err)
                res.send(err);
            res.json(log);
        });
    })
    .put(function(req, res) {
        Log.findById(req.params.log_id, function(err, log) {

            if (err)
                res.send(err);

            log.name = req.body.name; // update info

            log.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Log updated!' });
            });
        });
    })
    .delete(function(req, res) {
        Log.remove({
            _id: req.params.log_id
        }, function(err, log) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

router.route('/send_push')
    .post(function(req, res) {

        //first send push

        //then log it
        var log = new Log();
        log.destinations = req.body.destinations;
        log.is_silent = req.body.is_silent;
        log.os_list = req.body.os_list;
        log.message = req.body.message;
        log.type = 'send_push';
        log.occurance = moment().toISOString();

        log.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'send push completed' });
        });        
    });

app.use('/api', router);

var server = app.listen(3000, function () {
    console.log("Listening on port %s...", server.address().port);
});