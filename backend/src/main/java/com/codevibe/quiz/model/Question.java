package com.codevibe.quiz.model;

import java.time.OffsetDateTime;
import java.util.List;

public record Question(Long id, String text, String difficultyLevel, String category, OffsetDateTime createdAt, List<Answer> answers) {
  public Question {
    if (text == null || text.isBlank()) {
      throw new IllegalArgumentException("Text cannot be null or blank");
    }
  }
}
