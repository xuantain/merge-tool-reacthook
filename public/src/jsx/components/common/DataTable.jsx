'use strict';

var React = require('react');

module.exports = React.createClass({

  componentDidMount: function() {
    $('#dataTables-example').DataTable({
      responsive: true
    });
  },

  render: function () {
    return (
      <div className="col-lg-12">
        <div className="panel panel-default">
          <div className="panel-heading">
            DataTables Advanced Tables
          </div>
          <div className="panel-body">
            <div className="dataTable_wrapper">
              <table className="table table-striped table-bordered table-hover" id="dataTables-example">
                <thead>
                  <tr>
                    <th>Rendering engine</th>
                    <th>Browser</th>
                    <th>Platform(s)</th>
                    <th>Engine version</th>
                    <th>CSS grade</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="odd gradeX">
                    <td>Trident</td>
                    <td>Internet Explorer 4.0</td>
                    <td>Win 95+</td>
                    <td className="center">4</td>
                    <td className="center">X</td>
                  </tr>
                  <tr className="even gradeC">
                    <td>Trident</td>
                    <td>Internet Explorer 5.0</td>
                    <td>Win 95+</td>
                    <td className="center">5</td>
                    <td className="center">C</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
