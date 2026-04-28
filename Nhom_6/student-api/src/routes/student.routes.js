const router=require("express").Router();

const controller=
require("../controllers/student.controller");

const validateId=
require("../middlewares/validateObjectId");


router.post(
"/",
controller.createStudent
);

router.get(
"/",
controller.getStudents
);

router.get(
"/top",
controller.topStudents
);

router.get(
"/stats/avg",
controller.avgScore
);

router.get(
"/search",
controller.search
);

router.get(
"/:id",
validateId,
controller.getStudent
);

router.put(
"/:id",
validateId,
controller.updateStudent
);

router.delete(
"/:id",
validateId,
controller.deleteStudent
);

router.patch(
"/:id/score",
validateId,
controller.updateScore
);

module.exports=router;