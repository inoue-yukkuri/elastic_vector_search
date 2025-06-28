package com.example.elasticsearch.controller;

import com.example.elasticsearch.model.Product;
import com.example.elasticsearch.service.ProductService;
import com.opencsv.exceptions.CsvException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable String id) {
        Optional<Product> product = productService.getProductById(id);
        return product.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        Product savedProduct = productService.saveProduct(product);
        return ResponseEntity.ok(savedProduct);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable String id, @RequestBody Product product) {
        Optional<Product> existingProduct = productService.getProductById(id);
        if (existingProduct.isPresent()) {
            product.setId(id);
            Product updatedProduct = productService.saveProduct(product);
            return ResponseEntity.ok(updatedProduct);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable String id) {
        Optional<Product> product = productService.getProductById(id);
        if (product.isPresent()) {
            productService.deleteProduct(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProducts(@RequestParam String query) {
        List<Product> products = productService.searchProducts(query);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/search/name")
    public ResponseEntity<List<Product>> searchByName(@RequestParam String name) {
        List<Product> products = productService.searchByName(name);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/search/description")
    public ResponseEntity<List<Product>> searchByDescription(@RequestParam String description) {
        List<Product> products = productService.searchByDescription(description);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/search/category")
    public ResponseEntity<List<Product>> searchByCategory(@RequestParam String category) {
        List<Product> products = productService.searchByCategory(category);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/search/price")
    public ResponseEntity<List<Product>> searchByPriceRange(
            @RequestParam Double minPrice,
            @RequestParam Double maxPrice) {
        List<Product> products = productService.searchByPriceRange(minPrice, maxPrice);
        return ResponseEntity.ok(products);
    }

    @PostMapping("/import")
    public ResponseEntity<String> importFromCsv(@RequestParam("file") MultipartFile file) {
        try {
            productService.importFromCsv(file);
            return ResponseEntity.ok("CSVファイルのインポートが完了しました");
        } catch (IOException | CsvException e) {
            return ResponseEntity.badRequest().body("CSVファイルのインポートに失敗しました: " + e.getMessage());
        }
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getProductCount() {
        long count = productService.getProductCount();
        return ResponseEntity.ok(count);
    }
}
