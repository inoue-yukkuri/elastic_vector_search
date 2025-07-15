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
import java.util.stream.StreamSupport;

@Service
public class ClubService {
    private final ClubRepository clubRepository;
    private final ElasticsearchOperations elasticsearchOperations;

    public ClubService(ClubRepository clubRepository, ElasticsearchOperations elasticsearchOperations) {
        this.clubRepository = clubRepository;
        this.elasticsearchOperations = elasticsearchOperations;
    }

    public List<Club> getAllClubs() {
        // IterableをListに変換
        return StreamSupport.stream(clubRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
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

    public void deleteAllClubs() {
        clubRepository.deleteAll();
    }

    /**
     * 全文検索
     */
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

    /**
     * カテゴリ別検索
     */
    public List<Club> searchByCategory(String category) {
        return clubRepository.findByCategory(category);
    }

    /**
     * 学校別検索
     */
    public List<Club> searchBySchool(String school) {
        return clubRepository.findBySchool(school);
    }

    /**
     * 学年別検索
     */
    public List<Club> searchByGrade(String grade) {
        return clubRepository.findByGrade(grade);
    }

    /**
     * タグ検索
     */
    public List<Club> searchByTag(String tag) {
        return clubRepository.findByTagsContaining(tag);
    }

    /**
     * 活動状況で検索
     */
    public List<Club> searchByActivityStatus(Boolean isActive) {
        return clubRepository.findByIsActive(isActive);
    }

    /**
     * 部員数範囲で検索
     */
    public List<Club> searchByMemberCountRange(Integer minCount, Integer maxCount) {
        return clubRepository.findByMemberCountBetween(minCount, maxCount);
    }

    /**
     * CSVファイルから部活動データをインポート
     */
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

                    // memberCountの安全な変換
                    try {
                        club.setMemberCount(Integer.parseInt(row[7].trim()));
                    } catch (NumberFormatException e) {
                        System.out.println("Warning: Invalid member count '" + row[7] + "', setting to 0");
                        club.setMemberCount(0);
                    }

                    club.setMeetingTime(row[8]);
                    club.setMeetingPlace(row[9]);
                    club.setAchievements(row[10]);

                    // isActiveの安全な変換
                    try {
                        club.setIsActive(Boolean.parseBoolean(row[11].trim()));
                    } catch (Exception e) {
                        System.out.println("Warning: Invalid isActive value '" + row[11] + "', setting to true");
                        club.setIsActive(true);
                    }

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
