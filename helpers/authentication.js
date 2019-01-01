module.exports = {


    userAuthenticated: function(req, res, next){

        if (req.isAuthenticated()){

            return next();
        } else {
            
            req.flash('error', 'Log-in first to access admin');
            res.redirect('/login');
        }


    }


};