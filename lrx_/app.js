var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var app = express(); // instance of express
var config = require('./config');
var cors = require('cors')
var requestify = require('requestify');
// mongoose.connect(config.database, function(err) {
// 	if(err) {
// 		console.log(err);
// 	} else {
// 		console.log("Connected to the database");
// 	}
// });
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 1000000
})); // { extended: true} to parse everything.if false it will parse only String
app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(cors())
app.get('/gettokentx', function(req, res) {
    //  console.log(req.query)
    var add = req.query.address;
    //  console.log(add)http://api.etherscan.io/api?module
    var url = 'http://api.etherscan.io/api?module=account&action=tokentx&address=' + add + '&sort=asc&apikey=6SW7M5DECW99DEDGDGEU4Y9Y49W2EH9NC7';
    // console.log(url)
    // requestify.get(url),
    //     function(err, suc) {
    //         console.log("dd");
    //         if (err) {
    //             res.json({
    //                 success: 0,
    //                 message: err
    //             });
    //         } else {
    //             res.json({
    //                 success: 1,
    //                 message: suc
    //             });
    //         }
    //         // Get the response body

    //     }
    requestify.get(url).then(function(response) {
        // Get the response body
        //  console.log(response);
        var x = response.getBody();
        res.json({
            success: 1,
            message: x
        });
    });
});


// })

app.get('/getdata', function(req, res) {
    //res.send("started")
    console.log(req.body)



    data.find({}, function(err, value) {
        if (err) {
            res.json({
                success: 0,
                message: "Could not get Popular Topics"
            });
            return
        } else {
            res.json({
                success: 1,
                data: value
            });
        }

    }).sort({
        datetime: -1
    }).limit(1)




})
app.post('/setdata', function(req, res) {

    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        var oldpath = files.filetoupload.path;
        var newpath = '/home/pc/Desktop/jagveer/node/' + files.filetoupload.name;
        fs.rename(oldpath, newpath, function(err) {
            if (err) {
                throw err;
            }
            //res.write('File uploaded and moved!');
            //res.end();
            else {
                res.status(200).json({
                    url: '/home/pc/Desktop/jagveer/node/' + files.filetoupload.name
                })
            }

        });
    });
})

app.post('/login', function(req, res) {
    console.log(req.body)
    res.status(200).json({
            url: '/home/pc/Desktop/jagveer/node/' + files.filetoupload.name
        })
        //   var form = new formidable.IncomingForm();
        //     form.parse(req, function (err, fields, files) {
        //       var oldpath = files.filetoupload.path;
        //       var newpath = '/home/pc/Desktop/jagveer/node/' + files.filetoupload.name;
        //       fs.rename(oldpath, newpath, function (err) {
        //         if (err) {
        //           throw err;
        //         }
        //         //res.write('File uploaded and moved!');
        //         //res.end();
        //         else{
        //           res.status(200).json({
        //             url:'/home/pc/Desktop/jagveer/node/' + files.filetoupload.name
        //           })
        //         }

    //       });
    //  });
})

// ---------------------------------------------------------------------------
app.get('/json', function(req, res) {
    // use this command to run the file
    // node --max-old-space-size=8192 api.js
    mongoose.connect(config.database, function(err, db) {
        if (err) throw err;


        // var dbo = db.db("mydb");
        // var query = { address: "Park Lane 38" };
        db.collection('products').find({}).toArray(function(err, result) {
            if (err) {
                throw err;
            } else {
                console.log(result.length);
                console.log("Connected to the db");
                let data = JSON.stringify(result, null, 2);
                // console.log(data)
                // res.send({
                //         status: data
                //       })
                fs.writeFile('student-3.json', data, (err) => {
                    if (err) {
                        throw err;
                    } else {
                        console.log('Data written to file');
                        res.send({
                            status: 1
                        })
                    }

                });
            }
            //   db.close();
        });
    });


})

app.get('/dsd', function(req, res) {

        console.log('in')

        // Remove header
        let base64Image = base64String.split(';base64,').pop();
        fs.writeFile('new.png', base64Image, { encoding: 'base64' }, function(err) {
            console.log('File created');
        });
    })
    // var base64str = base64_encode('kitten.jpg');
    // ----------------------------------------------------------------------------

app.get('/abc', function(req, res) {

    console.log('in')
        // // Remove header
        // let base64Image = base64String.split(';base64,').pop();
        // fs.writeFile('desq.png', base64Image, {encoding: 'base64'}, function(err) {
        //   console.log('File created');
        // });
    var base64str = base64_encode('board.png');
    console.log(base64str)
    res.send({
        abc: base64str
    })
})


function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}



app.listen(3003, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Listening on port 3003");
    }
});