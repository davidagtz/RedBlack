const Tree = {
	Node: class Node {
		constructor(int, left, right, parent) {
			this.value = int;
			this.left = left;
			this.right = right;
			this.parent = parent;
		}

		remove(int) {
			if (int < this.value && this.left) {
				this.setLeft(this.left.remove(int));
			} else if (int > this.value && this.right) {
				this.setRight(this.right.remove(int));
			} else {
				if (!this.left) {
					return this.right;
				}
				if (!this.right) {
					return this.left;
				}

				this.value = Tree.minValue(this.right).value;

				this.setRight(this.right.remove(this.value));
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
					this.setRight(new Tree.Node(int));
					return this.right;
				}
			} else {
				if (this.left) {
					return this.left.add(int);
				} else {
					this.setLeft(new Tree.Node(int));
					return this.left;
				}
			}
		}

		equals(node) {
			this.value = node.value;
			this.left = node.left;
			this.right = node.right;
		}

		uncle() {
			return this.parent.sibling();
		}

		sibling() {
			if (!this.parent.left) return this.left;

			if (this.parent.left.value === this.value) {
				return this.right;
			}
			return this.left;
		}

		grandparent() {
			return this.parent.parent;
		}

		is(node) {
			return node && node.value === this.value;
		}

		isLeft() {
			return this.is(this.parent.left);
		}

		isRight() {
			return this.is(this.parent.right);
		}

		setLeft(node) {
			this.left = node;
			if (node) node.parent = this;
		}

		setRight(node) {
			this.right = node;
			if (node) node.parent = this;
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

		this.repair(inserted);

		return true;
	}

	remove(int) {
		if (!this.root) {
			return false;
		}
		this.root = this.root.remove(int);
	}

	repair(node) {
		if (!node.parent) {
			node.color = Tree.BLACK;
		} else if (node.parent.color === Tree.RED) {
			if (!node.uncle() || node.uncle().color === Tree.BLACK) {
				if (node.isLeft() && node.parent.isRight()) {
					this.rightRotate(node.parent);
				} else if (node.isRight() && node.parent.isLeft()) {
					this.leftRotate(node.parent);
				}

				if (node.isLeft()) {
					this.rightRotate(node.parent);
				} else {
					this.leftRotate(node.parent);
				}

				node.parent.color = Tree.BLACK;
				node.sibling().color = Tree.RED;
			} else {
				node.parent.color = Tree.BLACK;
				node.uncle().color = Tree.BLACK;
				node.grandparent().color = Tree.RED;
				this.repair(node.grandparent());
				return;
			}
		}
	}

	rightRotate(node) {
		const p = node.parent;
		const n = node.left;

		node.setLeft(n.right);
		n.setRight(node);
		node.parent = n;

		if (p) {
			if (node.is(p.left)) {
				p.setLeft(n);
			} else if (node.is(p.right)) {
				p.setRight(n);
			}
		}
		n.parent = p;
	}

	leftRotate(node) {
		const p = node.parent;
		const n = node.right;

		node.setRight(n.left);
		n.setLeft(node);
		node.parent = n;

		if (p) {
			if (node.is(p.left)) {
				p.setLeft(n);
			} else if (node.is(p.right)) {
				p.setRight(n);
			}
		}
		n.parent = p;
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
