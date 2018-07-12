

window.addEventListener('resize', resizeGrid); 

function drawGrid(pSize) {
	$("#TeeJSGrid").jsGrid({
		height: "410px",
		width: "95%",
		sorting: true,
		paging: true,
		pageSize: pSize,
		sorting: true,
		updateOnResize: true,
		autoload: true,
		controller: {
		loadData: function() {
				return $.ajax({
					url: "http://localhost/dashboard/data/TeeGrid.JSON",
					dataType: "json"
				  });
				}
		},
		fields: [
			{ name: "ID", type: "number", width: 100 },
			{ name: "Cod_customer", type: "number", width: 100 },
			{ name: "Orderdate", type: "textarea", width: 200,
                            itemTemplate: function(value) {
                                var d = new Date(value);
                                return d.toLocaleString(); } },
			{ name: "Invoice_year", type: "number", width: 100 },
			{ name: "Invoice_num", type: "number", width: 100 },
			{ name: "Product_code", type: "number", width: 100 },
			{ name: "Pack_code", type: "number", width: 100 }
		]
	});
}

function resizeGrid(){
	
	var grid = $("#TeeJSGrid");
	
	if (grid[0].clientWidth < 540)
		drawGrid(10);
	else
		drawGrid(20);
}
   