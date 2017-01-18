'use strict';

var React = require('react');
var InputElm = require('./../../components/common/InputElement');
var DropDownList = require('./../../components/common/DropDownList');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      categories: []
    };
  },
  componentWillMount: function () {
    this.getCategoies();
  },
  addProduct: function(e) {
    e.preventDefault();

    // Checking data inputs not null
    var errorCount = 0;
    $('#addProduct fieldset input').each(function(index, val) {
      if($(this).val() === '') {
        errorCount++;
      }
    });
    if ($('#category').val() === '') {
      errorCount++;
    }

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {
      // Adding newProduct to Server
      $('#addProduct').ajaxSubmit({
        success: function(response) {
          console.log(response);
          this.resetInput();
          this.props.refreshProductList();
        }.bind(this),
        error: function(xhr, status, err) {
          console.error('/api/products', status, err.toString());
        }
      });
    } else {
      // If errorCount is more than 0, error out
      console.error('Please fill in all fields');
    }
  },
  updateProduct: function(e) {
    e.preventDefault();
    var errorCount = 0;

    // Checking data inputs not null
    $('#addProduct fieldset input').each(function(index, val) {
      if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at <=1
    if(errorCount <= 1) {
      // If it is, compile all product info into one object
      var newProduct = {
        'category': React.findDOMNode(this.refs.category).value,
        'productName': $('#productName').val(),
        'price': $('#productPrice').val(),
        'quatity': $('#quatity').val(),
        'image': $('#image').val()
      };

      // Adding updateObj to Server
      $.ajax({
        type: 'PUT',
        dataType: 'json',
        url: '/api/products',
        data: updateObj,
        success: function(product) {
          if(!$.isEmptyObject(product)) {
            console.log('Update product successfully!');

            // Clear old form data
            $('#addProduct fieldset input').val('');

            // this.props.updateCallback(product);
          }
        }.bind(this),
        error: function(xhr, status, err) {
          console.error('/api/products', status, err.toString());
        }
      });

    } else {
      // If errorCount is more than 1, error out
      console.error('Please fill in all fields');
      return;
    }
  },
  getCategoies: function() {
    var getCats = $.get('/api/categories');
    var catList = [];

    getCats.done(function(data) {
      catList = data.categories;
      catList.splice(0, 0, { _id: '', categoryName: 'Choose' });
      this.setState({ categories: catList });
    }.bind(this));

    getCats.fail(function(xhr, status, err) {
      console.error('/api/catigories', status, err.toString());
    });
  },
  onChangeCategory: function(catId) {
    // change value
    // this.setState({category: category});
    console.log('onChangeCategory()');
  },
  resetInput: function() {
    // Clear old form data
    $('#addProduct fieldset input').val('');
    $('#category').val('');
    // this.props.cancel();
  },
  render: function() {
    return (
      <div className='panel panel-default'>
        <div className='panel-heading'>Add Product</div>
        <form id='addProduct' encType='multipart/form-data' action='/api/products' method='post'>
        <fieldset>
          <div className='input-group col-xs-6 col-sm-6 pull-left'>
            <span className='input-group-addon w20'>Category</span>
            <DropDownList _ref='category'
              dataList={this.state.categories}
              onChangeData={this.onChangeCategory}
              _key='_id' _value='categoryName'/>
          </div>
          <InputElm _ref='productName' title='Product name'
              styleClass='pull-right' placeholder='Product name'/>
          <InputElm _ref='price' title='Price' type='number'
              styleClass='pull-left' placeholder='Price'/>
          <InputElm _ref='image' title='Image' type='file'
              styleClass='pull-rifht' placeholder='Choose image'/>
          <div className='input-group col-xs-6 center'>
            <div className='col-xs-1'></div>
            <button id='btnAddProduct' className='btn btn-primary col-xs-5 col-sm-5' onClick={this.addProduct} >Add Product</button>
            <div className='col-xs-1'></div>
            <button id='btnCancel' className='btn btn-primary col-xs-4 col-sm-4' onClick={this.resetInput}>Cancel</button>
            <div className='col-xs-1'></div>
          </div>
        </fieldset>
        </form>
      </div>
    );
  }
});
