'use strict';

var React = require('react'),
		OrderItem = require('./../components/OrderItem');

module.exports = React.createClass({
	render: function() {
		return (
			<table className='table table-striped table-bordered table-hover'>
				<thead>
					<tr>
						<th>#</th>
						<th>CreatedAt</th>
						<th>Shop Name</th>
						<th>Order status</th>
						<th>Amount</th>
						<th>Note</th>
					</tr>
				</thead>
				<tbody>
					{
						this.props.orderListData.map(function(order, index) {
							return (
								<OrderItem
									key={'order-'+order._id}
									index={index}
									order={order}
									{...this.props}/>
							);
						}, this)
					}
				</tbody>
			</table>
		);
	}
});
