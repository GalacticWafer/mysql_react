import * as React from 'react';
import inventory from '../server/db/inventory';
import Axios from 'axios';
import Product from './components/product';

class App extends React.Component<IAppProps, IAppState> {

	constructor(props: IAppProps) {
		super(props);
		this.state =  {inventory: []};
	}

	async componentDidMount() {
		this.getInverntorydata();
		try {
			let r = await fetch('/api/inventory');
			let inventory = await r.json();
			this.setState({ inventory });
		} catch (error) {
			console.log(error);
		}
	}

	getInverntorydata = () => {
		Axios.get('http://localhost:3000/api/inventory').then((response) => {
			const data = response.data;
			console.log(data);
		}).catch(() => {
			alert("error")
		});
	}
	
	render() {
		return (
			<main className="container my-5">
				<h1 className="covalence -blue">Full Inventory</h1>
				<ul className="list-">
					{this.state.inventory.map(inv => {
						return <Product inventory={inv}/>
					})}
				</ul>
			</main>
		);
	}
}

export interface IAppProps {}


export interface IAppState {
	inventory: Array<{
		"product_id": string,
		"quantity": BigInteger,
		"sale_price": number,
		"image_url": string,
		"product_title": string
	}>;
}

export default App;