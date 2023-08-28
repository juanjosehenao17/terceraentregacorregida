const fs = require('fs');
module.exports = ProductManager;

class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
        this.loadProducts();
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            this.products = JSON.parse(data);
        } catch (error) {
            this.products = [];
        }
    }

    saveProducts() {
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf8');
    }

    addProduct(productData) {
        const codeExists = this.products.some(product => product.code === productData.code);
        if (codeExists) {
            throw new Error('Producto con el mismo código ya existe');
        }

        const newId = this.products.length > 0 ? this.products[this.products.length - 1].id + 1 : 1;
        const newProduct = { ...productData, id: newId };
        this.products.push(newProduct);
        this.saveProducts();
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (product) {
            return product;
        } else {
            console.log('Producto no encontrado');
            return null; 
        }
    }

    updateProduct(id, updatedFields) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex !== -1) {
            this.products[productIndex] = { ...this.products[productIndex], ...updatedFields };
            this.saveProducts();
        } else {
            console.log('Producto no encontrado');
        }
    }

    deleteProduct(id) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex !== -1) {
            this.products.splice(productIndex, 1);
            this.saveProducts();
        } else {
            console.log('Producto no encontrado');
        }
    }
}


