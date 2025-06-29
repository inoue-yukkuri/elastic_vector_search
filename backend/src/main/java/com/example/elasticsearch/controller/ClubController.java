package com.example.elasticsearch.controller;

import com.example.elasticsearch.model.Club;
import com.example.elasticsearch.service.ClubService;
import com.opencsv.exceptions.CsvException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping("/api/clubs")
@CrossOrigin(origins = "http://localhost:3000")
public class ClubController {
    private final ClubService clubService;
    public ClubController(ClubService clubService) {
        this.clubService = clubService;
    }
    @GetMapping
    public ResponseEntity<List<Club>> getAllClubs() {
        List<Club> clubs = clubService.getAllClubs();
        return ResponseEntity.ok(clubs);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Club> getClubById(@PathVariable String id) {
        Optional<Club> club = clubService.getClubById(id);
        return club.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @PostMapping
    public ResponseEntity<Club> createClub(@RequestBody Club club) {
        Club savedClub = clubService.saveClub(club);
        return ResponseEntity.ok(savedClub);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Club> updateClub(@PathVariable String id, @RequestBody Club club) {
        Optional<Club> existingClub = clubService.getClubById(id);
        if (existingClub.isPresent()) {
            club.setId(id);
            Club updatedClub = clubService.saveClub(club);
            return ResponseEntity.ok(updatedClub);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClub(@PathVariable String id) {
        Optional<Club> club = clubService.getClubById(id);
        if (club.isPresent()) {
            clubService.deleteClub(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/search")
    public ResponseEntity<List<Club>> searchClubs(@RequestParam String query) {
        System.out.println("Searching clubs with query: " + query);
        List<Club> clubs = clubService.searchClubs(query);
        return ResponseEntity.ok(clubs);
    }
    @GetMapping("/search/category")
    public ResponseEntity<List<Club>> searchByCategory(@RequestParam String category) {
        List<Club> clubs = clubService.searchByCategory(category);
        return ResponseEntity.ok(clubs);
    }
    @GetMapping("/search/school")
    public ResponseEntity<List<Club>> searchBySchool(@RequestParam String school) {
        List<Club> clubs = clubService.searchBySchool(school);
        return ResponseEntity.ok(clubs);
    }
    @GetMapping("/search/grade")
    public ResponseEntity<List<Club>> searchByGrade(@RequestParam String grade) {
        List<Club> clubs = clubService.searchByGrade(grade);
        return ResponseEntity.ok(clubs);
    }
    @GetMapping("/search/tag")
    public ResponseEntity<List<Club>> searchByTag(@RequestParam String tag) {
        List<Club> clubs = clubService.searchByTag(tag);
        return ResponseEntity.ok(clubs);
    }
    @GetMapping("/search/active")
    public ResponseEntity<List<Club>> searchByActivityStatus(@RequestParam Boolean isActive) {
        List<Club> clubs = clubService.searchByActivityStatus(isActive);
        return ResponseEntity.ok(clubs);
    }
    @GetMapping("/search/members")
    public ResponseEntity<List<Club>> searchByMemberCountRange(
            @RequestParam Integer minCount,
            @RequestParam Integer maxCount) {
        List<Club> clubs = clubService.searchByMemberCountRange(minCount, maxCount);
        return ResponseEntity.ok(clubs);
    }
    @PostMapping("/import")
    public ResponseEntity<String> importFromCsv(@RequestParam("file") MultipartFile file) {
        try {
            clubService.importFromCsv(file);
            return ResponseEntity.ok("CSVファイルのインポートが完了しました");
        } catch (IOException | CsvException e) {
            System.out.println("CSV import failed: " + e.getMessage());
            return ResponseEntity.badRequest().body("CSVファイルのインポートに失敗しました: " + e.getMessage());
        }
    }
    @GetMapping("/count")
    public ResponseEntity<Long> getClubCount() {
        long count = clubService.getClubCount();
        return ResponseEntity.ok(count);
    }
}
