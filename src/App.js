import React, { Component } from "react";

class App extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		const detail = {
			name: "Sujan Maharjan",
			email: "sujan@gmail.com",
			date: "1993-11-03",
		};
		console.log(detail);
	}
	render() {
		return <div>Hello World</div>;
	}
}

export default App;
