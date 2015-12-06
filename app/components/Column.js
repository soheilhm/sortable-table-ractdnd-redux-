import React, { Component as C} from 'react'
import ReactDOM from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import { pipe } from 'ramda'

const headingSource = {
	beginDrag(props) {
		return {
			name: props.column.name
		}
	}
}

const headingTarget = {
	drop(props, monitor, component) {
		let draggedCol = monitor.getItem()
		let targetCol = component.decoratedComponentInstance.props.column
		// trigger drag action
		props.dragRight1(draggedCol, targetCol)
	}
}

function collect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}
}

function collectDrop(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
		canDrop: monitor.canDrop()
	}
}

class Column extends C {
	constructor(props) {
		super(props)
	}

	render() {
		const { column, connectDropTarget, connectDragSource, isOver, isDragging } = this.props
		return (
			<th style={{
					opacity: isOver ? 0.5 : 1,
					backgroundColor: isOver ? 'yellow' : 'inherit'
				}}>
				{
					connectDropTarget(connectDragSource(
						<div>
							{column.name}
						</div>
					))
				}
			</th>
		)
	}
}

export default pipe(DragSource('column', headingSource, collect), DropTarget('column', headingTarget, collectDrop))(Column)
