import React from 'react'
import { browserHistory } from 'react-router'

export default class AddForm extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            inputValue: '',
            listItems: JSON.parse(localStorage.getItem('listItems')) || []
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSave = this.handleSave.bind(this)
    }
    componentDidMount(){
        let currentItem, inputValue
        if(this.props.params.id){
            [ currentItem ] = this.state.listItems.filter( item => item.id == this.props.params.id)
            inputValue = currentItem.itemName
            this.setState({ inputValue })
        }
    }
    handleChange(e){
        this.setState({ inputValue: e.target.value })
    }
    handleSave(){
        let itemName  = this.state.inputValue
        if(this.props.params.id){
            let { id } = this.props.params
            let item = { id, itemName }
            let listItems = [ ...this.state.listItems.filter( item => item.id != id), item ]
            localStorage.setItem('listItems', JSON.stringify(listItems))
        }
        else {
            let id = new Date().getTime()
            let item = { id, itemName }
            let listItems = [ ...this.state.listItems, item ]
            localStorage.setItem('listItems', JSON.stringify(listItems))
        }
        browserHistory.push('/list')
    }
    render(){
        return(
            <div className="container addForm">
                    <label htmlFor="item">Item Value</label>
                        <input type="text"
                               id="item"
                               className="form-control"
                               placeholder="Enter some text..."
                               value={this.state.inputValue}
                               onChange={this.handleChange}
                        />
                    <button className="btn btn-primary" onClick={this.handleSave}>Save</button>
                    <button className="btn btn-primary" onClick={browserHistory.goBack}>&lt;&lt; Go Back</button>
            </div>
        )
    }
}
