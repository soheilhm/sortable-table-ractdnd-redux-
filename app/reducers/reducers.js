import * as types from '../constants/constants'

const initialState = {
	data: {
		optionItems: [
			{
				name: 'Header'
			},
			{
				name: 'Image'
			},
			{
				name: 'Content'
			},
			{
				name: 'Footer'
			}
		],
		selectedItems: [
			{
				name: '',
				column: 'Column 1'
			},
			{
				name: '',
				column: 'Column 2'
			},
			{
				name: '',
				column: 'Column 3'
			},
			{
				name: '',
				column: 'Column 4'
			}
		]
	}
}

export default function drag(state = initialState, action) {
	switch (action.type) {
		case types.DRAG:
			return reOrderCols(state, action.draggedCol, action.targetCol)
		default:
			return state
	}
}

const reOrderCols = (state, draggedCol, targetCol) => {
	let colOrder = state.data.optionItems.map((heading) => heading.name)
	let columns = state.data.optionItems.slice()
	let draggedColIndex = colOrder.indexOf(draggedCol.name)
	let targetColIndex = colOrder.indexOf(targetCol.name)

	columns.splice(draggedColIndex, 1)
	columns.splice(targetColIndex, 0, draggedCol)

	return { data: { optionItems: columns, selectedItems: state.table.selectedItems } }
}
