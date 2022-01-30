const sqlhandler=require("./database.js");
const hashgenerater=require('crypto');
const fs=require('child_process');
const convertbase64=require('base-64');
const errorcode=require('./database.js');
const ipaddr=require('ip');
const hostnamecheck=require('os');
const statichandler=require('node-static');
const MailerTest=require('./mailer.js')
const fstest=require('fs');
const setjwt=require('jwt-simple');
const checkemail=require('email-validator')
const tokengenerater=require('rand-token');
const httphandler=require('http');
const sessionArray=new Array();
const testArr=new Array();


MailerTest()
const MethodNotAllowed={'status':'Failed','message':"Method Not Allowed"}
const setArray=new Array();
const HashCalculator=(password,method)=>{
	if(method=="login"){
		['sha512','md5','sha256','sha224','sha384','sha1'].map(k=>{
			let l=hashgenerater.createHash(k);
			let mainhash=l.update(password).digest('hex')
			setArray.push(mainhash)
		})
	}
}
const logintime=new Array()

process.once('SIGUSR2', 
  function () { 
    process.kill(process.pid, 'SIGUSR2'); 
  }
);
const errormsg=`
	<html>
	<head>

	<meta http-equiv="refresh" content="20">
	<title>DatabaseError </title>
	</head>
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
 	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>

	<body>
		<div class"alert alert-danger"><center>
			<h3> Webmaster Database Connect Error 1024 Please Try Again later
			</h3></center></div>
			<br><br>
			<center><h1> 500 Internal Server Error </h1></center>
	</body>
	</html>
`

ConnectionServer=httphandler.createServer((req,resp)=>{
	if(sqlhandler.state == "disconnected"){
		resp.writeHead(500,{'Content-Type':'text/html'})
		resp.end(errormsg)
		return
	}else{

		resp.statusCode=200
		resp.setHeader('Content-Type','text/html');

		const urlendpoint={
			'':'index.html',
			'/admin':'build/index.html',
			'/login':'build/index.html',
			'/Database':'build/index.html',
			'/signout':'build/index.html',
			'/settings':'build/index.html',
			'/edit':'build/index.html'

		}

		
		const setheaders={
			'Access-Control-Allow-Origin':'*',
			'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,OPTIONS',
			'Access-Control-Allow-Headers':'Content-Type,Authorization,authorization,email,ticket_number,location',
			'Access-Control-Max-Age':259200,
			'Cache-Control':'no-cache must-revalidate'
		}
		k=setheaders
		k['Content-Type']="application/json";
		const newDate=new Date();


		function CreateJWToken(passwordformat,tokensize,firstname,lastname,password){

			let tokencreate
			if(tokensize=="jwt"){
				 tokencreate=setjwt.encode({'firstname':firstname,'lastname':lastname},'adminlocked','HS256')
				}else{
					tokencreate=hashgenerater.createHash(tokensize).update(convertbase64.encode(tokengenerater.generate(32))).digest('hex')
				}
			let passwordcreate=hashgenerater.createHash(passwordformat).update(password).digest('hex');
			return [tokencreate,passwordcreate]
		}

		let bodyparser="";
		const staticserver=new(statichandler.Server)('./public/static')
		if(req.url=='/login'){
			var reader=fstest.readFile(urlendpoint['/login'],(err,content)=>{
				resp.writeHead(200,{'Content-Type':'text/html'})
				resp.end(content)
			})
			return reader

			
		}
		else if(req.url=='/admin'){
			var reader=fstest.readFile(urlendpoint['/admin'],(err,content)=>{
				resp.writeHead(200,{'Content-Type':'text/html'})
				resp.end(content)
			})
			return reader
			
		}
		else if(req.url=='/Database'){
			var reader=fstest.readFile(urlendpoint['/Database'],(err,content)=>{
				resp.writeHead(200,{'Content-Type':'text/html'})
				resp.end(content)
			})
			return reader
			
		}
		else if(req.url=='/edit'){
			var reader=fstest.readFile(urlendpoint['/edit'],(err,content)=>{
				resp.writeHead(200,{'Content-Type':'text/html'})
				resp.end(content)
			})
			return reader
			
		}
		else if(req.url=='/signout'){
			var reader=fstest.readFile(urlendpoint['/signout'],(err,content)=>{
				resp.writeHead(200,{'Content-Type':'text/html'})
				resp.end(content)
			})
			return reader
			
		}
		else if(req.url=='/settings'){
			var reader=fstest.readFile(urlendpoint['/settings'],(err,content)=>{
				resp.writeHead(200,{'Content-Type':'text/html'})
				resp.end(content)
			})
			return reader
		
		}else{}
		var datamake='';

		if(req.url.toString().includes("/static/")){
			fstest.readFile(`build${req.url}`,(errtest,datatest)=>{
				datamake=''
				datamake+=datatest

				if(req.url.toString().endsWith(".js")){
					resp.writeHead(200,{'Content-Type':'application/javascript'})
					
				}
				else if(req.url.toString().endsWith(".css")){
					resp.writeHead(200,{'Content-Type':'text/css'})}
				else if(req.url.toString().endsWith(".map")){
					resp.writeHead(200,{'Content-Type':'text/map'})}
				else if(req.url.toString().endsWith(".jpeg")){
					resp.writeHead(200,{'Content-Type':'image/jpeg'})}
				else if(req.url.toString().endsWith(".jpg")){
					resp.writeHead(200,{'Content-Type':'image/jpg'})}
				else if(req.url.toString().endsWith(".webp")){
					resp.writeHead(200,{'Content-Type':'image/webp'})}
				else if(req.url.toString().endsWith(".png")){
					resp.writeHead(200,{'Content-Type':'image/png'})}
				else if(req.url.toString().endsWith(".txt")){
					resp.writeHead(200,{'Content-Type':'text/plain'})}
				else if(req.url.toString().endsWith(".json")){
					resp.writeHead(200,{'Content-Type':'application/json'})}
				
				else if(req.url.toString().endsWith(".ico")){
					resp.writeHead(200,{'Content-Type':'image/x-icon'})
				}
				resp.end(datatest,'utf-8')
				return
			})
			
		}

		if(req.method == "OPTIONS"){
			console.log("ok")
			resp.writeHead(204,setheaders);
			resp.end()
			return;
		}
		else if(req.url=="/user/admin/login"){
			if(req.method == "POST"){
				req.on('data',(data)=>{
					bodyparser+=data
					postlogin=JSON.parse(bodyparser)
					usernames=postlogin['username'];
					password=postlogin['password'];
					k['Access-Control-Allow-Methods']='POST,OPTIONS'
					let checksession;
					HashCalculator(password,"login")
					var auth=false;
					var data=null;
					let m=new Array();
						for(let i=0;i<=setArray.length;i++){
							sqlhandler.query(`SELECT * FROM admin WHERE username="${usernames}" AND password="${setArray[i]}";`,(err,result,fields)=>{
								try{
								if(result.length){
									 data=JSON.parse(JSON.stringify(result))[0]
									delete data['password']
									data['isAdmin']='True'
									lastyear=newDate.getFullYear();
									lastmonth=newDate.getMonth();
									lastday=newDate.getDay();
									// time
									hours=newDate.getHours();
									minutes=newDate.getMinutes();
									seconds=newDate.getSeconds();
									checksession=data
									const getlasttime=new Date().toISOString().split("T")
									logintime.push({[data['uid']]:`${getlasttime[0]} ${getlasttime[1].toString().split(".")[0]}`})
									
									m.push(data)

								}else{}}catch(e){console.log(e)}
							})
						}
					function LoginStatus(){
						return new Promise((resolve,reject)=>{
							const wl=setInterval(()=>{
							if(data!=null){
								resolve('x')
								clearInterval(wl)
							}reject("Wait")
						  })
						})
					}
					let checklogin=null;
					function setLogin(){
						const sessionuser=tokengenerater.generate(32);					
						sqlhandler.query(`UPDATE admin set session_id='${sessionuser}' where uid='${data['uid']}';`)
						let mainuid=data['uid'];
						const  jw={[mainuid]:sessionuser}
						sessionArray.push(jw)

						if(m.length){
							checklogin=true
							
						}else{
							checklogin=false
						}


					}
					setTimeout(()=>{
					LoginStatus().then(p=>{
						setLogin()
							
					}).catch(f=>console.log(f))
					if(m.length){
						resp.writeHead(200,k)
						resp.end(JSON.stringify({'status':'OK','message':'Success','data':[m[0]]}))
						m.length=0
						return;
					}else{
						resp.writeHead(401,k)
						resp.end(JSON.stringify({'status':'Failed','message':'Invalid Username or Password'}))
						return
					}},1700)
										
				});
			}else{
				resp.writeHead(405,k)
				resp.end(JSON.stringify(MethodNotAllowed))
				return 
			}
		}
		else if(req.url=="/user/admin/info"){
			if(req.method=="GET"){

				let authorizationheader=JSON.parse(JSON.stringify(req.headers))['authorization']
				const aa=sessionArray.map(u=>{return u[authorizationheader]})

				if(aa.length){
					sqlhandler.query(`SELECT * FROM admin WHERE uid='${authorizationheader}';`,(err,result,fields)=>{
						if(result!=null){
							const lastlogin=JSON.parse(JSON.stringify(result))[0]['last_login']
							const versiondb=fs.exec('mysql --version',(error,stdout,stdin)=>{
								if(error){
									console.log("Error Occured")
								}
							})
							let info=null;	
							const localip=ipaddr.address();
							const getclientip=req.socket.remoteAddress;
							fs.exec('uname -a',(result,stdout)=>{info=stdout.toString()})
							
							
							setTimeout(()=>{
								const mainDetails={
									'hostname':hostnamecheck.hostname(),
									'ip':ipaddr.address(),
									'Server_Version':info,
									'client_ip':getclientip,
									'last_login':lastlogin
								}
								resp.writeHead(200,k)
								resp.end(JSON.stringify({'status':'OK','message':'Success','info':mainDetails}))
								return 
							},200)
						}else{
							resp.writeHead(400,k)
							resp.end(JSON.stringify({'status':'Failed','message':'Authorization Token is Missing or Invalid'}));
							return
						}
					})
				}else{
					resp.writeHead(401,k)
					resp.end(JSON.stringify({'status':'Failed','message':'You are not Unauthorized'}))
					return
				}
													
			}else{
				resp.writeHead(405,k)
				resp.end(MethodNotAllowed)
				return;
			}
		}else if(req.url=="/user/admin/get"){
			if(req.method == "GET"){
				const mainHeaders=JSON.parse(JSON.stringify(req.headers))
				const authorization=mainHeaders['authorization']

				const aa=sessionArray.map(u=>{return u[authorization]})
				if(aa.length){

					const getemail=mainHeaders['email']
					sqlhandler.query(`SELECT * from admin where uid='${authorization}';`,(err,result,fields)=>{
						if(result.length!=0){
							sqlhandler.query(`SELECT ticket_number,reason,useraddress,status,location FROM complaint;`,(err,result,fields)=>{
								if(result!=null){
									resp.writeHead(200,k)
									const hr=result.map(o=>{
										if(o.reason==="TicketExpired"){
											o['First']="red"
											o['Second']="white"
										}else if(o.reason=="Selected"){
											o['First']="yellow"
											o['Second']="black"
										}else if(o.status=='Resolved'){
											o['First']='green'
											o['Second']='black'
										}else{
											o['First']='white'
											o['Second']='black'
										}

									})

									resp.end(JSON.stringify({'status':'OK','message':'Success','data':result}))
									return
								}
							})
						}else{
							resp.writeHead(401,k)
							resp.end(JSON.stringify({'status':'Failed','message':'Authorization Token is Missing or Invalid'}))
							return 
						}
					})
			}else{
					resp.writeHead(401,k)
					resp.end(JSON.stringify({'status':'Failed','message':'You are not Unauthorized'}))
					return
			}}
			else{
				resp.writeHead(405,k)
				resp.end(JSON.stringify(MethodNotAllowed))
				return 
			}

		}
		else if(req.url == "/user/admin/users"){
			if(req.method == "GET"){
				const authheader=JSON.parse(JSON.stringify(req.headers))['authorization']
				const aa=sessionArray.map(u=>{return u[authheader]})

				if(aa.length){
					sqlhandler.query(`SELECT * FROM admin where uid='${authheader}';`,(er1,res1,field1)=>{
						if(!er1){
							sqlhandler.query(`SELECT * FROM admin;`,(pl,cl,ml)=>{
								resp.writeHead(200,k)
								resp.end(JSON.stringify({'status':'OK','message':'Success','users':JSON.parse(JSON.stringify(cl))}))
								return 
							})
						}else{
							resp.writeHead(403,k)
							resp.end(JSON.stringify({'status':'Failed','message':'Authorization Token is Invalid'}))
							return
						}
					})
				}else{
					resp.writeHead(401,k)
					resp.end(JSON.stringify({'status':'Failed','message':'You are not Unauthorized'}))
					return
				}

			}else{
				resp.writeHead(405,k)
				resp.end(JSON.stringify({'status':'Failed','message':'Method Not Allowed'}))
				return
			}
		}
		else if(req.url == "/user/admin/delete"){
			if(req.method == "DELETE"){
				const maintest=JSON.parse(JSON.stringify(req.headers))
				const geturlauth=maintest['authorization']
				const aa=sessionArray.map(u=>{return u[geturlauth]})
				if(aa.length){

					const getticket=maintest['ticket_number']

					sqlhandler.query(`SELECT uid from admin where uid='${geturlauth}';`,(ee,pp,ll)=>{
						if(ee == null){
							sqlhandler.query(`DELETE FROM  complaint where ticket_number='${getticket}';`,(jj,ll,pp)=>{

								resp.writeHead(204,k);
								resp.end();
								return
							})
						}else{
							resp.writeHead(401,k)
							resp.end(JSON.stringify({'status':'Failed','message':'You are not Authorized for Deleting this Ticket'}))
							return 
						}
					})
				}else{
					resp.writeHead(401,k)
					resp.end(JSON.stringify({'status':'Failed','message':'You are not Unauthorized'}))
					return
				}

			}else{
				resp.writeHead(405,k)
				resp.end(JSON.stringify(MethodNotAllowed))
				return
			}
		}
		else if(req.url=="/user/admin/create"){
			if(req.method=="POST"){
				const getauthtoken=JSON.parse(JSON.stringify(req.headers))
				const mainauth=getauthtoken['authorization']
				const aa=sessionArray.map(u=>{return u[mainauth]})
				if(aa.length){

				sqlhandler.query(`SELECT * FROM admin where uid='${mainauth}';`,(ll1,ll2,ll3)=>{
					if(!ll1){
					body='';
					req.on('data',(data)=>{
						bodyparser+=data
						admincheck=JSON.parse(bodyparser)
						firstname=admincheck['firstname'];
						lastname=admincheck['lastname'];	
						passwordformat=admincheck['passwordformat'];
						passwords=admincheck['passwords'];
						role=admincheck['role'];
						tokensize=admincheck['tokensize'];
						username=admincheck['username'];
						if(checkemail.validate(username)==true){
							 if(['sha512','sha224','sha256','md5','sha384'].indexOf(passwordformat)!=-1){
									console.log(['sha512','jwt'].indexOf(tokensize.toString()))

							 	if(['sha512','jwt'].indexOf(tokensize.toString())!=-1){
							 		const gettokensadmin=CreateJWToken(passwordformat,tokensize,firstname,lastname,passwords)
							 		sqlhandler.query(`SELECT count(*) FROM admin;`,(p1,p2,p3)=>{
							 			if(JSON.parse(JSON.stringify(p2))[0]['count(*)'] < 5){
							 				sqlhandler.query(`SELECT * FROM admin where username='${username}';`,(k1,k2,k3)=>{
								 			if(JSON.parse(JSON.stringify(k2)).length == 0){

								 				sqlhandler.query(`INSERT INTO admin(username,password,uid,isAdmin,last_login,session_id)VALUES('${username}','${gettokensadmin[1]}','${gettokensadmin[0]}','True','0000-00-00 00:00:00','0');`,(q1,q2,q3)=>{	

										 			if(!q1){
										 				resp.writeHead(201,k)
										 				resp.end(JSON.stringify({'status':'OK','message':'Admin User Created'}))
										 				return
										 			}else{
										 				resp.writeHead(400,k)
										 				resp.end(JSON.stringify({'status':'Failed','message':'Something is Wrong with our server Please try again'}))
										 				return
										 			}
										 		})
								 			}else{
								 				resp.writeHead(400,k)
								 				resp.end(JSON.stringify({'status':'Failed','message':'Admin User Exists'}))
								 				return
								 			}
								 		})
							 		  }else{
							 		  	resp.writeHead(422,k);
							 		  	resp.end(JSON.stringify({'status':'Failed','message':'Exceed Limit for Creating Users'}))
							 		  	return
							 		  }
							 		})
							 		
							 	}else{
							 		resp.writeHead(422,k)
							 		resp.end(JSON.stringify({'status':'Failed','message':'Invalid Token Format'}))
							 		return
							 	}
							 }
							 else{
							 	resp.writeHead(422,k)
							 	resp.end(JSON.stringify({'status':'Failed','message':'Invalid Password Format'}))
							 	return
							 }

						}else{
							resp.writeHead(400,k)
							resp.end(JSON.stringify({'status':'Failed','message':'Invalid Email Address'}))
							return
							}
						})
					}
				})
			}else{
				resp.writeHead(401,k)
				resp.end(JSON.stringify({'status':'Failed','message':'You are not Unauthorized'}))
				return
			}
		}

			else{
					resp.writeHead(405,k)
					resp.end(JSON.stringify(MethodNotAllowed))
					return
				}
		}
		else if(req.url=="/logout"){
			if(req.method == "GET"){
				const logouttoken=JSON.parse(JSON.stringify(req.headers))['authorization']

				sqlhandler.query(`SELECT * FROM admin where uid='${logouttoken}';`,(h1,h2,h3)=>{
					const test=JSON.parse(JSON.stringify(h2))
					try{
					if(test[0]['uid']){

						const checkindexlogin=logintime[logintime.findIndex(jk=>jk[[test[0].uid]])]
						sqlhandler.query(`UPDATE admin set session_id='0' where uid='${logouttoken}';`,(a1,a2,a3)=>{
							if(!a1){

								try{
								sqlhandler.query(`UPDATE admin set last_login='${checkindexlogin[logouttoken]}' where username='${usernames}';`)
								sessionArray.findIndex(o=>{
									sessionArray.pop(o[logouttoken])
								})}catch(e){}
								resp.writeHead(204,k)
								resp.end()
								return
								}
							})
						}
						else{
								resp.writeHead(401,k)
								resp.end({'status':'Failed','message':'You are Not Authorized'})
								return
							}

					}catch(e){
						console.log(e)
						resp.writeHead(204,k)
						resp.end()
						return
					}
					
				})
			}else{
				resp.writeHead(405,k)
				resp.end(JSON.stringify(MethodNotAllowed))
				return 
			}
		}
		else if(req.url=="/user/admin/status"){
			if(req.method == "GET"){
				const getauth=JSON.parse(JSON.stringify(req.headers))['authorization']
				const aa1=sessionArray.map(u=>{return u[getauth]})
				let totalticket=0;
				let totalnew=0;
				let totalexpire=0;
				let totalresolved=0;
				let totalprocessing=0;
				let totalpending=0;
				var h=null;

				//south
				var southtotalticket=0;
				var southtotalpending=0;
				var southtotalexpire=0;
				var southtotalresolved=0
				var southnew=0
				var southtotalprocessing=0
				
				//north
				var northtotalticket=0
				var northtotalpending=0
				var northtotalexpire=0
				var northtotalresolved=0
				var northtotalprocessing=0
				var northnew=0

				//east



				var easttotalticket=0
				var easttotalpending=0
				var eastnew=0
				var easttotalexpire=0
				var easttotalresolved=0
				var easttotalprocessing=0

				//west
				var westtotalticket=0
				var westtotalpending=0
				var westnew=0;
				var westtotalexpire=0
				var westtotalprocessing=0
				var westtotalresolved=0

				//new ticket
				var uni=null
				var checktime=new Array()
				sqlhandler.query(`SELECT uid from admin where uid='${getauth}';`,(e1,e2,e3)=>{
					if(!e1){
						const test=sqlhandler.query(`SELECT ticket_number,status,isNew,location,reason,receivetime,region FROM complaint;`,(o1,o2,o3)=>{
							h=JSON.parse(JSON.stringify(o2))
							totalticket=h.length;
								h.map(k=>{
									if(k.isNew==='True'){
										totalnew+=1
									}
									if(k.status==="Resolved"){
										totalresolved+=1
									}
									else if(k.status==="Processing"){
										totalprocessing+=1;
									}
									else if(k.reason==="Waiting"){
										totalpending+=1;
									}
									else if(k.status==='0000-00-00'){
										totalexpire+=1;
									}
									else{}

								})
								sqlhandler.query(`SELECT count(*) FROM complaint where region='south';`,(j1,j2,j3)=>{
									southtotalticket=JSON.parse(JSON.stringify(j2))['count(*)']
								})
								sqlhandler.query(`SELECT count(*) FROM complaint where region='north';`,(j1,j2,j3)=>{
									northtotalticket=JSON.parse(JSON.stringify(j2))['count(*)']
								})
								sqlhandler.query(`SELECT count(*) FROM complaint where region='east';`,(j1,j2,j3)=>{
									easttotalticket=JSON.parse(JSON.stringify(j2))['count(*)']
								})
								sqlhandler.query(`SELECT count(*) FROM complaint where region='west';`,(j1,j2,j3)=>{
									westtotalticket=JSON.parse(JSON.stringify(j2))['count(*)']
								})
								//region wise
								h.map(o=>{
									if(o.region=='south' && o.reason=='Waiting'){
										southtotalpending+=1
										southnew+=1

									}else if(o.region=='south' && o.status=='Resolved'){
										southtotalresolved+=1
									}
									else if(o.region=="south" && o.status=='Processing'){
										southtotalprocessing+=1
									}
									else if(o.region=='north' && o.status=='Resolved'){
										northtotalresolved+=1
									}
									else if(o.region=="north" && o.reason=='Waiting'){
										northtotalpending+=1
										northnew+=1
									}
									else if(o.region=="north" && o.status=='Processing'){
										northtotalprocessing+=1
									}
									else if(o.region=="east" && o.reason=='Waiting'){
										easttotalpending+=1
										eastnew+=1
									}
									else if(o.region=="east" && o.status=='Processing'){
										easttotalprocessing+=1
									}
									else if(o.region=="east" && o.status=='Resolved'){
										easttotalresolved+=1
									}
									else if(o.region=="west" && o.reason=='Waiting'){
										westtotalpending+=1
										westnew+=1
									}
									else if(o.region=="west" && o.status=='Resolved'){
										westtotalresolved+=1
									}
									else if(o.region=="west" && o.status=='Processing'){
										westtotalprocessing+=1
									}

									else{}
								})					
							// one date or single day total query
							
							let runTest=null;
							h.map(k=>{
								let totalcounts=0
								let counts=0
								var newcounts=new Array()

								let jam=new Date()
								let oow=new Date(parseInt(k.receivetime));
								let chk=new Date(oow.getUTCFullYear(),oow.getMonth(),oow.getDay())
							  	
								const setCounter=(hl)=>{
									newcounts.push(hl)
								}
								h.map(i=>{
									
								if(parseInt(i.receivetime)!=parseInt(k.receivetime)){

									let w1=new Date(parseInt(i.receivetime));
									let w2=new Date(w1.getUTCFullYear(),w1.getMonth(),w1.getDay())

									if((chk < w2)==false && (chk >w2)==false){
										counts+=1
										sqlhandler.query(`SELECT count(*) from complaint where receivetime='${i.receivetime}' and reason='Waiting';`,(o5,o6,o7)=>{
											const hl=JSON.parse(JSON.stringify(o6))[0]['count(*)']
											setCounter(hl)
										})
									}
								}
								if(parseInt(i.receivetime)===parseInt(k.receivetime)){
									counts+=1
								  }
								})
								runTest=function(){
									return new Promise((resolve,reject)=>{
										const setinter=setTimeout(()=>{
											if(newcounts.length){
												resolve("resolved")
												clearInterval(setinter)
											}reject("failed")
									  },2200)
									})
								}

								runTest().then(hw=>{
									checktime.push({'time':k.receivetime,'total':counts,'new':newcounts})
									counts=0
									 uni=[...new Map(checktime.map(item=>[item['total'],item])).values()]
									testArr.push({'total':totalticket,'pending':totalpending,'expire':totalexpire,'new':totalnew,'resolved':totalresolved,'processing':totalprocessing})
									testArr.push({'southp':southtotalprocessing,'southr':southtotalresolved,'southw':southtotalpending,'southnew':southnew})
									testArr.push({'northp':northtotalprocessing,'northr':northtotalresolved,'northw':northtotalpending,'northnew':northnew})
									testArr.push({'eastp':easttotalprocessing,'eastr':easttotalresolved,'eastw':easttotalpending,'eastnew':eastnew})
									testArr.push({'westp':westtotalprocessing,'westr':westtotalresolved,'westw':westtotalpending,'westnew':westnew})						
							    }).catch((e)=>{
							  		console.log(e)
							    })
							})
							let k;
							let wg;
							const supertest=setInterval(()=>{					
								if(uni!=null){
									let sum=0
									uni.map(l=>{
										for(let i=0;i<=l['new'].length-1;i++){
											if(l['new'].length !=0){
												sum+=l['new'][i]
											}
										}
										l['new']=sum
										sum=0
									})
									wg=uni.sort((x,y)=>{
										return x.time-y.time
									})
									k=true;
									clearInterval(supertest)
												 

								}else{k=false}							
							})

						setTimeout(()=>{
						if(k==true){
							resp.writeHead(200,k)
							resp.end(JSON.stringify({'status':'OK','message':'Success','data':[testArr[0],h,testArr[1],testArr[2],testArr[3],testArr[4],wg]}))
							return	
						}
						else{resp.writeHead(500,k)
						resp.end(JSON.stringify({'status':'OK','message':'Something is Wrong with our server'}))
						return}

						},2500)})
					}else{

					}
				})

			}else{
				resp.writeHead(405,k)
				resp.end(JSON.stringify(MethodNotAllowed))
				return 
			}
		}
		else{}
	}
});
ConnectionServer.listen(process.env.PORT||8888)
ConnectionServer.timeout=4000
