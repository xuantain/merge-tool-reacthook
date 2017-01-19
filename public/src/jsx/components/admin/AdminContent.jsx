'use strict';

var React = require('react');
var PanelOverview = require('./../../components/common/PanelOverview');
var DataTable = require('./../../components/common/DataTable');

var AdminContent = React.createClass({

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
    var dataTable = {
      'title': 'DataTables Advanced Tables',
      'columnsShown': [
        {
          'key': 'renderingEngine',
          'title': 'Rendering engine'
        },
        {
          'key': 'browser',
          'title': 'Browser'
        },
        {
          'key': 'platform',
          'title': 'Platform(s)'
        },
        {
          'key': 'engineVersion',
          'title': 'Engine version'
        },
        {
          'key': 'cssGrade',
          'title': 'CSS grade'
        },
      ],
      'rowsData': [
        {
          'renderingEngine': 'Trident',
          'browser': 'Internet Explorer 5.0',
          'platform': 'Win 95+',
          'engineVersion': '5',
          'cssGrade': 'C'
        },
        {
          'renderingEngine': 'Trident',
          'browser': 'Internet Explorer 7',
          'platform': 'Win XP SP2+',
          'engineVersion': '7',
          'cssGrade': 'A'
        },
        {
          'renderingEngine': 'Trident',
          'browser': 'AOL browser (AOL desktop)',
          'platform': 'Win XP',
          'engineVersion': '6',
          'cssGrade': 'A'
        }
      ]
    };

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
          dataPanelOverview.map(function(panelData, index) {
            return <PanelOverview key={'panelOverview-'+ index} data={panelData} />
          })
        }
        </div>
        <div className="row">
          <DataTable title={dataTable.title} columnsShown={dataTable.columnsShown} rowsData={dataTable.rowsData} />
        </div>
        {/*<!-- /#page-wrapper -->*/}
      </div>
    );
  }
});

module.exports = AdminContent;
