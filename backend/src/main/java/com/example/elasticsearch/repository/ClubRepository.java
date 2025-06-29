package com.example.elasticsearch.repository;

import com.example.elasticsearch.model.Club;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClubRepository extends ElasticsearchRepository<Club, String> {

    List<Club> findByNameContainingIgnoreCase(String name);

    List<Club> findByDescriptionContainingIgnoreCase(String description);

    List<Club> findByCategory(String category);

    List<Club> findBySchool(String school);

    List<Club> findByGrade(String grade);

    List<Club> findByTagsContaining(String tag);

    List<Club> findByIsActive(Boolean isActive);

    List<Club> findByMemberCountBetween(Integer minCount, Integer maxCount);
}
