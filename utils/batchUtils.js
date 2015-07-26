var _ = require("lodash"),
	appConstants = require("../constants/appConstants");

var batchUtils = {
	/**
	 * [createBatch description]
	 * @param  {[Array]} data [description]
	 * @return {[Array]}      [description]
	 */
	createBatch: function(data){
		return _.chunk(data, appConstants.batchSize);
	}
};

module.exports = batchUtils;