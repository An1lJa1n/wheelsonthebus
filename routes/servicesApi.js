var firebaseRef = require('./config').firebaseRef();
exports.getList = function (req, res) {
	firebaseRef.child("schools").child(req.session.userProile.profile.schoolId).child("services").once("value",function(data){
		res.json(data.val());		
	});	
};
exports.save = function (req, res) {
	firebaseRef.child("schools").child(req.session.userProile.profile.schoolId).child("services").push(req.body, function(data){
		firebaseRef.child("schools").child(req.session.userProile.profile.schoolId).child("services").once("value",function(data){
			res.json(data.val());		
		});
	});
};
exports.update = function (req, res) {
	firebaseRef.child("schools").child(req.session.userProile.profile.schoolId).child("services")
	.child(req.params.id)
	.update(req.body, function(data){
		firebaseRef.child("schools").child(req.session.userProile.profile.schoolId).child("services").once("value",function(data){
			res.json(data.val());		
		});
	});
};
exports.delete = function (req, res) {
	var id = req.params.id;
	firebaseRef.child("schools").child(req.session.userProile.profile.schoolId)
		.child("services").child(id).remove(function(){
		firebaseRef.child("schools").child(req.session.userProile.profile.schoolId).child("services").once("value",function(data){
			res.json(data.val());		
		});
	});
};