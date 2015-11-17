var Tables = {
	/// Write JSON Table in html
	/// Added by @Deoyani Nandrekar-Heinis
	/// Pass JSON object to make html table with given style and container 
	writeJSONTable : function(columnsData,data,targetdiv, tblclass){
		
		var tbl=$("<table id='testtable'"+tblclass+"></table>") ;
		targetdiv.append(tbl);
		tbl.DataTable( {
	        data: data,
	        columns: columnsData
	        
	    } );
	
	}
};