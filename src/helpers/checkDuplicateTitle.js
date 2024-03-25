export default function checkDuplicateTitle(board, title, newTask = true, prevTitle) {
	let duplicateTitleName = false

	board.forEach(col => {
		col.tasks.forEach(task => {
			if (newTask === true) {
				if (task.title.toLowerCase().trim() === title.toLowerCase().trim()) duplicateTitleName = true
			}
			if (newTask === false) {
				if (task.title.toLowerCase().trim() !== prevTitle.toLowerCase().trim()) {
					if (task.title.toLowerCase().trim() === title.toLowerCase().trim()) duplicateTitleName = true
				}
			}
		})
	})

	return duplicateTitleName
}
