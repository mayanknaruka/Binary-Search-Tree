const Tree = require("./bst");


// Create an array of random numbers
function randomArray(size) {
    const array = [];

    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * 100));
    }

    return array;
}


// Create a tree from random numbers
const tree = new Tree(randomArray(15));


// Pretty print function
const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null || node === undefined) {
        return;
    }

    prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
    );

    console.log(
        `${prefix}${isLeft ? "└── " : "┌── "}${node.data}`
    );

    prettyPrint(
        node.left,
        `${prefix}${isLeft ? "    " : "│   "}`,
        true
    );
};


// ----------------------------------------
// 1. Print the original tree
// ----------------------------------------

console.log("========== ORIGINAL TREE ==========");

prettyPrint(tree.root);


// ----------------------------------------
// 2. Check if tree is balanced
// ----------------------------------------

console.log("\nIs tree balanced?");
console.log(tree.isBalanced());


// ----------------------------------------
// 3. Print all traversals
// ----------------------------------------

console.log("\n========== LEVEL ORDER ==========");

tree.levelOrderForEach((value) => {
    console.log(value);
});


console.log("\n========== PRE ORDER ==========");

tree.preOrderForEach((value) => {
    console.log(value);
});


console.log("\n========== POST ORDER ==========");

tree.postOrderForEach((value) => {
    console.log(value);
});


console.log("\n========== IN ORDER ==========");

tree.inOrderForEach((value) => {
    console.log(value);
}); 

// ----------------------------------------
// 4. Unbalance the tree
// ----------------------------------------

console.log("\n========== UNBALANCING TREE ==========");

tree.insert(101);
tree.insert(110);
tree.insert(120);
tree.insert(130);
tree.insert(140);

prettyPrint(tree.root);


// ----------------------------------------
// 5. Confirm tree is unbalanced
// ----------------------------------------

console.log("\nIs tree balanced after inserting values?");
console.log(tree.isBalanced());


// ----------------------------------------
// 6. Rebalance the tree
// ----------------------------------------

console.log("\n========== REBALANCING TREE ==========");

tree.rebalance();

prettyPrint(tree.root);

// ----------------------------------------
// 7. Confirm tree is balanced
// ----------------------------------------

console.log("\nIs tree balanced after rebalancing?");
console.log(tree.isBalanced());


// ----------------------------------------
// 8. Print traversals again
// ----------------------------------------

console.log("\n========== LEVEL ORDER ==========");

tree.levelOrderForEach((value) => {
    console.log(value);
});


console.log("\n========== PRE ORDER ==========");

tree.preOrderForEach((value) => {
    console.log(value);
});


console.log("\n========== POST ORDER ==========");

tree.postOrderForEach((value) => {
    console.log(value);
});


console.log("\n========== IN ORDER ==========");

tree.inOrderForEach((value) => {
    console.log(value);
});