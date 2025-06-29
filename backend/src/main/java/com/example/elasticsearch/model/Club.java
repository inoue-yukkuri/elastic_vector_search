package com.example.elasticsearch.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import java.util.List;

@Document(indexName = "clubs")
public class Club {
    @Id
    private String id;
    @Field(type = FieldType.Text)
    private String name;
    @Field(type = FieldType.Text)
    private String description;
    @Field(type = FieldType.Keyword)
    private String category;
    @Field(type = FieldType.Keyword)
    private String school;
    @Field(type = FieldType.Keyword)
    private String grade;
    @Field(type = FieldType.Text)
    private String activities;
    @Field(type = FieldType.Keyword)
    private List<String> tags;
    @Field(type = FieldType.Integer)
    private Integer memberCount;
    @Field(type = FieldType.Text)
    private String meetingTime;
    @Field(type = FieldType.Text)
    private String meetingPlace;
    @Field(type = FieldType.Text)
    private String achievements;
    @Field(type = FieldType.Boolean)
    private Boolean isActive;

    // 引数なしコンストラクタ
    public Club() {}

    // 全フィールド引数のコンストラクタ
    public Club(String id, String name, String description, String category, String school, String grade, String activities, List<String> tags, Integer memberCount, String meetingTime, String meetingPlace, String achievements, Boolean isActive) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.category = category;
        this.school = school;
        this.grade = grade;
        this.activities = activities;
        this.tags = tags;
        this.memberCount = memberCount;
        this.meetingTime = meetingTime;
        this.meetingPlace = meetingPlace;
        this.achievements = achievements;
        this.isActive = isActive;
    }

    // getter/setter
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getSchool() { return school; }
    public void setSchool(String school) { this.school = school; }
    public String getGrade() { return grade; }
    public void setGrade(String grade) { this.grade = grade; }
    public String getActivities() { return activities; }
    public void setActivities(String activities) { this.activities = activities; }
    public List<String> getTags() { return tags; }
    public void setTags(List<String> tags) { this.tags = tags; }
    public Integer getMemberCount() { return memberCount; }
    public void setMemberCount(Integer memberCount) { this.memberCount = memberCount; }
    public String getMeetingTime() { return meetingTime; }
    public void setMeetingTime(String meetingTime) { this.meetingTime = meetingTime; }
    public String getMeetingPlace() { return meetingPlace; }
    public void setMeetingPlace(String meetingPlace) { this.meetingPlace = meetingPlace; }
    public String getAchievements() { return achievements; }
    public void setAchievements(String achievements) { this.achievements = achievements; }
    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }
}
