'use strict';

var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <div className='col-xs-12 col-sm-12'>
        <div className='row col-xs-6 col-sm-6 pull-left'>
          <ProductList
            productListData={this.state.productListData}
            showProductInfo={this.changeProductInfo}
            deleteCallback={this.removeProductFromList}/>
          <div className='row'>
            <div className='col-sm-3 pull-right'>
              <DropDownList
                dataList={pageSizes}
                onChangeData={this.changeProductsPerPage}/>
            </div>
          </div>
          <Pagination
            pages={this.state.pages}
            currentPage={this.state.currentPage}
            moveToPage={this.moveToPage}/>
        </div>
        <div className='row col-xs-6 col-sm-6 pull-right'>
          <ProductAdding
            productInfo={this.state.productInfo}
            updateCallback={this.updateProductToList}
            addCallback={this.addProductToList}
            cancel={this.cancel}/>
        </div>
      </div>
    );
  }
});
