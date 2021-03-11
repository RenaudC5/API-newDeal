import React from 'react';
import agent from './agent';
import Modal from './Modal'

class Country extends React.Component {

    state = {countries:[], currentCountry:null,showModal:false}

    constructor(){
        super();
        this.modal = React.createRef();
    }
    componentDidMount(){
        agent.COUNTRY.get().then(json => {
            console.log(json);
            this.setState({countries:json});
        });

    }

    deleteCountry(id){
        agent.COUNTRY.del(id);
        let countries = this.state.countries;
        let countriesNew = countries.filter(x => x.id !== id);
        this.setState({countries:countriesNew})
    }

    updateCountry(country){
        this.modal.current.updateCountry(country);
        this.changeModal(true);
    }

    changeModal(state){
        this.setState({showModal:state})
    }

    render(){
        console.log(this);
        let body = <tbody>
        {
            this.state.countries.map(country =>
                <tr>
                  <td>{country.id}</td>
                  <td>{country.country}</td>
                  <td>{country.abbreviation}</td>
                  <td><button class="button" onClick={() => this.updateCountry(country)}>Update</button></td>
                  <td><button class="button red" onClick={() => this.deleteCountry(country.id)}>Delete</button></td>
                </tr>
            )
            }
            </tbody>


        return(
            <div>
                <h1>Country</h1>
                <button class="button" onClick={() => this.updateCountry(null)}>Add Country</button>
                <Modal ref={this.modal} country={this.state.currentCountry} show={this.state.showModal} changeModal={(state) => this.changeModal(state)}></Modal>
                <table id="countries">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Abbreviation</th>
                    <th></th>
                    <th></th>
                  </tr>
                 </thead>
                    {body}
                </table>
            </div>
        )
    }
}

export default Country;
