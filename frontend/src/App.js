//problem upload profile pic
//sellform on progress
//how to handle error (error not handled yet)

//Press alt+click to edit multiple lines at once
import './App.css';
import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import NavBar from './Components/NavBar/NavBar';
import SellForm from './Components/NavBar/SellForm';
import Shop from './Components/Shop/Shop';
import Checkout from './Components/Checkout';
import EditProfileSeller from './Components/Profile/EditProfileSeller';
import EditProfileBuyer from './Components/Profile/EditProfileBuyer';
import FooterBar from './Components/FooterBar';
import Home from './Components/Home.js';

import PrivateRoute from './utils/PrivateRoute.js';
import SignupForm from './Components/SignIn/SignupForm.js';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <NavBar
        // menuSelect={this.menuSelect}
        //
        // token={this.state.token}
        // user={this.state.user}
        // login={this.login}
        // logout={this.logout}
        // getUserInfo={this.getUserInfo}
        // logout={this.logout}
        />
        <Switch>
          <Route path='/signup' component={SignupForm} />
          <Route path='/' exact component={Home} />
          <Route exact path='/shop' component={Shop} />

          <PrivateRoute
            path='/edit/profile/seller'
            component={EditProfileSeller}
          />
          <PrivateRoute
            path='/edit/profile/buyer'
            component={EditProfileBuyer}
          />
          <PrivateRoute path='/sell' component={SellForm} />
          {/* <PrivateRoute
            
            component={withProps(Checkout, {
              ...this.state,
            })}
            path='/checkout/success'
          /> */}
        </Switch>
        <FooterBar />
      </div>
    );
  }
}

export default withRouter(App);
/* Components
-------------------------------

-------------------------------
*/

/*
Template costructor
--------------------------------
constructor(props) {
	super(props);
	this.state = {
		
	};
	//can bind function here! (we didnt bind here because we use arrow function below)
}

handleClick = (e) => {
	//for the thing inside target it can be anything!
	this.setState({
		
	});
};
---------------------------------

// axios
// 	.get("http://localhost:5000")
// 	.then((res) => {
// 		console.log(res.data);
// 		// data = res.data;
// 		alert("Hi succeedd");
// 	})
// 	.catch((err) => {
// 		console.error(err);
// 		alert("Try again");
// 		console.log("hello");
// 	});

{
  /* To include upload pic button
	<input
	type="file"
	style={{ display: "none" }}
	onChange={this.handleChange}
	// to link to the button
	ref={(fileInput) => (this.fileInput = fileInput)}
/>

<button
	type="button"
	class="bg-gray-800 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded"
	onClick={() => this.fileInput.click()}
>
	Choose file
</button>
<button onClick={this.fileUpload}>Upload</button> 
}*/

// const formData = new FormData();
//     formData.append('file',file)
//     const config = {
//         headers: {
//             'content-type': 'multipart/form-data'
//         }
//     }
//     return  post(url, formData,config)
//   }
