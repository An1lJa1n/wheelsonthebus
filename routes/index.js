var firebaseRef = require('./config').firebaseRef();
exports.login = function(req, res){
	if(req.body.password && req.body.email){
		firebaseRef.authWithPassword({
				email    : req.body.email,
				password : req.body.password
			}, function(error, authData) {
				if (error) {
				res.render('login',{error: "Login Failed"});
				console.log("Login Failed!", error);
			} else {
				console.log("authenticated");
				firebaseRef.child("users").child(authData.uid).once('value', function(data){
        			if(data.val()){
        				req.session.userProile = {id: authData.uid, profile: data.val()};
						res.render('index');
        			}else{
        				res.render('login',{error: "Profile not found"});
        			}
           		});	
			}
		});	
	}else
		res.render('login');
}
exports.index = function(req, res){
	console.log(req.session.userProile.profile.schoolId);
	firebaseRef.child("schools").child(req.session.userProile.profile.schoolId).once('value', function(data){
		console.log("Test");
		res.render('index');
	});
};
exports.logout = function(req, res){
	console.log("logout called");
	firebaseRef.unauth();
	req.session.userProile= undefined;
	res.render('login');
};

exports.partials = function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};