const express = require("express")
const bodyPasrer = require('body-parser')
const date = require(__dirname + "/date.js")
const app = express();
app.use(bodyPasrer.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');

const Items = ["item1", "item2", "item3"];
const workItems = [];

app.get("/", function (req, res) {
    const day = date.getDate();
    res.render('list', { listTitle: day, newListItems: Items })
})

app.post("/", function (req, res) {

    const Item = req.body.newItem;

    if (req.body.list === "Work") {
        workItems.push(Item);
        res.redirect("/work")
    } else {
        console.log(req.body);
        Items.push(Item);
        res.redirect("/");
    }

})
app.get("/work", function (req, res) {
    res.render("list", { listTitle: "Work List", newListItems: workItems })
})

app.get("/about", function (req, res) {
    res.render("about", {})
})

app.listen(3000, function () {
    console.log("Server Started Succesfully on port 3000");
})
