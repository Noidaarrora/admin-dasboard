const mysqlhandler=require("mysql");

const connectionhandler=mysqlhandler.createConnection({
		host:'',
		user:'',
		password:'',
		port:3306,
		database:""
			});
	connectionhandler.connect((err)=>{
		console.log(err)
		if(!err){
			console.log("DB connected");
		}else{console.log("DB Connection Error")}
	});



module.exports=connectionhandler;
