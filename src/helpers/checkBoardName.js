export default function checkBoardName(boardName, boards, activeBoard) {
	let duplicateBoardName = false
	const boardsName = boards.map(board => board.name)

	if (activeBoard) {
		const indexCurrentBoard = boardsName.findIndex(name => name.toLowerCase() === activeBoard.toLowerCase())
		boardsName.forEach((name, boardId) => {
			if (indexCurrentBoard !== boardId) {
				if (name.toLowerCase().trim() === boardName.toLowerCase().trim()) {
					duplicateBoardName = true
				}
			}
		})
	} else {
		boardsName.forEach(name => {
			if (name.toLowerCase().trim() === boardName.toLowerCase().trim()) {
				duplicateBoardName = true
			}
		})
	}
	return duplicateBoardName
}
