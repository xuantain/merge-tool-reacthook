'use strict';

var React = require('react');
var PanelOverview = require('./../components/PanelOverview');

module.exports = React.createClass({
  render: function() {
    var dataPanelOverview = [
      {
        className: 'panel-primary',
        url: '#',
        title: 'New Comments!',
        icon: 'fa-comments',
        number: 26
      },
      {
        className: 'panel-green',
        url: '#',
        title: 'New Tasks!',
        icon: 'fa-tasks',
        number: 12
      },
      {
        className: 'panel-yellow',
        url: '#',
        title: 'New Orders!',
        icon: 'fa-shopping-cart',
        number: 124
      },
      {
        className: 'panel-red',
        url: '#',
        title: 'Support Tickets!',
        icon: 'fa-support',
        number: 13
      }
    ];
    return (
      <div id='page-wrapper'>
        <div className='row'>
          <div className='col-lg-12'>
            <h1 className='page-header'>Dashboard</h1>
          </div>
          {/*<!-- /.col-lg-12 -->*/}
        </div>
        {/*<!-- /.row -->*/}
        <div className="row">
        {
          dataPanelOverview.map(function(pandelData, index) {
            return <PanelOverview key={'pandelOverview-'+ index} data={pandelData} />
          })
        }
        </div>
      </div>
      //<!-- /#page-wrapper -->
    );
  }
});
