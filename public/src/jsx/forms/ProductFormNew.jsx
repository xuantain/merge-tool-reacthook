'use strict';

var AppActions = require('./../actions/AppActions'),
		ProductStore = require('./../stores/ProductStore'),
		React = require('react'),
		ProductList = require('./../components/ProductList'),
		ProductAdding = require('./../components/ProductAdding'),
		Pagination = require('./../components/Pagination'),
		DropDownList = require('./../components/DropDownList');

module.exports = React.createClass({

	getInitialState: function () {
		return ProductStore._getState();
	},

	componentWillMount: function () {
		AppActions.loadData(ProductStore._getState());
	},

	componentDidMount: function () {
		ProductStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function () {
		ProductStore.removeChangeListener(this._onChange);
	},

	render: function () {
		var formReturn = (
			<div className='form-group col-xs-12 col-sm-12'>
				<div className='panel panel-default'>
					<div className='panel-heading'>Products</div>
					<div className='panel-body'>
						<div className='row'>
							<div className='col-sm-6'>
								<label><DropDownList
									dataList={ProductStore.getPageSizes()}
									value={this.state.perPage}
									onChangeData={this._changeProductsPerPage}
									_class='input-sm'/></label>
							</div>
							<div className="col-sm-6">
								<DropDownList
									dataList={this.state.categories}
									value={this.state.currentCat}
									onChangeData={this._changeCategory}
									_key='_id' _value='categoryName' _class='input-sm'/>
							</div>
						</div>
						<div className='table-responsive'>
							<ProductList products={this.state.products}
									refreshProductList={this._refreshProductList}/>
						</div>
					</div>
					<Pagination
						pages={this.state.pages}
						currentPage={this.state.currentPage}
						moveToPage={this._moveToPage}/>
				</div>
				<div className='row col-xs-12 col-sm-12'>
					<ProductAdding refreshProductList={this._refreshProductList}/>
				</div>
			</div>
		);

		return formReturn;
	},

	_onChange: function () {
		this.setState(ProductStore._getState());
	},

	_changeCategory: function (catId) {
		AppActions.getProducts(this.state.perPage, 1, catId);
	},

	_changeProductsPerPage: function (perPage) {
		AppActions.getProducts(perPage, 1, this.state.currentCat);
	},

	_moveToPage: function (pageIndex) {
		if(this.state.currentPage !== pageIndex) {
			AppActions.getProducts(this.state.perPage, pageIndex, this.state.currentCat);
		}
	},

	_refreshProductList: function (id) {
		AppActions.getProducts(this.state.perPage, this.state.currentPage, this.state.currentCat);
	}

});
