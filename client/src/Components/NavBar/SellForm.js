//picture upload with 2 to 3 rows of size error->itemImageA&this.state.image becomes undefined/not loaded
//size table only delete last row-> use index to determine
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Image from "../../images/plus.svg";
import DeleteImage from "../../images/delete.svg";
import CloseImg from "../../images/close.svg";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { postItems } from "../../actions/shopActions";
import { setAlert } from "../../actions/alertActions";

class SellForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isSubmitted: false,
			price: "",
			title: "",
			brand: "",
			unit: "cm",
			meatype: "garment",
			categoryLeft: [
				"men",
				"women",
				"shirt",
				"skirt",
				"pants",
				"shorts",
				"dress",
				"t-shirt",
				"jeans",
			],
			categoryUsed: [],
			image: [],
			tempImage: [],
			outofstock: {}, //put the out of stock items in comma
			sizeTable: [
				{
					index: Math.random(),
					size: "",
					chest: "",
					bl: "",
					waist: "",
					hip: "",
					tl: "",
					bust: "",
					sl: "",
				},
			],
		};
	}

	appendData = (data) => {
		//insert image
		let displayImage = this.state.image.shift();
		this.state.image.forEach((image) => {
			data.append("itemImages", image); //problem here
		});
		let categoryStr = "";
		this.state.categoryUsed.forEach((cat, idx) => {
			if (idx) categoryStr = categoryStr.concat(",", cat);
			else categoryStr = categoryStr.concat(cat);
		});
		console.log(categoryStr);
		//inserting size datas
		this.state.sizeTable.forEach((sizeOne, idx) => {
			data.append(`size${idx + 1}`, sizeOne.size.toUpperCase());
			data.append(`size${idx + 1}chest`, sizeOne.chest);
			data.append(`size${idx + 1}bl`, sizeOne.bl);
			data.append(`size${idx + 1}waist`, sizeOne.waist);
			data.append(`size${idx + 1}hip`, sizeOne.hip);
			data.append(`size${idx + 1}tl`, sizeOne.tl);
			data.append(`size${idx + 1}bust`, sizeOne.bust);
			data.append(`size${idx + 1}sl`, sizeOne.sl);
		});

		data.append("category", categoryStr);
		data.append("title", this.state.title);
		data.append("brand", this.state.brand);
		data.append("price", this.state.price);
		data.append("displayImage", displayImage);
		data.append("sizechartunit", this.state.unit);
		data.append("sizechartmeatype", this.state.meatype);
	};
	handleSubmit = async (e) => {
		e.preventDefault();
		if (
			this.state.sizeTable.length > 0 &&
			this.state.image.length > 0 &&
			this.state.categoryUsed.length > 0
		) {
			let data = new FormData();
			try {
				this.appendData(data);
				await this.props.postItems(data);
				this.setState({ isSubmitted: true });
			} catch (err) {
				console.log(err);
			}
		} else {
			if (this.state.sizeTable.length < 1)
				this.props.setAlert("Please fill in the size tabel", "danger");
			if (this.state.image.length < 1)
				this.props.setAlert("Must have at least one image", "danger");
			if (this.state.categoryUsed.length < 1)
				this.props.setAlert("Must have at least one category", "danger");
		}
	};

	handleChange = (e) => {
		this.setState({
			...this.state,
			[e.target.id]: e.target.value,
		});
	};

	handleImage = (e) => {
		this.setState({
			tempImage: [
				...this.state.tempImage,
				URL.createObjectURL(e.target.files[0]),
			],
			image: [...this.state.image, e.target.files[0]],
		});
	};

	imageItems = () => {
		let tempImage = this.state.tempImage;
		if (tempImage[0]) {
			return tempImage.map((item, index) =>
				index === 0 ? (
					<div
						className={
							"flex flex-col flex bg-gray-400 border-dotted border-green-800 border-2"
						}
					>
						<img
							key={index}
							className={"h-32 w-32 mx-1 my-3 object-cover"}
							src={item}
							alt=""
						/>
						<p className={"text-center"}>Display Image</p>
					</div>
				) : (
					<img
						key={index}
						className={"mx-1 h-32 w-32 my-3 object-cover"}
						src={item}
						alt=""
					/>
				)
			);
		} else {
			return (
				<p className={"text-3xl text-center w-full px-8 font-bold my-3"}>
					No image chosen
				</p>
			);
		}
	};
	addCategory = (e) => {
		this.setState({
			categoryUsed: [...this.state.categoryUsed, e.currentTarget.value],
			categoryLeft: this.state.categoryLeft.filter(
				(cat) => cat !== e.currentTarget.value
			),
		});
	};

	removeCategory = (e) =>
		this.setState({
			categoryLeft: [...this.state.categoryLeft, e.currentTarget.value],
			categoryUsed: this.state.categoryUsed.filter(
				(cat) => cat !== e.currentTarget.value
			),
		});

	handleChangeTable = (e) => {
		let sizeTable = [...this.state.sizeTable];
		sizeTable[e.target.dataset.id][e.target.name] = e.target.value;
	};

	removeRow = (row) => {
		this.setState({
			sizeTable: this.state.sizeTable.filter((r) => r !== row),
		});
	};

	addRow = () => {
		if (this.state.sizeTable.length === 8) return;
		this.setState((prevState) => ({
			sizeTable: [
				...prevState.sizeTable,
				{
					index: Math.random(),
					size: "",
					chest: "",
					bl: "",
					waist: "",
					hip: "",
					tl: "",
					bust: "",
					sl: "",
				},
			],
		}));
	};

	render() {
		if (this.props.user.accounttype === "buyer") window.location.assign("/");
		if (!this.props.user.stripeseller) {
			this.props.setAlert("Set up stripe account to sell item", "danger");
			return <Redirect to="/edit/profile/seller" />;
		}
		if (this.state.isSubmitted) {
			return <Redirect to="/store" />;
		} else {
			let { categoryUsed, categoryLeft } = this.state;

			return (
				<form
					action="/"
					onSubmit={this.handleSubmit}
					className={"flex flex-row w-full mx-auto my-6 relative"}
				>
					<div className={"w-1/2 pl-3"}>
						<div className={"w-full"}>
							<label
								className={
									"block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
								}
							>
								Listing picture
							</label>
							<div className={"flex flex-col rounded border-2 border-dashed"}>
								<img
									className={
										"self-center rounded-full h-16 w-16 my-3 object-cover"
									}
									onClick={() => this.fileInput.click()}
									src={Image}
									alt=""
								/>
								<p
									className={
										"text-center block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									}
								>
									Click here to add item picture
								</p>
							</div>
							<div
								className={
									"flex flex-row flex-wrap justify-around border-2 rounded border-dashed"
								}
							>
								{this.imageItems()}
							</div>
						</div>

						<input
							type="file"
							name="image"
							accept="image/*"
							hidden
							onChange={this.handleImage}
							// to link to the button
							ref={(fileInput) => (this.fileInput = fileInput)}
						/>
						<div className={"flex flex-wrap -mx-3"}>
							<div className={"w-full px-3 my-3 "}>
								<label
									className={
										"block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									}
									for="grid-user-id"
								>
									Title
								</label>
								<input
									name="title"
									className={
										"appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white required"
									}
									id="title"
									type="text"
									placeholder="Listing title"
									onChange={this.handleChange}
									required
								/>
							</div>
							<div className={"w-full px-3 my-3"}>
								<label
									className={
										"block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									}
									for="grid-gender"
								>
									Category
								</label>
								<div
									className={
										"flex flex-row flex-wrap justify-around border-2 rounded border-dashed"
									}
								>
									{categoryUsed[0] ? (
										categoryUsed.map((category) => (
											<button
												onClick={this.removeCategory}
												type="button"
												value={category}
												name={category}
												className={
													"flex bg-teal-600 my-2 mx-1 w-auto h-auto hover:bg-teal-400 text-white font-bold px-1 rounded"
												}
											>
												<div className={"self-center"} value={category}>
													{category.charAt(0).toUpperCase() + category.slice(1)}
												</div>
												<img
													className={"float-right ml-1 self-center w-5 h-5"}
													value={category}
													src={CloseImg}
													alt=""
												/>
											</button>
										))
									) : (
										<p
											className={
												"text-3xl text-center w-full px-8 font-bold my-3"
											}
										>
											No category picked
										</p>
									)}
								</div>
								<div
									className={
										"flex flex-row flex-wrap justify-around border-2 rounded border-dashed"
									}
								>
									{categoryLeft[0] ? (
										categoryLeft.map((category) => (
											<button
												onClick={this.addCategory}
												type="button"
												value={category}
												name={category}
												className={
													"flex bg-teal-600 my-2 mx-1 w-auto h-auto hover:bg-teal-400 text-white font-bold px-1 rounded"
												}
											>
												<div className={"self-center"} value={category}>
													{category.charAt(0).toUpperCase() + category.slice(1)}
												</div>
											</button>
										))
									) : (
										<p
											className={
												"text-3xl text-center w-full px-8 font-bold my-3"
											}
										>
											All category picked
										</p>
									)}
								</div>
							</div>
							<div className={"flex w-full my-3"}>
								<div className={"w-1/2 px-3 mb-6"}>
									<label
										className={
											"block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
										}
										for="grid-user-id"
									>
										Brand
									</label>
									<input
										name="brand"
										className={
											"appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white required"
										}
										id="brand"
										type="text"
										required
										placeholder="Some brand"
										onChange={this.handleChange}
									/>
								</div>
								<div className={"w-1/2 px-3 mb-6"}>
									<label
										className={
											"block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
										}
										for="grid-weight"
									>
										Price
									</label>
									<input
										name="price"
										step="0.01"
										className={
											"appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white required"
										}
										id="price"
										type="number"
										placeholder="19.99"
										onChange={this.handleChange}
										required
									/>
								</div>
							</div>
						</div>
					</div>
					<div className={"w-1/2"}>
						<div className={"flex"}>
							<div className={"w-1/2 px-3"}>
								<label
									className={
										"block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									}
									for="unit"
								>
									Measurement unit
								</label>
								<div className={"relative"}>
									<select
										className={
											"block appearance-none w-full bg-gray-200 border border-gray-200 text-black py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
										}
										name="unit"
										id="unit"
										onChange={this.handleChange}
									>
										<option value="cm">cm</option>
										<option value="in">inches</option>
									</select>
									<div
										className={
											"pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-black"
										}
									>
										<svg
											className={"fill-current h-4 w-4"}
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
										>
											<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
										</svg>
									</div>
								</div>
							</div>
							<div className={"w-1/2 px-3"}>
								<label
									className={
										"block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
									}
									for="meatype"
								>
									Measurement type
								</label>
								<div className={"relative"}>
									<select
										className={
											"block appearance-none w-full bg-gray-200 border border-gray-200 text-black py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
										}
										name="meatype"
										id="meatype"
										onChange={this.handleChange}
									>
										<option value="garment">Cloth measurements</option>
										<option value="body">Body measurements</option>
									</select>
									<div
										className={
											"pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-black"
										}
									>
										<svg
											className={"fill-current h-4 w-4"}
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
										>
											<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
										</svg>
									</div>
								</div>
							</div>
						</div>
						<label
							className={
								"block uppercase tracking-wide text-gray-700 text-xs font-bold my-2 mx-3"
							}
						>
							Size table
						</label>
						<table id="tableSizeTable" className="table-fixed mx-3">
							<thead>
								<tr className="bg-gray-500">
									<th className={"px-2 py-2"}>Size</th>
									<th className={"px-2 py-2"}>Chest</th>
									<th className={"px-2 py-2"}>Body length</th>
									<th className={"px-2 py-2"}>Waist</th>

									<th className={"px-2 py-2"}>Hip</th>
									<th className={"px-2 py-2"}>Total length</th>
									<th className={"px-2 py-2"}>Bust</th>
									<th className={"px-2 py-2"}>Skirt length</th>
								</tr>
							</thead>
							<tbody>
								{this.state.sizeTable.map((val, idx) => {
									let size = `size${idx}`,
										chest = `size${idx}chest`,
										bl = `size${idx}bl`,
										waist = `size${idx}waist`,
										hip = `size${idx}hip`,
										tl = `size${idx}tl`,
										bust = `size${idx}bust`,
										sl = `size${idx}sl`;
									return (
										<tr key={val.index}>
											<td className={"border px-2"}>
												<input
													className="w-full"
													type="text"
													name="size"
													data-id={idx}
													id={size}
													onChange={(e) => this.handleChangeTable(e)}
													required
												/>
											</td>
											<td className={"border px-2"}>
												<input
													className="w-full"
													type="text"
													name="chest"
													id={chest}
													data-id={idx}
													onChange={(e) => this.handleChangeTable(e)}
												/>
											</td>
											<td className={"border px-2"}>
												<input
													className="w-full"
													type="text"
													name="bl"
													id={bl}
													data-id={idx}
													onChange={(e) => this.handleChangeTable(e)}
												/>
											</td>
											<td className={"border px-2 "}>
												<input
													className="w-full"
													type="text"
													name="waist"
													id={waist}
													data-id={idx}
													onChange={(e) => this.handleChangeTable(e)}
												/>
											</td>
											<td className={"border px-2 "}>
												<input
													className="w-full"
													type="text"
													name="hip"
													id={hip}
													data-id={idx}
													onChange={(e) => this.handleChangeTable(e)}
												/>
											</td>
											<td className={"border px-2"}>
												<input
													className="w-full"
													type="text"
													name="tl"
													id={tl}
													data-id={idx}
													onChange={(e) => this.handleChangeTable(e)}
												/>
											</td>
											<td className={"border px-2"}>
												<input
													className="w-full"
													type="text"
													name="bust"
													id={bust}
													data-id={idx}
													onChange={(e) => this.handleChangeTable(e)}
												/>
											</td>
											<td className={"border px-2"}>
												<input
													className="w-full"
													type="text"
													name="sl"
													id={sl}
													data-id={idx}
													onChange={(e) => this.handleChangeTable(e)}
												/>
											</td>
											<td className={"border-l px-1"}>
												{idx === 0 ? (
													<div className={"p-1 w-10 h-10"}>
														<img
															onClick={() => this.addRow()}
															src={Image}
															alt=""
														/>
													</div>
												) : (
													<div className={"p-1 w-10 h-10"}>
														<img
															onClick={() => this.removeRow(val)}
															src={DeleteImage}
															alt=""
														/>
													</div>
												)}
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
					<button
						type="submit"
						className={
							"absolute bottom-0 right-0 bg-gray-800 my-2 mx-5 w-32 h-10 hover:bg-gray-600 text-white font-bold px-4 rounded"
						}
					>
						Submit
					</button>
				</form>
			);
		}
	}
}

SellForm.propTypes = {
	postItems: PropTypes.func,
	setAlert: PropTypes.func,
	user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	user: state.auth.user,
});

export default connect(mapStateToProps, { postItems, setAlert })(SellForm);
