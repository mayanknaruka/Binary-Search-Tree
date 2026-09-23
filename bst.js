class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    }

    buildTree(array) {
        // Remove duplicates
        const uniqueArray = [...new Set(array)];

        // Sort numbers from smallest to largest
        uniqueArray.sort((a, b) => a - b);

        // If array is empty
        if (uniqueArray.length === 0) {
            return null;
        }

        // Find middle element
        const middle = Math.floor(uniqueArray.length / 2);

        // Create node with middle value
        const root = new Node(uniqueArray[middle]);

        // Build left subtree
        root.left = this.buildTree(uniqueArray.slice(0, middle));

        // Build right subtree
        root.right = this.buildTree(uniqueArray.slice(middle + 1));

        return root;
    }

    includes(value) {
        let current = this.root;

        while (current !== null) {
            if (value === current.data) {
                return true;
            }

            if (value < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
        }

        return false;
    }

    insert(value) {
        const newNode = new Node(value);

        // If tree is empty
        if (this.root === null) {
            this.root = newNode;
            return;
        }

        let current = this.root;

        while (true) {
            // Don't insert duplicates
            if (value === current.data) {
                return;
            }

            // Go left
            if (value < current.data) {
                if (current.left === null) {
                    current.left = newNode;
                    return;
                }

                current = current.left;
            }

            // Go right
            else {
                if (current.right === null) {
                    current.right = newNode;
                    return;
                }

                current = current.right;
            }
        }
    }

    deleteItem(value) {
        let current = this.root;
        let parent = null;

        // Find the node
        while (current !== null && current.data !== value) {
            parent = current;

            if (value < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
        }

        // Value doesn't exist
        if (current === null) {
            return;
        }

        // Case 1: No children
        if (current.left === null && current.right === null) {
            if (parent === null) {
                this.root = null;
            } else if (parent.left === current) {
                parent.left = null;
            } else {
                parent.right = null;
            }
        }

        // Case 2: Only right child
        else if (current.left === null) {
            if (parent === null) {
                this.root = current.right;
            } else if (parent.left === current) {
                parent.left = current.right;
            } else {
                parent.right = current.right;
            }
        }

        // Case 2: Only left child
        else if (current.right === null) {
            if (parent === null) {
                this.root = current.left;
            } else if (parent.left === current) {
                parent.left = current.left;
            } else {
                parent.right = current.left;
            }
        }

        // Case 3: Two children
        else {
            let successorParent = current;
            let successor = current.right;

            // Find smallest node in right subtree
            while (successor.left !== null) {
                successorParent = successor;
                successor = successor.left;
            }

            // Replace current value
            current.data = successor.data;

            // Remove successor
            if (successorParent.left === successor) {
                successorParent.left = successor.right;
            } else {
                successorParent.right = successor.right;
            }
        }
    }

    levelOrderForEach(callback) {
        if (typeof callback !== "function") {
            throw new Error("Callback is required");
        }

        const queue = [];

        if (this.root !== null) {
            queue.push(this.root);
        }

        while (queue.length > 0) {
            const current = queue.shift();

            callback(current.data);

            if (current.left !== null) {
                queue.push(current.left);
            }

            if (current.right !== null) {
                queue.push(current.right);
            }
        }
    }

    inOrderForEach(callback) {
        if (typeof callback !== "function") {
            throw new Error("Callback is required");
        }

        const traverse = (node) => {
            if (node === null) {
                return;
            }

            traverse(node.left);
            callback(node.data);
            traverse(node.right);
        };

        traverse(this.root);
    }

    preOrderForEach(callback) {
        if (typeof callback !== "function") {
            throw new Error("Callback is required");
        }

        const traverse = (node) => {
            if (node === null) {
                return;
            }

            callback(node.data);
            traverse(node.left);
            traverse(node.right);
        };

        traverse(this.root);
    }

    postOrderForEach(callback) {
        if (typeof callback !== "function") {
            throw new Error("Callback is required");
        }

        const traverse = (node) => {
            if (node === null) {
                return;
            }

            traverse(node.left);
            traverse(node.right);
            callback(node.data);
        };

        traverse(this.root);
    }

    height(value) {
        let current = this.root;

        // Find the node
        while (current !== null) {
            if (value === current.data) {
                break;
            }

            if (value < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
        }

        // Value not found
        if (current === null) {
            return undefined;
        }

        const getHeight = (node) => {
            if (node === null) {
                return -1;
            }

            const leftHeight = getHeight(node.left);
            const rightHeight = getHeight(node.right);

            return Math.max(leftHeight, rightHeight) + 1;
        };

        return getHeight(current);
    }

    depth(value) {
        let current = this.root;
        let depth = 0;

        while (current !== null) {
            if (value === current.data) {
                return depth;
            }

            if (value < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }

            depth++;
        }

        return undefined;
    }

    isBalanced() {
        const getHeight = (node) => {
            if (node === null) {
                return -1;
            }

            return Math.max(
                getHeight(node.left),
                getHeight(node.right)
            ) + 1;
        };

        const checkBalance = (node) => {
            if (node === null) {
                return true;
            }

            const leftHeight = getHeight(node.left);
            const rightHeight = getHeight(node.right);

            // Difference greater than 1 means unbalanced
            if (Math.abs(leftHeight - rightHeight) > 1) {
                return false;
            }

            // Check both subtrees
            return (
                checkBalance(node.left) &&
                checkBalance(node.right)
            );
        };

        return checkBalance(this.root);
    }

    rebalance() {
        const values = [];

        // In-order traversal gives sorted values
        this.inOrderForEach((value) => {
            values.push(value);
        });

        // Build a new balanced tree
        this.root = this.buildTree(values);
    }
}

module.exports = Tree;