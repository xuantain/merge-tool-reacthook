'use strict';

var utils = require('./../../utils/utils');
var OrderActions = require('./../../actions/OrderActions');
var OrderStore = require('./../../stores/OrderStore');

// components
var React = require('react');
var OrderList = require('./../../components/order/OrderList');
var Pagination = require('./../../components/pagination/Pagination');
var DropDownList = require('./../../components/common/DropDownList');

module.exports = React.createClass({

  getInitialState: function() {
    return OrderStore.getState();
  },

  componentWillMount: function() {
    OrderActions.getOrders(this.state.perPage, this.state.currentPage,
      this.state.currentShop, this.state.currentStatus);
  },

  componentDidMount: function() {
    OrderStore.addOrdersChangeListener(this._onOrdersChange);
  },

  componentWillUnmount: function() {
    OrderStore.removeOrdersChangeListener(this._onOrdersChange);
  },

  render: function() {
    var formReturn = (
      <div className='form-group col-xs-12 col-sm-12'>
        <div className='panel panel-default'>
          <div className='panel-heading'>Orders</div>
          <div className='panel-body'>
            <div className='row'>
              <div className='col-sm-6'>
                <label><DropDownList
                  dataList={utils.getPageSizes()}
                  value={this.state.perPage}
                  onChangeData={this._changeOrdersPerPage}
                  _class='input-sm'/></label>
              </div>
              <div className="col-sm-6">
                <div className="col-sm-6">
                  <DropDownList
                    dataList={OrderStore.getShops({ key: 'all', value: 'All Shops' })}
                    value={this.state.currentShop}
                    onChangeData={this._changeShop}
                    _class='input-sm'/>
                </div>
                <div className="col-sm-6">
                  <DropDownList
                    dataList={OrderStore.getOrderStatusList({ key: 'all', value: 'All Status' })}
                    value={this.state.currentStatus}
                    onChangeData={this._changeStatus}
                    _class='input-sm'/>
                </div>
              </div>
            </div>
            <div className='table-responsive'>
              <OrderList orders={this.state.orders} />
            </div>
          </div>
          <Pagination
            pages={this.state.pages}
            currentPage={this.state.currentPage}
            moveToPage={this._moveToPage}/>
        </div>
      </div>
    );
    return formReturn;
  },

  _onOrdersChange: function() {
    this.setState(OrderStore.getState());
  },

  _changeShop: function(shopId) {
    OrderActions.getOrders(this.state.perPage, 1, shopId, this.state.currentStatus);
  },

  _changeStatus: function(status) {
    OrderActions.getOrders(this.state.perPage, 1, this.state.currentShop, status);
  },

  _changeOrdersPerPage: function(perPage) {
    OrderActions.getOrders(perPage, 1, this.state.currentShop, this.state.currentStatus);
  },

  _moveToPage: function(pageIndex) {
    if(this.state.currentPage !== pageIndex) {
      OrderActions.getOrders(this.state.perPage, pageIndex, this.state.currentShop, this.state.currentStatus);
    }
  }

});
