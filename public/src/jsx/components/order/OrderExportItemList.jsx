'use strict';

var OrderStore = require('./../stores/OrderStore');
var React = require('react');
var OrderExportItemRow = require('./../components/OrderExportItemRow');

function getState() {
  return {
    orderItems: OrderStore.getOrderItems()
  };
}

module.exports = React.createClass({

  getInitialState: function() {
    return getState();
  },

  componentDidMount: function() {
    OrderStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    OrderStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div id='newOrderItemList' className='panel panel-default'>
        <div className='panel-heading'>Add new OrderItem</div>
        <table className='table table-bordered table-striped menu-items'>
          <thead>
            <tr>
              <th>No.</th>
              <th>Category</th>
              <th>Product</th>
              <th>Quatity</th>
              <th>Price out</th>
              <th>Amount</th>
              <th>Discount(%)</th>
              <th>Note</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.orderItems.map(function(orderItem, index) {
                return (
                  <OrderExportItemRow
                    key={'orderItemRow-' + index}
                    index={index}
                    rowData={orderItem}/>
                );
              })
            }
            {this.props.children}
          </tbody>
        </table>
      </div>
    );
  },

  _onChange: function () {
    getState();
  }

});
