import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import moment from 'moment'

// import Table from 'material-ui/lib/table/table';
// import TableBody from 'material-ui/lib/table/table-body';
// import TableFooter from 'material-ui/lib/table/table-footer';
// import TableHeader from 'material-ui/lib/table/table-header';
// import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
// import TableRow from 'material-ui/lib/table/table-row';
// import TableRowColumn from 'material-ui/lib/table/table-row-column';

import { fetchJSON } from './util'

export default class SearchResults extends Component {
  constructor(props) {
    super(props)

    this.state = {
      items: []
    }
  }

  fetchNewData(props) {
    (async() => {
      let data = await fetchJSON(props.uri)
      console.log(data)
      this.setState({
        items: data.items
      })
    })()
  }

  componentWillMount() {
    this.fetchNewData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.fetchNewData(nextProps)
  }

  render() {
    return (
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th colSpan="4" style={{textAlign: 'center'}}>
              Top Starred Repos from {this.props.start} to {this.props.end}
            </th>
          </tr>
          <tr>
            <th>Repo</th>
            <th>Description</th>
            <th>Stars</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {this.state.items.map(item =>
            <tr key={item.id}>
              <td><a href={item.html_url} target="_blank" style={{
                color: 'black',
                textDecoration: 'none'
              }}>{item.name}</a></td>
              <td>{item.description}</td>
              <td>{item.watchers}</td>
              <td>{moment(item.created_at).format('MMMM Do, YYYY')}</td>
            </tr>
          )}
        </tbody>
      </Table>
    )
  }
}

// <Table
//   fixedHeader={true}
//   selectable={false}
//   multiSelectable={false}
//   height={'500px'}>
//   <TableHeader enableSelectAll={false}>
//     <TableRow>
//       <TableHeaderColumn colSpan="4" style={{textAlign: 'center'}}>
//         Top Starred Repos from {this.props.start} to {this.props.end}
//       </TableHeaderColumn>
//     </TableRow>
//     <TableRow>
//       <TableHeaderColumn tooltip='Repository'>Repo</TableHeaderColumn>
//       <TableHeaderColumn tooltip='Description'>Description</TableHeaderColumn>
//       <TableHeaderColumn tooltip='Number of Stars'>Stars</TableHeaderColumn>
//       <TableHeaderColumn tooltip='Date Created'>Created</TableHeaderColumn>
//     </TableRow>
//   </TableHeader>
//   <TableBody
//     deselectOnClickaway={true}
//     showRowHover={false}
//     stripedRows={false}>
//     {this.state.items.map(item =>
//       <TableRow key={item.id}>
//         <TableRowColumn>
//           <a href={item.html_url} target="_blank" style={{
//             color: 'black',
//             textDecoration: 'none'
//           }}>{item.name}</a>
//         </TableRowColumn>
//         <TableRowColumn>{item.description}</TableRowColumn>
//         <TableRowColumn>{item.watchers}</TableRowColumn>
//         <TableRowColumn>{moment(item.created_at).format('MMMM Do, YYYY')}</TableRowColumn>
//       </TableRow>
//     )}
//   </TableBody>
// </Table>
