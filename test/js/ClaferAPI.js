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
				paths = {
					//Clafers
					'isAbstract' 		: 'isAbstract',
					'card'					: 'card',
					'uid'						: 'uid',
					'ident'					: 'ident',
					'superClafer'		: 'super.exp.sident',
					'supers'				: 'super.iType.contents',
					'reference'			: (function(clafer){
															var p =  'reference.ref.exp.sident';
															if( _.hasPath(clafer, p)) {
																return p;
															} else {
																
																return 'reference.ref.exp';
															}
														})(),
					//Goals
					'goalOperation' : 'op',
					'goalExpId'			: 'sident',
					'goalExps'			: 'exps',
					'goalExp'				: 'exp'
				};

		if(paths[property] && _.hasPath(clafer, paths[property])) {
			result = _.getPath(clafer, paths[property]);
		}

	
		return (result===null && defValue!==undefined)?defValue:result;
	}

	

}

