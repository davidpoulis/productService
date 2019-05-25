var flattenObject =  function(ob) {
	var toReturn = {};
	
   for (var i in ob) {
		if (!ob.hasOwnProperty(i)) continue;
		
		if ((typeof ob[i]) == 'object') {
			var flatObject = flattenObject(ob[i]);
			for (var x in flatObject) {
				if (!flatObject.hasOwnProperty(x)) continue;
				
				toReturn[x] = flatObject[x];
			}
		} else {
            
			toReturn[i.toLowerCase()] = ob[i];
		}
    }
  	return toReturn;
};
exports.transform =  flattenObject