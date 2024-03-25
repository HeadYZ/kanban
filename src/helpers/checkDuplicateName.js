export default function checkDuplicateName(enteredNames, checkedValue = 'name') {
	let duplicateEnteredName = false

	for (let colIndex = 0; colIndex < enteredNames.length; colIndex++) {
		enteredNames.forEach((enteredName, id) => {
			if (colIndex !== id) {
				if (checkedValue === 'name') {
					if (enteredNames[colIndex].name.toLowerCase().trim() === enteredName.name.toLowerCase().trim()) {
						duplicateEnteredName = true
					}
				}
				if (checkedValue === 'title') {
					if (enteredNames[colIndex].title.toLowerCase().trim() === enteredName.title.toLowerCase().trim()) {
						duplicateEnteredName = true
					}
				}
			}
		})
	}
	return duplicateEnteredName
}
