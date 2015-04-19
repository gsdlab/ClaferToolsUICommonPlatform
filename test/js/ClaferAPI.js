ClaferAPI = {
	primitiveTypes: ['integer', 'clafer', 'string', 'real'],

	getClafers: function(clafer, options) {
		var iClafers = JSON.search(clafer, '//iClafer'),
				opt = $.extend({}, options),
				claferUID =  ClaferAPI.getProperty(clafer, 'uid');


		if(claferUID === undefined) {
			claferUID = 'root';
		}
				
		/*		for (var i = 0; i < source.length; i++) {
			iClafers[source[i].uid] = source[i]; // TODO: replace uid by getProperty
		};*/

		// Apply the filter
		switch(opt.filter) {
			case 'concrete' : {
				iClafers = _.filter(iClafers, function(clafer){
												return !clafer.isAbstract;
										});
				break;
			}

			case 'abstract': {
				iClafers = _.filter(iClafers, function(clafer){
												return clafer.isAbstract;
										});
				break;
			}
		}

		if (opt.topLevel) {
			iClafers = _.filter(iClafers, function(clafer){
												return clafer.parentUID === claferUID;
										});

			
		}

		return iClafers;
	},

	getGoals: function(clafer){
		return JSON.search(clafer, '//*[tag="IEGoal"]/cpexp');
	},

	getProperty: function(clafer, property, defValue) {
		var result = null,
				pathes = {
					//Clafers
					'isAbstract' 		: 'isAbstract',
					'card'					: 'card',
					'uid'						: 'uid',
					'ident'					: 'ident',
					'superClafer'		: 'super.exp.sident',
					'supers'				: 'super.iType.contents',
					'reference'			: 'reference.ref.exp.sident',
					//Goals
					'goalOperation' : 'op',
					'goalExpId'			: 'sident',
					'goalExps'			: 'exps',
					'goalExp'				: 'exp'
				};

		if(pathes[property] && _.hasPath(clafer, pathes[property])) {
			result = _.getPath(clafer, pathes[property]);
		}

	
		return (result===null && defValue!==undefined)?defValue:result;
	}

	

}

