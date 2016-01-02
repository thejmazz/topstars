import React, { Component } from 'react'
import moment from 'moment'
import FMUI, { FormsyDate } from 'formsy-material-ui'
import RaisedButton from 'material-ui/lib/raised-button'

import SearchResults from './SearchResults'

export default class Search extends Component {
  constructor() {
    super()

    this.state = {
      start_date: '2015-01-01',
      end_date: '2016-01-01',
    }

    this.valid = false
  }

  submit = (model) => {
    let newState = {}
    for (let date of Object.keys(model)) {
      newState[date] = moment(model[date]).format('YYYY-MM-DD')
    }
    this.setState(newState)
  }

  constructUri() {
    const baseUri = 'https://api.github.com/search/repositories'
    let params = {
      q: `created:"${this.state.start_date}+..+${this.state.end_date}"`,
      sort: 'stars',
      order: 'desc',
      per_page: '100'
    }
    params = Object.keys(params).map(key => `${key}=${params[key]}`).join('&')

    const uri = baseUri + '?' + params
    return uri
  }

  render() {
    return (
      <div>
        <Formsy.Form onValidSubmit={this.submit} onValid={this.valid=true} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          {Object.keys(this.state).map(key =>
            <FormsyDate required name={key} floatingLabelText={key.replace(/_/, ' ')} style={{
              float: 'left',
              marginRight: '10px'
            }}/>
          )}
          <RaisedButton type='submit' label='Go!' disabled={!this.valid} />
          <div style={{clear: 'both'}} />
        </Formsy.Form>
        <SearchResults uri={this.constructUri()} start={this.state.start_date} end={this.state.end_date}/>
      </div>
    )
  }
}
