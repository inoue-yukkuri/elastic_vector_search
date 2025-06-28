package com.example.elasticsearch.service;

import com.example.elasticsearch.model.Product;
import com.example.elasticsearch.repository.ProductRepository;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.query.Criteria;
import org.springframework.data.elasticsearch.core.query.CriteriaQuery;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ElasticsearchOperations elasticsearchOperations;

    public List<Product> getAllProducts() {
        return (List<Product>) productRepository.findAll();
    }

    public Optional<Product> getProductById(String id) {
        return productRepository.findById(id);
    }

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    public void deleteProduct(String id) {
        productRepository.deleteById(id);
    }

    public List<Product> searchProducts(String query) {
        Criteria criteria = new Criteria()
                .or("name").contains(query)
                .or("description").contains(query)
                .or("category").contains(query);

        CriteriaQuery searchQuery = new CriteriaQuery(criteria);
        SearchHits<Product> searchHits = elasticsearchOperations.search(searchQuery, Product.class);
        return searchHits.getSearchHits().stream()
                .map(hit -> hit.getContent())
                .toList();
    }

    public List<Product> searchByName(String name) {
        return productRepository.findByNameContainingIgnoreCase(name);
    }

    public List<Product> searchByDescription(String description) {
        return productRepository.findByDescriptionContainingIgnoreCase(description);
    }

    public List<Product> searchByCategory(String category) {
        return productRepository.findByCategory(category);
    }

    public List<Product> searchByPriceRange(Double minPrice, Double maxPrice) {
        return productRepository.findByPriceBetween(minPrice, maxPrice);
    }

    public void importFromCsv(MultipartFile file) throws IOException, CsvException {
        try (CSVReader reader = new CSVReader(new InputStreamReader(file.getInputStream()))) {
            List<String[]> rows = reader.readAll();

            // ヘッダー行をスキップ
            for (int i = 1; i < rows.size(); i++) {
                String[] row = rows.get(i);
                if (row.length >= 5) {
                    Product product = new Product();
                    product.setName(row[0]);
                    product.setDescription(row[1]);
                    product.setCategory(row[2]);
                    product.setPrice(Double.parseDouble(row[3]));
                    product.setStock(Integer.parseInt(row[4]));

                    productRepository.save(product);
                }
            }
        }
    }

    public long getProductCount() {
        return productRepository.count();
    }
}
