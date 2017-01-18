'use strict';

var React = require('react/addons');
var InputElm = require('./../../components/common/InputElement');

module.exports = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function() {
    return {
      username: '',
      password: ''
    };
  },
  login: function(e) {
    e.preventDefault();
    // check & validate input
    var error = 0;
    if(this.state.username === '') {
      error++;
      this.setState({usernameError: 'has-error'});
    } else {
      this.setState({usernameError: ''});
    }
    if(this.state.password === '') {
      error++;
      this.setState({passError: 'has-error'});
    } else {
      this.setState({passError: ''});
    }

    if(error > 0) { return; }

    console.log('submit');
    // if have no error then authenticate
    var info = {
      username: this.state.username,
      password: CryptoJS.SHA3(this.state.password, {outputLength: 256}).toString()
    };
    $.ajax({
      type: 'POST',
      dataType: 'json',
      url: 'api/user/login',
      crossOrigin: true,
      data: info,
      success: function(data) {
        console.log(data);
      },
      error: function(xhr, status, err) {
        console.error('login', status, err.toString());
      }
    });
  },
  render: function() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-4 col-md-offset-4'>
            <div className='login-panel panel panel-default'>
              <div className='panel-heading'>
                <h3 className='panel-title'>Please Sign In</h3>
              </div>
              <div className='panel-body'>
                <form role='form'>
                  <fieldset>
                    <div className='form-group'>
                      <input className='form-control' placeholder='E-mail' name='email' type='email' autofocus/>
                    </div>
                    <div className='form-group'>
                      <input className='form-control' placeholder='Password' name='password' type='password' value=''/>
                    </div>
                    <div className='checkbox'>
                      <label>
                        <input name='remember' type='checkbox' value='Remember Me'/>Remember Me
                      </label>
                    </div>
                    {/*<!-- Change this to a button or input when using this as a form -->*/}
                    <a href='index.html' className='btn btn-lg btn-success btn-block'>Login</a>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
