var CasJobs = {
	endpoint : "http://scitest02.pha.jhu.edu/CasJobs",
	/// Added to use runcasjobs REST api @Deoyani Nandrekar-Heinis
   runcasjobs : function(sql,archive,returntype,accept, context, token, callback) {
		
		$.ajax({
			type : "POST",
			url : CasJobs.endpoint + "/RestApi/contexts/" + context + "/query",
			contentType : "application/json",
			
			headers : {
				"X-Auth-Token" : token,
				"accept" : accept	
			},
			dataType : returntype,
			data : JSON.stringify({
				Query : sql,
				Archive : archive,
				BlobUrl: true
			}),
			complete : function(data) {
				callback(data)
			}
		})
	}
}