	var iteratorsMap = {};
	var collectionsMap = {};
	var initialized = false;

	Selenium.prototype.doAddCollection = function(_nameCollection) {

			if (iteratorsMap == undefined) {
				iteratorsMap = new Array();
			}

			if (collectionsMap == undefined) {
				collectionsMap = new Array();
			}

			collectionsMap[_nameCollection] = new Collection(new Array());

	};

	Selenium.prototype.doAddToCollection = function(_nameCollection, _valueToStore) {

			if ((iteratorsMap == undefined) || (collectionsMap == undefined)) initialized = false;

			if (collectionsMap[_nameCollection] == undefined)  initialized = false;

			if (!initialized) throw new Error( "You must first call '|storeNewCollection | " + _nameCollection + "||' in order to initialize it." );

			collectionsMap[_nameCollection].add(_valueToStore);
			iteratorsMap[_nameCollection] = collectionsMap[_nameCollection].iterator();

	};


	Selenium.prototype.getNext = function(_nameCollection) {

		if (iteratorsMap[_nameCollection].hasNext()) {
			return iteratorsMap[_nameCollection].next();
		}

		throw new Error( "All items from " + _nameCollection + " have already taken ." );
	};

	Selenium.prototype.getRemainderCount = function(_nameCollection) {

		return iteratorsMap[_nameCollection].remainderCount();

	};

	Selenium.prototype.isHasNext = function(_nameCollection) {
			return iteratorsMap[_nameCollection].hasNext();
	};

	var forLabels = {};

	Selenium.prototype.getFor = function( _nameCollection )
	{
		  if( eval(iteratorsMap[_nameCollection].hasNext()) ) {
				return iteratorsMap[_nameCollection].next();
			} else {
		      var last_row = testCase.debugContext.debugIndex;
		      var end_for_row = forLabels.fors[ last_row ];
		      if( undefined == end_for_row ) throw new Error( "Corresponding 'endFor' could not be found." );
		      this.continueFromRow( end_for_row );
		  }
	}

	Selenium.prototype.doEndFor = function()
	{
		  var last_row = testCase.debugContext.debugIndex;
		  var for_row = forLabels.ends[ last_row ] - 1;
		  if( undefined == for_row ) throw new Error( "Corresponding 'storeFor' could not be found." );
		  this.continueFromRow( for_row );
	}

	Selenium.prototype.doInitForEach = function()
	{
    forLabels = { ends: {}, fors: {} };
    var command_rows = [];
    var numCommands = testCase.commands.length;
    for (var i = 0; i < numCommands; ++i) {
        var x = testCase.commands[i];
        command_rows.push(x);
    }
    var cycles = [];
    for( var i = 0; i < command_rows.length; i++ ) {
        if (command_rows[i].type == 'command')
        switch( command_rows[i].command.toLowerCase() ) {
            case "storefor":
            case "endfor":
                cycles.push( [command_rows[i].command.toLowerCase(), i] )
                break;
        }
    }
    var i = 0;
    while( cycles.length ) {
        if( i >= cycles.length ) {
            throw new Error( "non-matching storeFor/endFor found" );
        }
        switch( cycles[i][0] ) {
            case "storefor":
                if( ( i+1 < cycles.length ) && ( "endfor" == cycles[i+1][0] ) ) {
                    // pair found
                    forLabels.ends[ cycles[i+1][1] ] = cycles[i][1];
                    forLabels.fors[ cycles[i][1] ] = cycles[i+1][1];
                    cycles.splice( i, 2 );
                    i = 0;
                } else ++i;
                break;
            case "endfor":
                ++i;
                break;
        }
    }
			initialized = true;
	}

/*

*/

/*
	Selenium.prototype.getCommandsCount = function()
	{
		var cntCommands = 0;
    var command_rows = [];
    var numCommands = testCase.commands.length;
    for (var i = 0; i < numCommands; ++i) {
        var x = testCase.commands[i];
        command_rows.push(x);
    }

    for( var i = 0; i < command_rows.length; i++ ) {
        if (command_rows[i].type == 'command') cntCommands++;
    }  
		return cntCommands;
	}

*/

