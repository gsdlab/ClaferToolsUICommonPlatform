ClaferAPI = {
	primitiveTypes: ['integer', 'clafer', 'string', 'real', 'double'],

	getClafers: function(clafer, options) {
		if (clafer === undefined) {
			return null;
		}

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
					'superClafer'		: 'super.exp.binding',
					'supers'				: 'super.iType.hi',
					'reference'			: (function(){
															var p =  'reference.dref.exp.binding';
															if( _.hasPath(clafer, p)) {
																return p;
															} else {

																return 'reference.dref.exp';
															}
														})(),
					//Goals
					'goalOperation' : 'op',
					'goalExpId'			: (function(){

															if( _.getPath(clafer, 'binding') === null && _.getPath(clafer, 'sident') ==='dref') {
																return 'sident';
															} else {
																return 'binding';
															}
														})(),
					'goalExps'			: 'exps',
					'goalExp'				: 'exp'
				};

		if(paths[property] && _.hasPath(clafer, paths[property])) {
			result = _.getPath(clafer, paths[property]);
		}

		// Reference to nested clafer
		if(property === 'reference' && typeof result === 'object' && _.hasPath(result, 'exps')) {

				var exps = JSON.search(result, '//exp'),
						last = _.last(result.exps);

				if(_.hasPath(clafer, paths[property]))

				result = _.getPath(_.last(result.exps), 'exp.binding');
		}


		return (result===null && defValue!==undefined)?defValue:result;
	}



}
