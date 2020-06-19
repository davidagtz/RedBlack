const Tree = {
	Node: class Node {
		constructor(int, left, right) {
			this.value = int;
			this.left = left;
			this.right = right;
		}
	},
	BLACK: 0,
	RED: 1,
};

Tree.RedBlack = class {
	constructor() {
		this._size = 50;
	}

	add(int) {
		if (!this.root) {
			this.root = new Tree.Node(int);
			this.root.color = Tree.BLACK;
			return true;
		}

		let cursor = this.root;
		while (cursor) {
			if (cursor.value === int) {
				return false;
			}

			if (cursor.value < int) {
				if (cursor.right) {
					cursor = cursor.right;
				} else {
					cursor.right = new Tree.Node(int);
					cursor.right.color = Tree.RED;
					break;
				}
			} else {
				if (cursor.left) {
					cursor = cursor.left;
				} else {
					cursor.left = new Tree.Node(int);
					cursor.left.color = Tree.RED;
					break;
				}
			}
		}

		return true;
	}
	remove(int) {
		if (!this.root) {
			return false;
		}
	}

	draw(x, y, node = this.root) {
		if (!node) {
			return;
		}

		strokeWeight(2);
		if (node.color === Tree.BLACK) {
			stroke(127);
			fill(0);
		} else {
			fill(255, 0, 0);
			stroke(100, 0, 0);
		}
		ellipse(x, y, this._size);

		fill(255);
		noStroke();
		textAlign(CENTER);
		textSize(this._size / 2);
		text(node.value, x, y + this._size / 8);

		if (node.left) {
			this.draw(x - this._size, y + this._size, node.left);
		}
		if (node.right) {
			this.draw(x + this._size, y + this._size, node.right);
		}
	}
};
