const express = require("express");

const db = require("./config/mongoose");

const Registration = require("./models/Registration");

const port = 8001;

const app = express();

app.use(express.urlencoded());

app.post("/insertData", async (req, res) => {
    try {
        // console.log(req.body);
        let checkmail = await Registration.findOne({ email: req.body.email });
        if (checkmail) {
            return res
                .status(400)
                .json({ msg: "Email already exist", status: 0 });
        } else {
            if (req.body.password == req.body.confirm_pass) {
                let registrationData = await Registration.create(req.body);
                if (registrationData) {
                    return res
                        .status(200)
                        .json({ msg: "Data inserted successfully", status: 1 });
                } else {
                    return res
                        .status(400)
                        .json({ msg: "Data not found", status: 0 });
                }
            } else {
                return res
                    .status(400)
                    .json({ msg: "Password not match", status: 0 });
            }
        }
    } catch (err) {
        console.log(err);
        return res.status(400).json({ msg: "Something went wrong", status: 0 });
    }
});

app.get("/getAllData", async (req, res) => {
    try {
        let allData = await Registration.find({});
        if (allData) {
            return res.status(200).json({
                msg: "Data find successfully",
                status: 1,
                allData: allData,
            });
        } else {
            return res.status(400).json({ msg: "Data not found", status: 0 });
        }
    } catch (err) {
        console.log(err);
        return res.status(400).json({ msg: "Something went wrong", status: 0 });
    }
});

app.delete("/deleteData", async (req, res) => {
    try {
        if (req.query.id) {
            let deletedData = await Registration.findByIdAndDelete(
                req.query.id
            );
            if (deletedData) {
                return res.status(200).json({
                    msg: "Data deleted successfully",
                    status: 1,
                    deletedData: deletedData,
                });
            } else {
                return res
                    .status(400)
                    .json({ msg: "Data not deleted", status: 0 });
            }
        } else {
            return res.status(400).json({ msg: "Data not found", status: 0 });
        }
    } catch (err) {
        console.log(err);
        return res.status(400).json({ msg: "Something went wrong", status: 0 });
    }
});

app.put("/updateData/:id", async (req, res) => {
    try {
        if (req.params.id) {
            let updatedData = await Registration.findByIdAndUpdate(
                req.params.id,
                req.body
            );
            // console.log(updatedData);
            if (updatedData) {
                return res.status(200).json({
                    msg: "Data updated successfully",
                    status: 1,
                    updatedData: updatedData,
                });
            } else {
                return res
                    .status(400)
                    .json({ msg: "Data not updated", status: 0 });
            }
        } else {
            return res.status(400).json({ msg: "Data not found", status: 0 });
        }
    } catch (err) {
        console.log(err);
        return res.status(400).json({ msg: "Something went wrong", status: 0 });
    }
});

app.patch("/editrecord/:id", async (req, res) => {
    try {
        let editdate = await register.findByIdAndUpdate(
            req.params.id,
            req.body
        );
        if (editdate) {
            return res.status(200).json({
                mes: "Record Edit sunncssfully",
                status: 1,
                Record: editdate,
            });
        } else {
            return res
                .status(400)
                .json({ mes: "Record Not Found ", status: 0 });
        }
    } catch (error) {
        console.log(error);
    }
});

app.listen(port, (err) => {
    err
        ? console.log("Server not responding")
        : console.log(`Server respond successfully at port: ${port}`);
});
