const Student=require("../models/student.model");


exports.createStudent=(data)=>{
 return Student.create(data);
};


exports.getStudents=async(page,limit,major)=>{

let filter={
isActive:true
};

if(major){
filter.major=major;
}

let skip=(page-1)*limit;

const students=await Student.find(filter)
.skip(skip)
.limit(limit);

const total=await Student.countDocuments(filter);

return {
total,
page,
students
};

};


exports.getStudentById=(id)=>{
return Student.findOne({
_id:id,
isActive:true
});
};


exports.updateStudent=(id,data)=>{
return Student.findOneAndUpdate(
{
_id:id,
isActive:true
},
data,
{
new:true,
runValidators:true
}
);
};


exports.softDelete=(id)=>{
return Student.findOneAndUpdate(
{
_id:id,
isActive:true
},
{isActive:false},
{new:true}
);
};


exports.updateScore=(id,score)=>{
return Student.findOneAndUpdate(
{
_id:id,
isActive:true
},
{score},
{
new:true,
runValidators:true
}
);
};


exports.topStudents=(limit)=>{
return Student.find({isActive:true})
.sort({score:-1})
.limit(limit);
};


exports.averageScore=async()=>{

return Student.aggregate([
{
$match:{
isActive:true
}
},
{
$group:{
_id:null,
average:{
$avg:"$score"
}
}
}
]);

};


exports.searchStudents=(keyword)=>{
return Student.find({
isActive:true,
name:{
$regex:keyword,
$options:"i"
}
});
};