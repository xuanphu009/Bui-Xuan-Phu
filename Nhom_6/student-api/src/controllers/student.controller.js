const service=require("../services/student.service");


exports.createStudent=async(req,res,next)=>{
try{

const student=
await service.createStudent(req.body);

res.status(201).json(student);

}catch(error){
next(error);
}
};



exports.getStudents=async(req,res,next)=>{

try{

const pageValue=parseInt(req.query.page,10);
const limitValue=parseInt(req.query.limit,10);

const page=pageValue>0 ? pageValue : 1;

const limit=limitValue>0 ? limitValue : 5;

const major=req.query.major;

const result=
await service.getStudents(
page,
limit,
major
);

res.json(result);

}catch(error){
next(error);
}

};



exports.getStudent=async(req,res,next)=>{

try{

const student=
await service.getStudentById(
req.params.id
);

if(!student){
return res.status(404)
.json({
message:"Student not found"
});
}

res.json(student);

}catch(error){
next(error);
}

};



exports.updateStudent=async(req,res,next)=>{

try{

const student=
await service.updateStudent(
req.params.id,
req.body
);

if(!student){
return res.status(404)
.json({
message:"Student not found"
});
}

res.json(student);

}catch(error){
next(error);
}

};



exports.deleteStudent=async(req,res,next)=>{

try{

const student=
await service.softDelete(
req.params.id
);

if(!student){
return res.status(404)
.json({
message:"Student not found"
});
}

res.json({
message:"Soft deleted"
});

}catch(error){
next(error);
}

};



exports.updateScore=async(req,res,next)=>{

try{

const score=Number(req.body.score);

if(!Number.isFinite(score) || score<0 || score>100){

return res.status(400)
.json({
message:"Invalid score"
});

}

const student=
await service.updateScore(
req.params.id,
score
);

if(!student){

return res.status(404)
.json({
message:"Student not found"
});

}

res.json(student);

}catch(error){
next(error);
}

};



exports.topStudents=async(req,res,next)=>{

try{

const limitValue=
parseInt(req.query.limit,10);

const limit=
limitValue>0 ? limitValue : 5;

const result=
await service.topStudents(limit);

res.json(result);

}catch(error){
next(error);
}

};



exports.avgScore=async(req,res,next)=>{

try{

const result=
await service.averageScore();

res.json({
averageScore:
result[0]?.average ?? 0
});

}catch(error){
next(error);
}

};



exports.search=async(req,res,next)=>{

try{

const q=(req.query.q || "").trim();

if(!q){
return res.status(400).json({
message:"Query q is required"
});
}

const result=
await service.searchStudents(q);

res.json(result);

}catch(error){
next(error);
}

};