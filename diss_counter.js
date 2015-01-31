var diss_counter = (function() {
	var module = {};
	module.make = function (elems, prob_fun) {
		var table = [];
		var sum = 0;
		for (var i = 0; i < elems.length; ++i) {
			var prob = prob_fun(elems[i], 1);
			sum += prob;
			table.push({
				"elem": elems[i],
				"count": 1,
				"prob": prob
			});
		}
		return {"sum": sum, "prob_fun": prob_fun, "table": table};
	};

	module.next = function(dc) {
		var r = Math.random() * dc.sum;
		dc.sum = 0;
		var chosen = false;
		var value;
		var table = dc.table;
		for (var i = 0; i < table.length; ++i) {
			if (chosen) {
				++table[i].count;
			} else {
				r -= table[i].prob;
				if (r <= 0) {
					chosen = true;	
					value = table[i].elem;
					table[i].count = 0;
				} else {
					++table[i].count;
				}
			}
			table[i].prob =
			    dc.prob_fun(table[i].elem, table[i].count);
			dc.sum += table[i].prob;
		}
		return value;
	}
	return module;
})();
