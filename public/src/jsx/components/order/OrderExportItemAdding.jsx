'use strict';

var OrderActions = require('./../actions/OrderActions');
var OrderStore = require('./../stores/OrderStore');
var React = require('react');
var DropDownList = require('./../components/DropDownList');

function getState() {
  return {
    categories: OrderStore.getCategories(),
    products: OrderStore.getProducts()
  };
}

module.exports = React.createClass({

  getInitialState: function() {
    return getState();
  },

  componentWillMount: function() {
    OrderActions.getCategories();
  },

  componentDidMount: function() {
    OrderStore.addChangeListener(this._onChange);
    OrderStore.addSuccessListener(this._resetInput);
  },

  componentWillUnmount: function() {
    OrderStore.removeChangeListener(this._onChange);
    OrderStore.removeSuccessListener(this._resetInput);
  },

  render: function() {
    return (
      <tr>
        <td></td>
        <td>
          <DropDownList ref='inputCategory'
            dataList={this.state.categories}
            onChangeData={this._onChangeCategory}
            _key='_id' _value='categoryName'/>
        </td>
        <td>
          <DropDownList ref='inputProduct'
            dataList={this.state.products}
            onChangeData={this._onChangeProduct}
            _key='_id' _value='productName'/>
        </td>
        <td><input type='number' className='form-control' id='inputQuantity' placeholder='0' onChange={this._onChangePrice}/></td>
        <td><input type='text' className='form-control' id='inputPrice' disabled placeholder='0' onChange={this._onChangePrice}/></td>
        <td><input type='text' className='form-control' id='inputAmount' disabled></input></td>
        <td><input type='number' className='form-control' id='inputDiscount' placeholder='0' onChange={this._onChangePrice}/></td>
        <td><input type='text' className='form-control' id='inputNote' placeholder='note'/></td>
        <td><button id='btnPushOrderItem' className='btn btn-primary col-xs-12 col-sm-12' onClick={this._pushOrderItem}>Add</button></td>
      </tr>
    );
  },

  _onChange: function () {
    this.setState(getState());
  },

  _onChangeCategory: function(catId) {
    OrderActions.getProducts(catId, 20);
    this._onChangeProduct('');
    if (catId == '') {
      this._resetInput();
    }
  },

  _onChangeProduct: function(productId) {
    var price = 0;
    var product = this.state.products.filter(function(product) {
      return product._id == productId;
    })[0];

    // set product's price to input
    if(product) {
      price = parseInt(product.price);
    }
    $('#inputPrice').val(price.toLocaleString('en-IN', { maximumSignificantDigits: 3 }));

    // get orderItem's quantity & discount
    var quantity = parseInt($('#inputQuantity').val());
    var discount = parseInt($('#inputDiscount').val());

    // calculate amount and set amount to input
    if (quantity && quantity >= 0) {
      var amount = quantity * price;
      if (discount > 0 && discount <= 100) {
        amount = amount - (amount * discount) / 100;
      }
      $('#inputAmount').val(amount.toLocaleString('en-IN', { maximumSignificantDigits: 3 }));
    } else {
      $('#inputAmount').val(0);
    }
  },

  _onChangePrice: function(e) {
    e.preventDefault();

    // get orderItem's price & quantity & discount
    var price = $('#inputPrice').val();
    price = parseInt(this._removeComma(price));
    var quantity = parseInt($('#inputQuantity').val());
    var discount = parseInt($('#inputDiscount').val());

    // calculate amount and set amount to input
    if (quantity >= 0 && price >= 0) {
      var amount = quantity * price;
      if (discount > 0 && discount <= 100) {
        amount = amount - (amount * discount) / 100;
      }
      $('#inputAmount').val(amount.toLocaleString('en-IN', { maximumSignificantDigits: 3 }));
    }
  },

  _pushOrderItem: function(e) {
    e.preventDefault();

    // get categoryName
    var _categoryId = React.findDOMNode(this.refs.inputCategory).value || '',
        _catName = '';
    _catName = this.state.categories.filter(function(category) {
      return category._id == _categoryId;
    })[0].categoryName;

    // get productName
    var _productId = React.findDOMNode(this.refs.inputProduct).value || '',
        _productName = '';
    _productName = this.state.products.filter(function(product) {
      return product._id == _productId;
    })[0].productName;

    var _quantity = this._removeComma($('#inputQuantity').val()) || 0;
    var _price = this._removeComma($('#inputPrice').val()) || 0;
    var _discount = this._removeComma($('#inputDiscount').val()) || 0;
    var _amount = this._removeComma($('#inputAmount').val()) || 0;
    var _note = $('#inputNote').val();

    // Push new orderItem to orderItemList
    var newOrderItem = {
      categoryName: _catName,
      productName: _productName,
      product: _productId,
      quantity: _quantity,
      price: _price,
      discount: _discount,
      amount: _amount,
      note: _note
    };

    if (newOrderItem.product.length < 24 && newOrderItem.quantity < 1) {
      OrderActions.addOrderItem(newOrderItem);
    }
  },

  _resetInput: function() {
    React.findDOMNode(this.refs.inputProduct).value = '';
    $('#inputQuantity').val(0);
    $('#inputPrice').val(0);
    $('#inputDiscount').val(0);
    $('#inputAmount').val(0);
    $('#inputNote').val('');
  },

  _removeComma: function (str) {
    return str.replace(/[^0-9.]/g, '');
  }

});
