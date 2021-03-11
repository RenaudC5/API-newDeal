import React from 'react'
import agent from './agent';

class Modal extends React.Component {

    state={country : {country:"", abbreviation:""}, add:true}
    constructor(props){
        super(props);
    }

    changeModal(e,state){
        let elements = document.querySelectorAll(".myModal");
        for(let elem of elements){
            if(elem === e.target){
                if(!state){
                    this.props.changeModal(false);
                }

            }
        }

    }

    componentDidMount(){
            this.setState({country:this.props.country, add:false})
    }

    updateName(e){
        let country = this.state.country;
        country.country = e.target.value;
        this.setState({country:country})
    }
    updateAbbreviation(e){
        let country = this.state.country;
        country.abbreviation = e.target.value;
        this.setState({country:country})
    }

    addCountry(event){
        agent.COUNTRY.post(this.state.country);
        this.changeModal(event,false)
    }
    putCountry(event){
        agent.COUNTRY.put(this.state.country.id,this.state.country);
        this.changeModal(event,false)
    }

    updateCountry(country){
        if(country){
            this.setState({country:country,add:false})
        } else {
            this.setState({country:{country:"",abbreviation:""},add:true})
        }

    }


    render(){
        return(
            <>
            {this.props.show ?
                <div id="myModal" class="modal myModal" onClick={(e) => this.changeModal(e,(!(e.target === document.querySelector("#myModal"))))}>

                  <div class="modal-content">
                    <span class="close myModal" onClick={(e) => this.changeModal(e,false)}>&times;</span>

                    <div class="input-modal">
                        <label>Name</label>
                        <input type="text" value={this.state.country.country} onChange={(event) => this.updateName(event)}/>
                    </div>
                    <div class="input-modal">
                        <label>Abbreviation</label>
                        <input type="text" value={this.state.country.abbreviation} onChange={(event) => this.updateAbbreviation(event)}/>
                    </div>
                    <div class="input-modal">
                        <button class="button myModal" onClick={(e) => this.state.add ? this.addCountry(e) : this.putCountry(e)}>{this.state.add ? "Add" : "Update"}</button>
                    </div>



                  </div>

                </div> : null
            }
            </>

        )
    }
}

export default Modal;
