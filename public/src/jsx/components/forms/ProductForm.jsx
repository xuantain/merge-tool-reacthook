'use strict';

var ProductActions = require('./../../actions/ProductActions');
var ProductStore = require('./../../stores/ProductStore');
var utils = require('./../../utils/utils');
var React = require('react');
var ProductList = require('./../../components/product/ProductList');
var ProductAdding = require('./../../components/product/ProductAdding');
var Pagination = require('./../../components/pagination/Pagination');
var DropDownList = require('./../../components/common/DropDownList');

module.exports = React.createClass({

  getInitialState: function() {
    return ProductStore.getState();
  },

  componentWillMount: function() {
    ProductActions.loadData(ProductStore.getState());
  },

  componentDidMount: function() {
    ProductStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    ProductStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var formReturn = (
      <div className='form-group col-xs-12 col-sm-12'>
        <div className='panel panel-default'>
          <div className='panel-heading'>Products</div>
          <div className='panel-body'>
            <div className='row'>
              <div className='col-sm-6'>
                <label><DropDownList
                  dataList={utils.getPageSizes()}
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

  _onChange: function() {
    this.setState(ProductStore.getState());
  },

  _changeCategory: function(catId) {
    ProductActions.getProducts(catId, this.state.perPage, 1);
  },

  _changeProductsPerPage: function(perPage) {
    ProductActions.getProducts(this.state.currentCat, perPage, 1);
  },

  _moveToPage: function(pageIndex) {
    if(this.state.currentPage !== pageIndex) {
      ProductActions.getProducts(this.state.currentCat, this.state.perPage, pageIndex);
    }
  },

  _refreshProductList: function(id) {
    ProductActions.getProducts(this.state.currentCat, this.state.perPage, this.state.currentPage);
  }

});
