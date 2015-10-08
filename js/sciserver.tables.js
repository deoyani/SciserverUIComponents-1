/* 
 * from reply by Andy VanWagoner on
 *  http://stackoverflow.com/questions/1293147/javascript-code-to-parse-csv-data
 */
var Tables = {
parseCSV: function(csv, reviver) {
    reviver = reviver || function(r, c, v) { return v; };
    var chars = csv.split(''), c = 0, cc = chars.length, start, end, table = [], row;
    var i=0
    while (c < cc) {
    	row = []
    	table.push(row)
        while (c < cc && '\r' !== chars[c] && '\n' !== chars[c]) {
            start = end = c;
            if ('"' === chars[c]){
                start = end = ++c;
                while (c < cc) {
                    if ('"' === chars[c]) {
                        if ('"' !== chars[c+1]) { break; }
                        else { chars[++c] = ''; } // unescape ""
                    }
                    end = ++c;
                }
                if ('"' === chars[c]) { ++c; }
                while (c < cc && '\r' !== chars[c] && '\n' !== chars[c] && ',' !== chars[c]) { ++c; }
            } else {
                while (c < cc && '\r' !== chars[c] && '\n' !== chars[c] && ',' !== chars[c]) { end = ++c; }
            }
            row.push(reviver(table.length-1, row.length, chars.slice(start, end).join('')));
            if (',' === chars[c]) { ++c; }
        }
        if ('\r' === chars[c]) { ++c; }
        if ('\n' === chars[c]) { ++c; }
    }
    return table;
},

stringify: function(table, replacer) {
    replacer = replacer || function(r, c, v) { return v; };
    var csv = '', c, cc, r, rr = table.length, cell;
    for (r = 0; r < rr; ++r) {
        if (r) { csv += '\r\n'; }
        for (c = 0, cc = table[r].length; c < cc; ++c) {
            if (c) { csv += ','; }
            cell = replacer(r, c, table[r][c]);
            if (/[,\r\n"]/.test(cell)) { cell = '"' + cell.replace(/"/g, '""') + '"'; }
            csv += (cell || 0 === cell) ? cell : '';
        }
    }
    return csv;
},
writeTable: function(csv, targetdiv) {
	var data = Tables.parseCSV(csv);
	var tbl=Tables.tableStart() ;
	tbl = Tables.addTableHeader(data,tbl)
	tbl+="<tbody>"
	tbl = Tables.addTableContent(data, tbl);
	tbl+="</tbody></table>"
	var dtbl = $(tbl)
	$(targetdiv).append(dtbl)
	dtbl.DataTable( );			
},

writeTables : function(csvs, targetdiv) {
	var tbl=Tables.tableStart() ;
	for(var i = 0; i < csvs.length; i++){
		var data = Tables.parseCSV(csvs[i]);
		if(i == 0){
			tbl = Tables.addTableHeader(data,tbl)
	  	tbl+="<tbody style=\"font-family:Lucida Console\">"
		}
		tbl = Tables.addTableContent(data, tbl);
	}	
	tbl+="</tbody></table>"
	var dtbl = $(tbl)
	$(targetdiv).append(dtbl)
	dtbl.DataTable( );			
},


addTableHeader : function (data, tbl){
	  tbl+="<thead><tr>"
		for(icol = 0; icol< data[0].length; icol++) {
			tbl+="<th>"+data[0][icol]+"</th>"
		}
		tbl+="</tr></thead>"
		return tbl;
},

addTableContent : function(data, tbl){
	for(irow = 1; irow<data.length; irow++){
		tbl+="<tr >"
		for(icol=0; icol < data[irow].length; icol++) {
			tbl+="<td >"+Tables.renderColumn(data[irow][icol])+"</td>"
		}
		tbl+="</tr>"
	}
	return tbl;
},
renderColumn : function(data){
	return data.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') ;
},
tableStart : function(){
	return "<table class=\"table table-striped table-bordered nowrap\">"
}

};