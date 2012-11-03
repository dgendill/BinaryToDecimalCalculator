var CHAR = 8;
var SHORT = 16;
var INT = 16;
var INT16 = 16;
var INT32 = 32;
var LONG = 32;

var binTool = (function() {
	// -----------------
	// * binToDec - Binary To Decimal Conversion
	// * decToBin - Decimal to Binary Conversion
	// * truncate - Binary or Decimal Truncation
	// 
	// binTool Singleton
	// -----------------

	
	// --------------------------------
	// Truncate Binary/Decimal Number to X Length
	// --------------------------------
		
	var	truncate = function (bin, type) {
			var binLength = bin.length-1;
			var cut = (binLength - type) <= 0 ? binLength : type;
			return bin.substr(binLength-cut);
		};


	// -----------------
	// Binary To Decimal
	// -----------------

	var binToDec = function (bin) {
			var dec = parseInt(bin, 2);
			if (isNaN(dec)) {
				throw bin + " is not a binary Number";
				return undefined;
			} else {
				return dec;
			}
		};


	// -----------------
	// Decimal to Binary
	// -----------------
		
	var	decToBin = function (dec, type) {
			//if (dec === 0 || dec === 1) { return dec; }
			
			var answer = [];
			var decCopy = dec;
			var log2 = 0;
			while(decCopy >= 2) {
				decCopy = decCopy / 2;
				log2 = log2 + 1;
			}

			if (typeof type !== 'number') {
				type = log2;
			}

			log2 = Math.max(log2, type-1);
			
			for(var l2 = log2; l2 >= 0; l2--) {
				power = Math.pow(2, l2);
				if (dec >= power) {
					answer[l2] = "1";
					dec = dec - power;
				} else {
					answer[l2]="0";
				}
			}

			if (answer.length === 0) {
				answer = [dec];
			}
			return truncate(answer.reverse().join(''), type);
		};

	return {
		decToBin : decToBin,
		binToDec : binToDec,
		truncate : truncate
	};	
	
}());