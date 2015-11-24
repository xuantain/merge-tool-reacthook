'use strict';

var React = require('react'),
		ProductRow = require('./../components/ProductRow');

module.exports = React.createClass({
	render: function() {
		return (
			<table className='table table-striped table-bordered table-hover'>
				<thead>
					<tr>
						<th>#</th>
						<th>Product Name</th>
						<th>Category</th>
						<th>Price</th>
						<th>Stock</th>
						<th>Description</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{
						this.props.productListData.map(function(product, index) {
							return (
								<ProductRow
									key={'product-'+product._id}
									index={index}
									product={product}
									{...this.props}/>
							)
						}, this)
					}
				</tbody>
			</table>
		);
	}
});
