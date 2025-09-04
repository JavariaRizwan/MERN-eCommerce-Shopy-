const express=require("express");
const connection=require("./connectionDB/connectDB");
const router=require("./routes/user-router");
const adminRouter=require("./routes/admin-router");

const path = require("path"); // ✅ ADD THIS LINE

const app=express();
const cors=require("cors");
app.use(express.json());

app.use(cors({
origin:'http://localhost:5173',
methods:["PUT","PATCH","DELETE","OPTIONS","POST","GET"],
headers:["Content-Type","Authorization"],
credentials:true

}));

//app.use("/uploads", express.static("uploads"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/admin", adminRouter)
app.use("/api", router);



const PORT=5000;
connection.then(()=>{
    console.log("Database Connection Successful");
app.listen(PORT, ()=>{
    console.log(`App is running on port ${PORT}`); });
}).catch((error)=>{
console.log("Database Connection Failed", error.message);

})