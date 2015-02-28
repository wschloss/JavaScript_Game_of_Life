// Run init on doc ready
$(document).ready(function() {
	var rows = 75;
	var cols = 75;
	// Time between iterations in ms
	var iterationTime = 50;
	// Generate 2D array of cells for the game
	var cells = generateCells(rows, cols);
	// Append the cells to the html body as div elements
	appendToBody(cells, rows, cols);

	// Step button steps the game through the desired number of iterations
	$("button.step").click(function() {
		var steps = $("input[type='number']").val();
		// Get the cell html elements
		var cellElements = $('body div#cell').toArray();
		// Schedule the iterations
		for (var i = 0; i < steps; i++) {
			setTimeout(function() { iterate(cellElements, rows, cols); },i * iterationTime);
		}
	});

	// Clear button resets all cells to dead
	$("button.clear").click(function() {
		// Set all cell classes to dead
		var cellElements = $('body div#cell').toArray();
		for (var i = 0; i < rows*cols; i++)
			cellElements[i].className = 'dead';
	});

});

// Takes number of rows and cols and constructs cell html strings
// which are alive or dead
function generateCells(rows, cols) {
	cells = [];
	for (var i = 0; i < rows; i++) {
		var row = [];
		for (var j = 0; j < cols; j++) {
			row.push("<div id='cell' class='dead'/>");
		}
		cells.push(row);
	}
	return cells;
}

// Appends 2D array of cell html objects in the doc body which toggle dead/alive when clicked
function appendToBody(cells, rows, cols) {
	//append all cells to body
	for (var i = 0; i < rows; i++) {
		for (var j = 0; j < cols; j++) {
			$('body').prepend(cells[i][j]);
			// Add click toggle to the new cell
			$('body div#cell:first-child').click(function() {
				var className = $(this).attr('class');
				if (className == 'alive')
					$(this).attr('class', 'dead');
				else
					$(this).attr('class', 'alive');
			});
		}
	}
}

// Takes array of cell html elements and steps them to the next iteration in the game
function iterate(cellElements, rows, cols) {
	// Changes the single array to 2D since that's what it represents
	var cellArray = castToMultiArray(cellElements, rows, cols);
	// Array of new states to set after calculated
	var newstates = [];
	// Iterate over all cells to evaluate their state in the next game iteration
	for (var i = 0; i < rows; i++) {
		for (var j = 0; j < cols; j++) {
			// Get current state
			var currentState = cellArray[i][j].className;
			// Get number of adjacent alive cells
			var aliveNeighborCount = aliveNeighbors(cellArray, rows, cols, i, j);
			// Run appropriate checks
			if (currentState == 'alive') {
				// Cell dies if fewer than two alive neighbors
				if (aliveNeighborCount < 2)
					newstates.push('dead');
				// Cell dies if more than three alive neighbors
				else if (aliveNeighborCount > 3)
					newstates.push('dead');
				// Remains alive for two or three alive neighbors
				else
					newstates.push('alive');
			} else {
				// Cell switches to alive if three adjacent live cells
				if (aliveNeighborCount == 3)
					newstates.push('alive');
				else
					newstates.push('dead');
			}
		}
	}

	// Apply the new states to every cell
	for (var i = 0; i < rows*cols; i++) {
			cellElements[i].className = newstates[i];
	}
}

// Counts number of alive neighbors around the cell at row, col
function aliveNeighbors(cellArray, rows, cols, row, col) {
	var count = 0;

	// check left
	if (col - 1 > -1 && cellArray[row][col -1].className == 'alive')
		count += 1;
	// check right
	if (col + 1 < cols && cellArray[row][col + 1].className == 'alive')
		count += 1;
	// check up
	if (row - 1 > -1 && cellArray[row - 1][col].className == 'alive')
		count += 1;
	// check down
	if (row + 1 < rows && cellArray[row + 1][col].className == 'alive')
		count += 1;
	// check upper left
	if (row - 1 > -1 && col - 1 > -1 && cellArray[row-1][col-1].className == 'alive')
		count += 1;
	// check upper right
	if (row - 1 > -1 && col + 1 < cols && cellArray[row-1][col+1].className == 'alive')
		count += 1;
	// check lower left
	if (row + 1 < rows && col - 1 > -1 && cellArray[row+1][col-1].className == 'alive')
		count += 1;
	// check lower right
	if (row + 1 < rows && col + 1 < cols && cellArray[row+1][col+1].className == 'alive')
		count += 1;

	return count;
}

// Takes the 1D representation of the cells and makes the 2D array
function castToMultiArray(cellElements, rows, cols) {
	cellArray = [];
	for (var i = 0; i < rows; i++) {
		var row = [];
		for (var j = 0; j < cols; j++) {
			row.push(cellElements[i*cols + j]);
		}
		cellArray.push(row);
	}
	return cellArray;
}
