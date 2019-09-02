// 'use strict';

// var React = require('react/addons');
// var InputElm = require('./../../components/common/InputElement');

// var LoginForm = React.createClass({
//   mixins: [React.addons.LinkedStateMixin],
//   getInitialState: function() {
//     return {
//       username: '',
//       password: ''
//     };
//   },
//   login: function(e) {
//     e.preventDefault();
//     // check & validate input
//     var error = 0;
//     if(this.state.username === '') {
//       error++;
//       this.setState({usernameError: 'has-error'});
//     } else {
//       this.setState({usernameError: ''});
//     }
//     if(this.state.password === '') {
//       error++;
//       this.setState({passError: 'has-error'});
//     } else {
//       this.setState({passError: ''});
//     }

//     if(error > 0) { return; }

//     console.log('submit');
//     // if have no error then authenticate
//     var info = {
//       username: this.state.username,
//       password: CryptoJS.SHA3(this.state.password, {outputLength: 256}).toString()
//     };
//     $.ajax({
//       type: 'POST',
//       dataType: 'json',
//       url: 'api/user/login',
//       crossOrigin: true,
//       data: info,
//       success: function(data) {
//         console.log(data);
//       },
//       error: function(xhr, status, err) {
//         console.error('login', status, err.toString());
//       }
//     });
//   },
//   render: function() {
//     return (
//       <div id='loginForm' className='col-xs-12'>
//         <fieldset>
//           <InputElm ref='inputUsername' title='Username'
//             valueLink={this.linkState('username')}
//             styleClass={this.state.usernameError}
//             placeholder='Username'/>
//           <InputElm ref='inputPassword' title='Password'
//             valueLink={this.linkState('password')}
//             styleClass={this.state.passError}
//             placeholder='Password' type='password'/>
//           <div>
//             <input type='checkbox' id='remember'/><label htmlFor='remember'> Remember? </label>
//           </div>
//           <button ref='btnLogin' className='btn btn-primary col-xs-2 col-sm-2' onClick={this.login}>Login</button>
//         </fieldset>
//       </div>
//     );
//   }
// });

// module.exports = LoginForm;
