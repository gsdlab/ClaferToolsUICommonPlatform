// Reads the JSON intermediate representation of Clafer 0.5.3 (clafer -m json).
ClaferAPI = {
	primitiveTypes: ['integer', 'clafer', 'string', 'real', 'double'],

	// All values of the given field in the IR, in document order.
	collect: function(json, field, result) {
		result = result || [];
		if (_.isArray(json)) {
			for (var i = 0; i < json.length; i++) {
				ClaferAPI.collect(json[i], field, result);
			}
		} else if (json !== null && typeof json === 'object') {
			for (var key in json) {
				if (key === field) {
					result.push(json[key]);
				}
				ClaferAPI.collect(json[key], field, result);
			}
		}
		return result;
	},

	// The name a binding refers to: {"tag": "GlobalBind" | "LocalBind", "contents": name}
	// or {"tag": "NoBind"}.
	bindingName: function(binding) {
		if (binding && (binding.tag === 'GlobalBind' || binding.tag === 'LocalBind')) {
			return binding.contents;
		}
		return null;
	},

	getClafers: function(clafer, options) {
		if (clafer === undefined) {
			return null;
		}

		var iClafers = ClaferAPI.collect(clafer, '_iClafer'),
				opt = $.extend({}, options),
				claferUID =  ClaferAPI.getProperty(clafer, 'uid');

		if(claferUID === null) {
			claferUID = 'root';
		}

		// Apply the filter
		switch(opt.filter) {
			case 'concrete' : {
				iClafers = _.filter(iClafers, function(clafer){
												return !ClaferAPI.getProperty(clafer, 'isAbstract');
										});
				break;
			}

			case 'abstract': {
				iClafers = _.filter(iClafers, function(clafer){
												return ClaferAPI.getProperty(clafer, 'isAbstract');
										});
				break;
			}
		}

		if (opt.topLevel) {
			iClafers = _.filter(iClafers, function(clafer){
												return ClaferAPI.getProperty(clafer, 'parentUID') === claferUID;
										});
		}

		return iClafers;
	},

	// The expressions of the goals: << min e >> and << max e >>.
	getGoals: function(json){
		var goals = _.filter(_.getPath(json, 'iModule._mDecls') || [], function(element){
						return element.tag === 'IEGoal';
					});
		return _.map(goals, function(goal){
						return goal._cpexp;
					});
	},

	// The UIDs of the quality attributes.
	getAttributes: function(json){
		return _.getPath(json, 'objectives._attributes') || [];
	},

	getProperty: function(clafer, property, defValue) {
		var result = null;

		switch(property) {
			//Clafers
			case 'isAbstract'		: result = _.getPath(clafer, '_modifiers._abstract'); break;
			case 'card'					: result = _.getPath(clafer, '_card'); break;
			case 'uid'					: result = _.getPath(clafer, '_uid'); break;
			case 'ident'				: result = _.getPath(clafer, '_ident'); break;
			case 'parentUID'		: result = _.getPath(clafer, '_parentUID'); break;
			case 'superClafer'	: result = ClaferAPI.bindingName(_.getPath(clafer, '_super._exp._binding')); break;
			case 'supers'				: result = _.getPath(clafer, '_super._iType._hi'); break;
			case 'reference'		: {
				var exp = _.getPath(clafer, '_reference._ref._exp');
				// Reference to a nested clafer: the last clafer of the path
				if (exp && exp._exps) {
					exp = _.getPath(_.last(exp._exps), '_exp');
				}
				result = ClaferAPI.bindingName(_.getPath(exp, '_binding'));
				break;
			}
			//Goals
			case 'goalOperation': result = _.getPath(clafer, '_op'); break;
			case 'goalExpId'		: {
				result = ClaferAPI.bindingName(_.getPath(clafer, '_binding'));
				if (result === null && _.getPath(clafer, '_sident') === 'dref') {
					result = 'dref';
				}
				break;
			}
			case 'goalExps'			: result = _.getPath(clafer, '_exps'); break;
			case 'goalExp'			: result = _.getPath(clafer, '_exp'); break;
		}

		if (result === undefined) {
			result = null;
		}

		return (result===null && defValue!==undefined)?defValue:result;
	}

}
