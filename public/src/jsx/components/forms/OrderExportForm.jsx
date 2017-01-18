'use strict';

var OrderActions = require('./../actions/OrderActions');
var OrderStore = require('./../stores/OrderStore');
var React = require('react');
var InputElm = require('./../components/InputElement');
var DropDownList = require('./../components/DropDownList');
var OrderExportItemList = require('./../components/OrderExportItemList');
var OrderExportItemAdding = require('./../components/OrderExportItemAdding');

module.exports = React.createClass({

  componentDidMount: function() {
    OrderStore.addSuccessListener(this._resetInput);

    $('#inputCreateAt').datetimepicker();
    $('#inputBillingDate').datetimepicker();
  },

  componentWillUnmount: function() {
    OrderStore.removeSuccessListener(this._resetInput);
  },

  render: function() {
    var formReturn = (
      <div className='form-group col-xs-12 col-sm-12'>
        <div className='panel panel-default'>
          <div className='panel-heading heading-button'>
            Create new Order
            <button ref='btnAddOrder' className='btn btn-primary col-xs-2 col-sm-2 pull-right' onClick={this._addOrder}>Save</button>
          </div>
          <fieldset>
            <div className='input-group col-xs-6 col-sm-6 pull-left'>
              <span className='input-group-addon w20'>Shop Name</span>
              <DropDownList
                dataList={OrderStore.getShops({ key: '', value: '' })}
                onChangeData={this._onChangeShop}
                ref='inputShopName'/>
            </div>
            <InputElm _ref='inputCustomerName' styleClass='pull-right' title='Customer Name' placeholder='customerName'/>

            <div className='input-group col-xs-6 col-sm-6 pull-left'>
              <span className='input-group-addon w20'>Order Status</span>
              <DropDownList
                dataList={OrderStore.getOrderStatusList()}
                onChangeData={this._onChangeStatus}
                ref='inputOrderStatus'/>
            </div>
            <InputElm _ref='inputCustomerPhone' styleClass='pull-right' title='Customer Phone' placeholder='customerPhone'/>

            <InputElm _ref='inputCreateAt' styleClass='pull-left' title='Order Date' placeholder=''/>
            <InputElm _ref='inputCustomerAddress' styleClass='pull-right' title='Customer Address' placeholder='customerAddress'/>

            <InputElm _ref='inputBillingDate' styleClass='pull-left' title='Billing Date' placeholder=''/>
            <InputElm _ref='inputCustomerNote' styleClass='pull-right' title='Customer Note' placeholder='customerNote'/>
          </fieldset>
        </div>

        <OrderExportItemList>
          <OrderExportItemAdding />
        </OrderExportItemList>

      </div>
    );

    return formReturn;
  },

  _addOrder: function(e) {
    e.preventDefault();

    var amountTotal = 0;
    var newOrderItems = this.state.orderItems;

    for (var i = 0; i < newOrderItems.length; i++) {
      // remove categoryName & productName property out of Order object
      delete newOrderItems[i].categoryName;
      delete newOrderItems[i].productName;

      // get total amount from orderItems
      amountTotal += parseInt(newOrderItems[i].amount);
    }

    // create new Order object
    var newOrder = {
      orderStatus: React.findDOMNode(this.refs.inputOrderStatus).value,
      createAt: $('#inputCreateAt').data('DateTimePicker').date(),
      billingDate: $('#inputBillingDate').data('DateTimePicker').date(),
      amount: amountTotal,
      shopName: React.findDOMNode(this.refs.inputShopName).value,
      customerName: $('#inputCustomerName').val(),
      customerPhone: $('#inputCustomerPhone').val(),
      customerAddress: $('#inputCustomerAddress').val(),
      customerNote: $('#inputCustomerNote').val(),
      orderItems: newOrderItems
    };

    // check null createAt & billingDate, and set default if they are null
    if (this._isStringNull(newOrder.createAt)) {
      newOrder.createAt = new Date();
    }
    if (this._isStringNull(newOrder.billingDate)) {
      newOrder.billingDate = new Date();
    }

    // convert type Date to ISOString ( type of Date in MongoDB )
    newOrder.createAt = newOrder.createAt.toISOString();
    newOrder.billingDate = newOrder.billingDate.toISOString();

    // Check Order's infomations are not null
    var isError = (
        this._isStringNull(newOrder.customerName) ||
        this._isStringNull(newOrder.customerPhone) ||
        this._isStringNull(newOrder.customerAddress) ||
        this._isStringNull(newOrder.orderItems)
      );

    // Check and make sure there are not Error
    if(!isError) {
      OrderActions.addNewOrder(newOrder);
    } else {
      console.error('Please fill in all fields');
    }
  },

  _resetInput: function() {
    React.findDOMNode(this.refs.inputShopName).value = '';
    React.findDOMNode(this.refs.inputOrderStatus).value = 'opening';
    $('#inputCreateAt').data('DateTimePicker');
    $('#inputBillingDate').data('DateTimePicker');
    $('#inputShopName').val('');
    $('#inputCustomerName').val('');
    $('#inputCustomerPhone').val('');
    $('#inputCustomerAddress').val('');
    $('#inputCustomerNote').val('');
  },

  _onChangeStatus: function(status) {
    console.log('_onChangeStatus()');
  },

  _onChangeShop: function(shopId) {
    console.log('onChangeShops()');
  },

  _isStringNull: function(str) {
    return (typeof str === undefined) || (str === null) || (str === '');
  }

});
