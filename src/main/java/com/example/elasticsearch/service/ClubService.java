package com.example.elasticsearch.service;

import com.example.elasticsearch.model.Club;
import com.example.elasticsearch.repository.ClubRepository;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.query.Criteria;
import org.springframework.data.elasticsearch.core.query.CriteriaQuery;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ClubService {
    private final ClubRepository clubRepository;
    private final ElasticsearchOperations elasticsearchOperations;

    public ClubService(ClubRepository clubRepository, ElasticsearchOperations elasticsearchOperations) {
        this.clubRepository = clubRepository;
        this.elasticsearchOperations = elasticsearchOperations;
    }

    public List<Club> getAllClubs() {
        // IterableをListにキャスト
        return (List<Club>) clubRepository.findAll();
    }

    public Optional<Club> getClubById(String id) {
        return clubRepository.findById(id);
    }

    public Club saveClub(Club club) {
        return clubRepository.save(club);
    }

    public void deleteClub(String id) {
        clubRepository.deleteById(id);
    }

    public List<Club> searchClubs(String query) {
        System.out.println("Searching clubs with query: " + query);
        Criteria criteria = new Criteria()
                .or("name").contains(query)
                .or("description").contains(query)
                .or("activities").contains(query)
                .or("achievements").contains(query)
                .or("tags").contains(query);
        CriteriaQuery searchQuery = new CriteriaQuery(criteria);
        SearchHits<Club> searchHits = elasticsearchOperations.search(searchQuery, Club.class);
        return searchHits.getSearchHits().stream()
                .map(hit -> hit.getContent())
                .collect(Collectors.toList());
    }

    public List<Club> searchByCategory(String category) {
        return clubRepository.findByCategory(category);
    }
    public List<Club> searchBySchool(String school) {
        return clubRepository.findBySchool(school);
    }
    public List<Club> searchByGrade(String grade) {
        return clubRepository.findByGrade(grade);
    }
    public List<Club> searchByTag(String tag) {
        return clubRepository.findByTagsContaining(tag);
    }
    public List<Club> searchByActivityStatus(Boolean isActive) {
        return clubRepository.findByIsActive(isActive);
    }
    public List<Club> searchByMemberCountRange(Integer minCount, Integer maxCount) {
        return clubRepository.findByMemberCountBetween(minCount, maxCount);
    }
    public void importFromCsv(MultipartFile file) throws IOException, CsvException {
        try (CSVReader reader = new CSVReader(new InputStreamReader(file.getInputStream()))) {
            List<String[]> rows = reader.readAll();
            for (int i = 1; i < rows.size(); i++) {
                String[] row = rows.get(i);
                if (row.length >= 12) {
                    Club club = new Club();
                    club.setName(row[0]);
                    club.setDescription(row[1]);
                    club.setCategory(row[2]);
                    club.setSchool(row[3]);
                    club.setGrade(row[4]);
                    club.setActivities(row[5]);
                    club.setTags(Arrays.asList(row[6].split(",")));
                    club.setMemberCount(Integer.parseInt(row[7]));
                    club.setMeetingTime(row[8]);
                    club.setMeetingPlace(row[9]);
                    club.setAchievements(row[10]);
                    club.setIsActive(Boolean.parseBoolean(row[11]));
                    clubRepository.save(club);
                    System.out.println("Imported club: " + club.getName());
                }
            }
        }
    }
    public long getClubCount() {
        return clubRepository.count();
    }
}
