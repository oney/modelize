"use strict";
(function() {
	var modelize = function(data, klass) {
		var classType = function(data){
			return Object.prototype.toString.call(data);
		}
		var isArray = function(data) {
			return classType(data) == "[object Array]";
		}
		var isHash = function(data) {
			return classType(data) == "[object Object]";
		}
		var isString = function(data) {
			return classType(data) == "[object String]";
		}
		var isFunction = function(data) {
			return classType(data) == "[object Function]";
		}
		var transformeData = function(key, transformer, data) {
			if (isString(transformer)) {
				if (transformer in data) {
					return data[transformer];
				}
			}
			else if (isFunction(transformer)) {
				if (key in data) {
					var value = data[key];
					return transformer(value);
				}
			}
			else if (isHash(transformer)) {
				var innerkey = transformer.key;
				if (innerkey in data) {
					var func = transformer.transformer;
					var value = data[innerkey];
					return func(value);
				}
			}
		}

		if (isArray(data)) {
			var collection = [];
			for (var i = 0; i < data.length; i++) {
				var item = data[i];
				collection.push(modelize(item, klass));
			};
			return collection;
		}
		else if (isHash(data)) {
			var instance;
			if (typeof klass.modelizeConstructor != 'undefined') {
				instance = klass.modelizeConstructor();
			}
			else {
				instance = new klass();
			}
			for (var key in klass.mapping) {
				var transformer = klass.mapping[key];
				var result = transformeData(key, transformer, data);
				if (typeof result != 'undefined') {
					instance[key] = result;
				}
			}
			return instance;
		}
	}
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = modelize;
	}
	else {
		if (typeof define === 'function' && define.amd) {
			define([], function() {
				return modelize;
			});
		}
		else {
			window.modelize = modelize;
		}
	}
})();
