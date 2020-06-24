const Tree = {
	Node: class Node {
		constructor(int, left, right) {
			this.value = int;
			this.left = left;
			this.right = right;
		}

		remove(int) {
			if (int < this.value && this.left) {
				this.left = this.left.remove(int);
			} else if (int > this.value && this.right) {
				this.right = this.right.remove(int);
			} else {
				if (!this.left) {
					return this.right;
				}
				if (!this.right) {
					return this.left;
				}

				this.value = Tree.minValue(this.right).value;

				this.right = this.right.remove(this.value);
			}
			return this;
		}

		add(int) {
			if (this.value === int) {
				return null;
			}

			if (this.value < int) {
				if (this.right) {
					return this.right.add(int);
				} else {
					this.right = new Tree.Node(int);
					return this.right;
				}
			} else {
				if (this.left) {
					return this.left.add(int);
				} else {
					this.left = new Tree.Node(int);
					return this.left;
				}
			}
		}

		equals(node) {
			this.value = node.value;
			this.left = node.left;
			this.right = node.right;
		}
	},
	BLACK: 0,
	RED: 1,
	_size: 50,
	width: (node) => {
		if (!node) return 0;
		let width = 1;
		if (node.left) width += Tree.width(node.left);
		if (node.right) width += Tree.width(node.right);
		return width;
	},
	leftWidth: (node) => {
		if (!node.left) return 0;
		if (!node.left.right) return 1;
		return Tree.width(node.left.right) + 1;
	},
	rightWidth: (node) => {
		if (!node.right) return 0;
		if (!node.right.left) return 1;
		return Tree.width(node.right.left) + 1;
	},
	minValue: (node) => {
		let cursor = node;
		while (cursor.left) {
			cursor = cursor.left;
		}
		return cursor;
	},
};

Tree.RedBlack = class {
	add(int) {
		if (!this.root) {
			this.root = new Tree.Node(int);
			this.root.color = Tree.BLACK;
			return true;
		}

		let inserted = this.root.add(int);
		if (!inserted) return false;
		inserted.color = Tree.RED;

		return true;
	}
	remove(int) {
		if (!this.root) {
			return false;
		}
		this.root = this.root.remove(int);
	}

	draw(x, y, node = this.root) {
		if (!node) {
			return;
		}

		if (node.left) {
			const xoff = Tree.leftWidth(node) * Tree._size;
			stroke(255);
			line(x, y, x - xoff, y + Tree._size);
			this.draw(x - xoff, y + Tree._size, node.left);
		}
		if (node.right) {
			const xoff = Tree.rightWidth(node) * Tree._size;
			stroke(255);
			line(x, y, x + xoff, y + Tree._size);
			this.draw(x + xoff, y + Tree._size, node.right);
		}

		strokeWeight(2);
		if (node.color === Tree.BLACK) {
			stroke(127);
			fill(0);
		} else {
			fill(255, 0, 0);
			stroke(100, 0, 0);
		}
		ellipse(x, y, Tree._size);

		fill(255);
		noStroke();
		textAlign(CENTER);
		textSize(Tree._size / 2);
		text(node.value, x, y + Tree._size / 8);
	}
};
