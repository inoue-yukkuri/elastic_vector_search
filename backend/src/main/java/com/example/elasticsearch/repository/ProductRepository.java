package com.example.elasticsearch.repository;

import com.example.elasticsearch.model.Product;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends ElasticsearchRepository<Product, String> {

    List<Product> findByNameContainingIgnoreCase(String name);

    List<Product> findByDescriptionContainingIgnoreCase(String description);

    List<Product> findByCategory(String category);

    List<Product> findByPriceBetween(Double minPrice, Double maxPrice);
}
