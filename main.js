const App = React.createClass({
  getInitialState() {
    return {
      products: [],

    }
  },

  componentDidMount() {
    console.log('did mount')
  },

  componentWillUpdate() {
    console.log('did update')

  },

  addNewProduct(newProduct) {

    //console.log('product2: ', product)

    const { products } = this.state;

    this.setState({
      products: [...products, newProduct],
    })

  },

  removeProduct(id) {
    const { products } = this.state;

    this.setState({
      products: products.filter(product => product.id !== id)
    });
  },

  render() {
    const { products } = this.state;

    return (
      <div className="container">
        <h1>Product List</h1>
        {/* addNewProduct is a prop, setting it equal to the value of the function above */}
        <NewProductForm addNewProduct={this.addNewProduct}/>
        <ProductTable products={products} removeProduct={this.removeProduct}/>
      </div>
    )
  }
})

//stateless component: it will recieve props
const ProductTable = props => {
  const { products, removeProduct } = props;



  //when you make a stateless component, the function acts as your render function
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>

        {/* index will be used as a key, when you have an array of elements in React, you need to give each one a key prop so that React can keep track/manage these changes
         ' ..., index)=> () ', using '()' includes the 'return', otherwise using '{}' you must include return */}
        {products.map(product => (
          <tr key={product.id}>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>

              <button onClick={removeProduct.bind(null, product.id)} className="btn btn-sm btn-danger">X</button>
            </td>
          </tr>
        ))}

      </tbody>
    </table>
  )
}


//dumb component: It's job is to manage the form, read the data and grab it, and package it for us
const NewProductForm = React.createClass({

  submitForm(e) {
    e.preventDefault();

    let { name, price } = this.refs;

    let product = {
      name: name.value,
      price: parseFloat(price.value),
      id: uuid(),
    }
    console.log('product: ', product);

    this.props.addNewProduct(product);
  },

  render() {
    return(

    <form onSubmit={this.submitForm}>
      <div className="form-group">
        <label htmlFor="newName">Product Name:</label>
        <input ref='name' type="text" className="form-control" id="newName" required/>
      </div>
      <div className="form-group">
        <label htmlFor="newPrice">Price:</label>
        <input ref='price' type="number" className="form-control" id="newPrice" min='0' step='0.01' required/>
      </div>
      <button className="btn btn-default">Add</button>
    </form>
    )
  }

})

ReactDOM.render(
  <App/>,
  document.getElementById('root')
)
