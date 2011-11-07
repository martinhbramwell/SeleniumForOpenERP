
	function Iterator(_collection)
	{
		var privateCollection = _collection;
		var total = privateCollection.length;
		var cursor = 0;

		function doNext() {
			return privateCollection[cursor++];
		}

		function doHasNext() {  return  cursor < total; }
		function doRemainderCount() {  return  total - cursor; }

		this.next = doNext;
		this.hasNext = doHasNext;
		this.remainderCount = doRemainderCount;

	}


	function Collection(_collection)
	{
		var privateCollection = _collection;

		function doSize() { return  privateCollection.length; }
		this.size = doSize;

		function doIterator() {
			return new Iterator(privateCollection);
		}

		function doAdd(_value) {
			privateCollection[privateCollection.length] = _value;
		}

		this.iterator = doIterator;
		this.add = doAdd;
		
	}

	var XjnhygbtfrdX = 'bla-blah';
