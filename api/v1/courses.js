const model = require('../../models')
var async = require("async");

const Create = (req, res) => {
    let courseCreate = new model.Course({
        title: req.body.title,
        end_time: req.body.end_time,
        begin_time: req.body.begin_time,
        teacher_id: req.body.teacher_id,
		student_num: req.body.student_num,
		location: req.body.location,
    })

    model.Teacher.findById(req.body.teacher_id, function (err, teacherDoc){
        if (err) {
			console.log(err)
			res.send(err)
		} else {
            courseCreate.save((err, course) => {
				if (err) {
					console.log(err)
					return handleError(err)
                }
                res.json({
					success: true,
					course_id: course._id
                })
            })
        }

    })
}

const Courses = (req, res) => {
	console.log(req.query.teacher_id)
    model.Course.find({'teacher_id': req.query.teacher_id}, (err, doc) => {
		if (err) {
			console.log(err)
			res.json({
				success: false
			})
			return
		}
		res.send(doc)
	})

}

const DelteCourse = (req, res) => {
    model.Course.findOneAndRemove({
		_id: req.body.id
	}, err => {
		if (err) console.log(err)
		console.log('删除课程成功')
		res.json({
			success: true
		})
	})
}

const UpdateCourse = (req, res) => {

	model.Course.findById(req.body._id, (err, doc) => {
		if(err) {
			console.log(err)
			res.json({
				success: false
			})
			// res.send(err)
			return
		}
		if (!doc || doc.teacher_id != req.body.teacher_id) {
			console.log("@@@@@@@@@@@@@@@@@")
			res.json({success: false})
			return
		}

		doc.title =  req.body.title
		doc.begin_time = req.body.begin_time
        doc.end_time = req.body.end_time
		doc.student_num = req.body.student_num
		doc.location = req.body.location

		doc.save((err, newDoc) => {
			if(err){
				console.log(err)
				res.json({
					success: false
				})
				return
			} else {
				res.json({
					success: true
				})
				return
			}
		});
	});

	
}


module.exports = {
    Create,
    Courses,
    DelteCourse,
    UpdateCourse
    
}