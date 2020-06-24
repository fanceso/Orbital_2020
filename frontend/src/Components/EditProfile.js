import React from "react";
import axios from "axios";
import { getUserInfo } from "../utils/functions.js";
import Image from "../images/green.jpg";

class EditProfile extends React.Component {
	// constructor(props) {
	// 	super(props);
	// 	this.state = getUserInfo(this.props.token);

	// 	//this.handleClose = this.handleClose.bind(this);
	// }

	// handleSubmit = (e) => {
	// 	e.preventDefault();
	// 	if (this.state.pass !== this.state.conPass) {
	// 		alert("Passwords need to match");
	// 		return;
	// 	} else {
	// 		const config = {
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 			},
	// 		};
	// 		let user = {
	// 			name: this.state.name, //this is user-id
	// 			email: this.state.email,
	// 			password: this.state.pass,
	// 			gender: this.state.gender,
	// 			weight: this.state.weight,
	// 			height: this.state.height,
	// 			accountType: this.state.accountType,
	// 		};

	// 		user = JSON.stringify(user);
	// 		console.log(user);

	// 		axios
	// 			.post("http://localhost:5000/api/users/buyer", user, config)
	// 			.then((res) => {
	// 				console.log(res.data);
	// 				alert("Hi succeedd");
	// 				this.props.login();
	// 			})
	// 			.catch((err) => {
	// 				console.error(err);
	// 				alert("Try again");
	// 			});
	// 	}
	// };

	// handleClick = (e) => {
	// 	this.setState({
	// 		accountType: e.target.id,
	// 	});
	// 	// console.log(this.state.accountType);
	// };

	// handleChange = (e) => {
	// 	switch (e.target.id) {
	// 		case "password":
	// 			this.setState({
	// 				pass: e.target.value,
	// 			});
	// 			break;
	// 		case "confirmPassword":
	// 			this.setState({
	// 				conPass: e.target.value,
	// 			});
	// 			break;
	// 		case "user-id":
	// 			this.setState({
	// 				name: e.target.value,
	// 			});
	// 			break;
	// 		case "email":
	// 			this.setState({
	// 				email: e.target.value,
	// 			});
	// 			break;
	// 		case "gender":
	// 			this.setState({
	// 				gender: e.target.value,
	// 			});
	// 			break;
	// 		case "weight":
	// 			this.setState({
	// 				weight: e.target.value,
	// 			});
	// 			break;
	// 		case "height":
	// 			this.setState({
	// 				height: e.target.value,
	// 			});
	// 			break;
	// 		default:
	// 			console.error();
	// 	}
	// };

	// showError = () => {
	// 	if (this.state.pass !== this.state.conPass)
	// 		return (
	// 			<p class="text-sm text-red-600 italic"> Password does not match </p>
	// 		);
	// };

	render() {
		return (
			<form onSubmit={this.handleSubmit} class="w-full max-w-lg mx-auto my-6">
				<image class="h-64 w-64 my-3" src={Image} alt="" />
				<h1 class="text-center text-3xl mb-3">Edit Profile</h1>
				<input
					type="file"
					style={{ display: "none" }}
					onChange={this.handleChange}
					// to link to the button
					ref={(fileInput) => (this.fileInput = fileInput)}
				/>

				<button
					class="bg-gray-800 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded"
					onClick={() => this.fileInput.click()}
				>
					Choose file
				</button>
				{/* <button onClick={this.fileUpload}>Upload</button> */}

				<div class="flex flex-wrap -mx-3 mb-6">
					<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
						<label
							class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							for="grid-user-id"
						>
							User ID
						</label>
						<input
							name="name"
							class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
							id="user-id"
							// value={this.state.userid}
							type="text"
							placeholder="Jane"
							onChange={this.handleChange}
						/>
					</div>

					<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
						<label
							class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							for="grid-email"
						>
							Email
						</label>
						<input
							name="email"
							class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
							id="email"
							type="email"
							placeholder="jane@gmail.com"
							onChange={this.handleChange}
						/>
					</div>
				</div>
				<div class="flex flex-wrap -mx-3 mb-6">
					<div class="w-full px-3">
						<label
							class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							for="grid-user-id"
						>
							Shipping address
						</label>
						<input
							name="shipAddress"
							class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
							id="user-id"
							// value={this.state.userid}
							type="text"
							placeholder="Insert your address"
							onChange={this.handleChange}
						/>
					</div>
				</div>
				<div class="flex flex-wrap -mx-3 mb-6">
					<div class="w-full px-3">
						<label
							class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							for="grid-user-id"
						>
							Mailing address
						</label>
						<input
							name="mailAddress"
							class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
							id="user-id"
							// value={this.state.userid}
							type="text"
							placeholder="Insert your address"
							onChange={this.handleChange}
						/>
					</div>
				</div>
				<div class="flex flex-wrap -mx-3 mb-6">
					<div class="w-full px-3">
						<label
							class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							for="grid-password"
						>
							Password (8 characters minimum)
						</label>
						<input
							name="password"
							class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							id="password"
							type="password"
							placeholder="******************"
							minlength="8"
							onChange={this.handleChange}
						/>
					</div>
				</div>

				<div class="flex flex-wrap -mx-3 mb-6">
					<div class="w-full px-3">
						<label
							class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							for="grid-gender"
						>
							Gender
						</label>
						<div class="relative">
							<select
								class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
								id="gender"
								onChange={this.handleChange}
							>
								<option>Male</option>
								<option>Female</option>
								<option>Others</option>
							</select>
							<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
								<svg
									class="fill-current h-4 w-4"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
								>
									<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
								</svg>
							</div>
						</div>
					</div>
				</div>

				<div class="flex flex-wrap -mx-3 mb-6">
					<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
						<label
							class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							for="grid-weight"
						>
							Weight
						</label>
						<input
							name="weight"
							class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							id="weight"
							type="number"
							placeholder="in kg"
							onChange={this.handleChange}
						/>
					</div>

					<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
						<label
							class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
							for="grid-height"
						>
							Height
						</label>
						<input
							name="height"
							class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
							id="height"
							type="number"
							placeholder="in cm"
							onChange={this.handleChange}
						/>
					</div>
				</div>

				<button
					class="bg-gray-800 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded"
					// disabled={!this.state.match}
					type="submit"
					id="button"
				>
					Save Changes
				</button>
				{/* <div>
					gender={this.state.gender}, weight={this.state.weight}, height=
					{this.state.height}, name={this.state.name}
				</div> */}
			</form>
		);
	}
}

export default EditProfile;
