import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import Column from '../components/Column'
import Row from '../components/Row'
import * as DragActions from '../actions/actions'


class Table extends React.Component {
	render(){
		const actions = this.props.actions;
		const optionItems = this.props.data.optionItems;
		const selectedItems = this.props.data.selectedItems;
		return (
			<table>
				<thead>
					<tr>
						{ optionItems.map((column,idx) => <Column key={idx} column={column} drag={actions.drag} />) }
					</tr>
				</thead>
				<tbody>
					<tr>
						{ selectedItems.map((column,idx) => <Column key={idx} column={column} drag={actions.drag} />) }

					</tr>
				</tbody>
			</table>
		);
	}
}



function mapStateToProps(state) {
  return {
    data: state.data
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(DragActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DragDropContext(HTML5Backend)(Table))
