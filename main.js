$(document).ready(function() {
	
	// -------
	// Imports
	// -------
	if (!binTool) { throw 'binTool not included in page'; }
	var decToBin = binTool.decToBin;
	var binToDec = binTool.binToDec;
	var truncate = binTool.truncate;

	// -----------------------
	// DOM Queries and caching
	// -----------------------
	var $datatype = $('#DataType');
	var	$datatypeInput = $('select', $datatype);

	var $binary = $('#Binary');
	var $binaryInput = $('input', $binary);

	var $decimal = $('#Decimal');
	var $decimalInput = $('input', $decimal);
	
	var $selectAll = $('.selectAll');

	// --------------
	// Event Bindings
	// --------------
	$selectAll.on('click touch', function(e) {
		e.preventDefault();
		$(this).siblings('input').select();
	});

	$datatype.on('change', function() {
		updateDecimal($decimalInput.val());
		updateBinary($binaryInput.val());

	});

	$('html').on('click', function(e) {
		keypadClose();
	});


	addKeypadTo($decimal, {
		type: 'decimal',
		onKeypress : updateDecimal
	});

	addKeypadTo($binary,  {
		type: 'binary',
		onKeypress : updateBinary
	});

	


	function addKeypadTo ($target, params) {
		$.extend({
			type: 'decimal',
			onKeypress: function(e) {}
		}, params);

		$target.on('focus, click', function(e) {
			keypadClose();
			e.stopPropagation();
			keypadOpen($target, params.type);
		}).on('keypadPress', function(e) {
			var key = e.key;
			if (key === undefined) { return; }

			var $inputField = $(this).find('input');
			var currentValue = $inputField.val().split('');

			var cursorStart = $inputField[0].selectionStart;
			var cursorEnd = $inputField[0].selectionEnd;
			var difference = cursorEnd - cursorStart;

			currentValue.splice(cursorStart, difference, key)
			var newValue = currentValue.join('');
			$inputField.focus();

			$inputField.val(newValue);
			$inputField[0].selectionStart = cursorStart+1;
			$inputField[0].selectionEnd = cursorStart+1;

			params.onKeypress(newValue);
		}).on('keyup keydown change', function(e) {
			var $inputField = $(this).find('input');
			var currentValue = $inputField.val();
			 params.onKeypress(currentValue);

		});
	}
	
	function updateBinary (value) {
		$decimalInput.val(binToDec(value));
	}

	function updateDecimal (value) {
		var binary = decToBin(value, parseInt($datatypeInput.val()));
		$binaryInput.val(binary);
	}


	function keypadClose() {
		$('body').find('.keypad').remove();
	}

	function keypadOpen($target, buttonType) {
		var _ = document;

		var keypad = $target.find('.keypad');
		if (keypad.length > 0) {
			return;
		}

		var pad = _.createElement('div');
		pad.className = 'keypad';

		if (buttonType === 'binary') {
			var keys = [0,1];
		} else {
			var keys = [0,1,2,3,4,5,6,7,8,9];
		}

		for(var i = 0, l = keys.length; i < l; i++) {
			var keyContainer = document.createElement('div');
			keyContainer.className = "keyOuter";

			var key = document.createElement('button');
			var keyClass = 'key' + keys[i];
			key.className = keyClass;
			key.value = keys[i];
			key.appendChild(document.createTextNode(keys[i]));

			$(key).on('click', function(e) {
				e.preventDefault();
				var keyNumber = $(this).val()
				$(this).trigger({
					type: 'keypadPress',
					key : keyNumber
				});
			});

			keyContainer.appendChild(key);
			pad.appendChild(keyContainer);
		}

		$(pad).on('click', function(e) {
			e.stopPropagation();
		});

		$target.append(pad);
	}

});