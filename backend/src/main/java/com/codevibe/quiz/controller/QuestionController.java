package com.codevibe.quiz.controller;

import com.codevibe.quiz.model.Question;
import com.codevibe.quiz.service.QuestionService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/questions")
public class QuestionController {

  private final QuestionService questionService;

  @GetMapping
  public ResponseEntity<List<Question>> getQuestions() {
    return ResponseEntity.ok(questionService.getQuestions());
  }

  @PostMapping
  public ResponseEntity<Question> createQuestion(@RequestBody Question question) {
    return ResponseEntity.status(HttpStatus.CREATED).body(questionService.createQuestion(question));
  }

  @PutMapping("/{id}")
  public ResponseEntity<Question> updateQuestion(@PathVariable Long id, @RequestBody Question question) {
    return ResponseEntity.ok(questionService.updateQuestion(id, question));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteQuestion(@PathVariable Long id) {
    questionService.deleteQuestion(id);

    return ResponseEntity.noContent().build();
  }

}
