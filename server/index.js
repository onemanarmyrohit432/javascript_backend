var express = require("express");
var cors = require("cors");
var mongoClient = require("mongodb").MongoClient;

var conString = "mongodb://127.0.0.1:27017";

var app = express();

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get("/users",(req,res)=>{
    mongoClient.connect(conString).then((clientObj)=>{
        var database = clientObj.db("projectNew");
        database.collection("tblusers").find({}).toArray().then((docs)=>{
            res.send(docs);
            res.end();
        })
    })
});

// app.get("/admin",(req,res)=>{
//     mongoClient.connect(conString).then((clientObj)=>{
//         var database = clientObj.db("projectNew");
//         database.collection("tbladmins").find({}).toArray().then((docs)=>{
//             res.send(docs);
//             res.end();
//         })
//     })
// });

app.get("/tasks",(req,res)=>{
    mongoClient.connect(conString).then((clientObj)=>{
        var database = clientObj.db("projectNew");
        database.collection("tbltask").find({}).toArray().then((docs)=>{
            res.send(docs);
            // console.log(docs)
            res.end();
        })
    })
});

app.get("/task/:id", (req, res)=>{
    var id = parseInt(req.params.id);
    mongoClient.connect(conString).then((clientObj)=>{
        var database = clientObj.db("projectNew");
        database.collection("tbltask").find({TaskID:id}).toArray().then((docs)=>{
            res.send(docs);
            res.end();
        })
    })
});

app.post("/adduser",(req,res)=>{
    var user = {
        UserID: req.body.UserID,
        UserName:req.body.UserName,
        UserEmail:req.body.UserEmail,
        UserMobile:req.body.UserMobile,
        UserPassword:req.body.UserPassword
    };``

    mongoClient.connect(conString).then((clientObj)=>{
        var database = clientObj.db("projectNew");
        database.collection("tblusers").insertOne(user).then(()=>{
            console.log("User Added Successfully....");
            res.redirect("/users");
            res.end();
        })
    })
});

app.post("/addtask", (req, res)=>{
    var task = {
        TaskID:parseInt(req.body.TaskID),
        Title:req.body.Title,
        Date:req.body.Date,
        Description:req.body.Description
    };
    mongoClient.connect(conString).then((clientObj)=>{
        var database = clientObj.db("projectNew");
        database.collection("tbltask").insertOne(task).then(()=>{
            console.log("Task Added Successfully......");
            res.redirect("/tasks");
            res.end();
        })
    })
});

app.put("/updatetask/:id",(req,res)=>{
    var id = parseInt(req.params.id);
    console.log(req.params.id);

    mongoClient.connect(conString).then((clientObj)=>{
        var database = clientObj.db("projectNew");
        database.collection("tbltask").updateOne({TaskID:id},{$set:{TaskID:parseInt(req.body.TaskID),
        Title:req.body.Title,
        Date:req.body.Date,
        Description:req.body.Description}}).then(()=>{
            console.log("Task Updated");
            res.end();
        })
    })
});

app.delete("/deletetask/:id",(req,res)=>{
    var id = parseInt(req.params.id);
    mongoClient.connect(conString).then((clientObj)=>{
        var database = clientObj.db("projectNew");
        database.collection("tbltask").deleteOne({TaskID:id}).then(()=>{
            console.log("Task Deleted.....");
            res.end();
        })
    })
})

app.listen(8115);
console.log(`Server Started : http://127.0.0.1:8115`);