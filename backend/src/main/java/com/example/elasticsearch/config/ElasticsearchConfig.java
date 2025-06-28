package com.example.elasticsearch.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.elasticsearch.client.ClientConfiguration;
import org.springframework.data.elasticsearch.client.elc.ElasticsearchConfiguration;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;

@Configuration
@EnableElasticsearchRepositories(basePackages = "com.example.elasticsearch.repository")
public class ElasticsearchConfig extends ElasticsearchConfiguration {

    @Value("${spring.data.elasticsearch.client.endpoints}")
    private String endpoints;

    @Override
    public ClientConfiguration clientConfiguration() {
        return ClientConfiguration.builder()
                .connectedTo(endpoints)
                .withSocketTimeout(60000)
                .withConnectTimeout(60000)
                .build();
    }
}
