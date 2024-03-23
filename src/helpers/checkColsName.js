export default function checkColsName(colsName) {
	let duplicateBoardName = false

	for (let colIndex = 0; colIndex < colsName.length; colIndex++) {
		colsName.forEach((col, id) => {
			if (colIndex !== id) {
				if (colsName[colIndex].name.toLowerCase().trim() === col.name.toLowerCase().trim()) {
					duplicateBoardName = true
				}
			}
		})
	}
	return duplicateBoardName
}
