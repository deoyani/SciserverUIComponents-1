var Keystone = {
	endpoint : "http://scitest02.pha.jhu.edu/login-portal/keystone/v3/tokens",	
	credentials : {},
	loginout: function () {
		var token = Keystone.read_token();
		if (token) {
			window.location.href = "http://scitest02.pha.jhu.edu/login-portal/Account/Logout";
		} else {
			window.location.href = "http://scitest02.pha.jhu.edu/login-portal/Account/Login?callbackUrl="
					+ encodeURIComponent(window.location.href);
		}
	},
	/** 
	 * Read the rivate token obtained using explicit login.
	 * Could/should check a cookie. Maybe set one? 
	 */
	read_token : function() {
		var token = decodeURIComponent((new RegExp('[?|&]token='
				+ '([^&;]+?)(&|#|;|$)').exec(location.search) || [ , "" ])[1]
				.replace(/\+/g, '%20')) || null
		return token;		
	},
	validate_token : function(token) {
		$.ajax({
			type : "GET",
			url : Keystone.endpoint+"/"+token,
			complete : function(data) {
				Keystone.update_credentials(data);
			}
		})
	},
	update_credentials : function(data) {
		if(data == null || data.status != 200 || data.responseText == "" ) {
		} else {
			Keystone.credentials = JSON.parse(data.responseText)
		}
	} ,
	update_login : function(loginbutton) {
		var token = Keystone.read_token();
		if (token) {
			Keystone.validate_token(token);
			$(loginbutton).text("Logout")
		} else {
			Keystone.update_credentials(null);
			$(loginbutton).text("Login")
		}
	}

}
