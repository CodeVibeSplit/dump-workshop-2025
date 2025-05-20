package com.codevibe.quiz.model;

public record Answer(Long id, Long questionId, String text, boolean isCorrect) {
    public Answer {
        if (text == null || text.isBlank()) {
            throw new IllegalArgumentException("Text cannot be null or blank");
        }
    }
}
