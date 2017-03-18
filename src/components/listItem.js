import React from 'react'
import { Link } from 'react-router'

export default class ItemList extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            listItems: JSON.parse(localStorage.getItem('listItems')) || []
        }
        this.mapItems = this.mapItems.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
    }
    mapItems( item, i ){
        return (
            <tr key={i}>
                <td>{item.itemName}</td>
                <td><Link to={`/list/edit/${ item.id }`}>Edit</Link></td>
                <td><a href="#" onClick={this.deleteItem} data-id={item.id}>Remove</a></td>
            </tr>
        )
    }
    deleteItem(e){
        e.preventDefault()
        let id = e.target.getAttribute('data-id')
        let listItems = [ ...this.state.listItems.filter( item => item.id != id)]
        this.setState({ listItems})
        localStorage.setItem('listItems', JSON.stringify(listItems))
    }
    render(){
        let { listItems } = this.state
        return(
            <div className="container">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <td>Item Name</td>
                        </tr>
                    </thead>
                    <tbody>
                        { listItems.map(this.mapItems) }
                    </tbody>
                </table>
            </div>
        )
    }
}
