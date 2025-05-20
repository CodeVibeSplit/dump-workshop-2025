package com.codevibe.quiz.service;

import com.codevibe.quiz.exception.EntityNotFoundException;
import com.codevibe.quiz.exception.InvalidQuestionFormatException;
import com.codevibe.quiz.model.Answer;
import com.codevibe.quiz.model.Question;
import com.codevibe.quiz.repository.AnswerRepository;
import com.codevibe.quiz.repository.QuestionRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@AllArgsConstructor
@Service
@Slf4j
@Transactional
public class QuestionService {

  private final QuestionRepository questionRepository;
  private final AnswerRepository answerRepository;

  public List<Question> getQuestions() {
    return questionRepository.getQuestions();
  }

  public Question createQuestion(Question question) {
    if (question.answers().stream().filter(Answer::isCorrect).count() != 1) {
      log.error("Exactly one answer needs to be correct");
      throw new InvalidQuestionFormatException("Exactly one answer needs to be correct");
    }

    Question createdQuestion = questionRepository.createQuestion(question);

    for (Answer answer : question.answers()) {
      createdQuestion.answers().add(
          answerRepository.createAnswer(answer.text(), answer.isCorrect(), createdQuestion.id())
      );
    }

    return createdQuestion;
  }

  public Question updateQuestion(Long id, Question question) {
    if (!Objects.equals(id, question.id())) {
      log.error("Question ID in the path and body do not match");
      throw new InvalidQuestionFormatException("Question ID in the path and body do not match");
    }

    for (Answer answer : question.answers()) {
      if (!Objects.equals(answer.questionId(), id)) {
        log.error("Question ID in answers does not match the question ID in the path");
        throw new InvalidQuestionFormatException("Question ID in answers does not match the question ID in the path");
      }
    }

    if (question.answers().stream().filter(Answer::isCorrect).count() != 1) {
      log.error("Exactly one answer needs to be correct");
      throw new InvalidQuestionFormatException("Exactly one answer needs to be correct");
    }

    int updatedRows = questionRepository.updateQuestion(id, question);

    if (updatedRows == 0) {
      log.error("Question with id {} not found", id);
      throw new EntityNotFoundException("Question not found");
    }

    for (Answer answer : question.answers()) {
      if (answer.id() == null) {
        answerRepository.createAnswer(answer.text(), answer.isCorrect(), id);
      } else {
        int updatedAnswers = answerRepository.updateAnswer(answer.id(), answer.text(), answer.isCorrect());
        if (updatedAnswers == 0) {
          log.error("Answer with id {} not found", answer.id());
          throw new EntityNotFoundException("Answer not found");
        }
      }
    }

    return question;
  }

  public void deleteQuestion(Long id) {
    if (!questionRepository.deleteQuestion(id)) {
      log.error("Question with id {} not found", id);
      throw new EntityNotFoundException("Question not found");
    }
  }
}
