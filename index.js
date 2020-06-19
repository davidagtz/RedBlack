const tree = new Tree.RedBlack();

function setup() {
	const container = document.getElementById("container");
	const canvas = createCanvas(0, 0);
	canvas.parent(container);
	canvas.resize(container.clientWidth, container.clientHeight);

	const controls = document.getElementById("controls");
	const add = createInputWithButton("ADD", (input) => {
		tree.add(parseInt(input.value()));
	});
	const remove = createInputWithButton("REMOVE", (input) => {
		tree.remove(parseInt(input.value()));
	});
	add.parent(controls);
	remove.parent(controls);
}

function draw() {
	background(0);
}

/**
 * Creates a div wrapper and label for an input
 * @param {number} str Label for the input
 * @returns {p5.Element}
 */
function createInputWithButton(str, onPress) {
	const cont = createDiv();

	const input = createInput();
	input.parent(cont);

	const button = createButton(str);
	button.mousePressed(() => {
		onPress(input);
		input.value("");
	});
	button.parent(cont);

	return cont;
}
