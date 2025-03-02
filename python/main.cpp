#include <iostream>
using namespace std;

// Define the structure of a BST Node
struct Node {
    int data;
    Node* left;
    Node* right;
    
    // Constructor to create a new node
    Node(int val) : data(val), left(nullptr), right(nullptr) {}
};

// Function to insert a node into the BST
Node* insert(Node* root, int data) {
    if (root == nullptr) {
        return new Node(data);
    }
    if (data < root->data) {
        root->left = insert(root->left, data);
    } else {
        root->right = insert(root->right, data);
    }
    return root;
}

// Function to find the sibling of the target node
int findSibling(Node* root, int target) {
    if (root == nullptr || root->data == target) {
        return -1; // Base case: root is null or target is the root
    }
    
    // Check if the target is a child of the current node
    if (root->left && root->left->data == target) {
        if (root->right) {
            return root->right->data;  // Sibling is the right child
        } else {
            return -1;  // No sibling exists
        }
    }
    if (root->right && root->right->data == target) {
        if (root->left) {
            return root->left->data;  // Sibling is the left child
        } else {
            return -1;  // No sibling exists
        }
    }
    
    // Recur for left or right subtree
    if (target < root->data) {
        return findSibling(root->left, target);
    } else {
        return findSibling(root->right, target);
    }
}

// Main function to read input and process
int main() {
    int n, target;
    cin >> n >> target;  // Read the number of nodes and the target node
    
    Node* root = nullptr;
    int value;
    
    // Build the BST
    for (int i = 0; i < n; i++) {
        cin >> value;
        root = insert(root, value);
    }
    
    // Find the sibling of the target node
    int sibling = findSibling(root, target);
    if (sibling != -1) {
        cout << sibling << endl;
    } else {
        cout << "NULL" << endl;  // No sibling found
    }
    
    return 0;
}
