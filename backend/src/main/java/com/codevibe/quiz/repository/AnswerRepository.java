package com.codevibe.quiz.repository;

import com.codevibe.quiz.model.Answer;
import jdk.jfr.Label;
import lombok.AllArgsConstructor;
import org.intellij.lang.annotations.Language;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

@AllArgsConstructor
@Repository
public class AnswerRepository {

  private final JdbcClient jdbcClient;

  @Language("SQL")
  private final String INSERT_ANSWER_QUERY = """
      insert into answers (text, is_correct, question_id)
      values (:text, :isCorrect, :questionId)
      returning id
      """;

  public Answer createAnswer(String text, boolean isCorrect, Long questionId) {
    Long answerId = jdbcClient.sql(INSERT_ANSWER_QUERY)
        .param("text", text)
        .param("isCorrect", isCorrect)
        .param("questionId", questionId)
        .query((rs, rowNum) -> rs.getLong("id"))
        .single();

    return new Answer(
        answerId, questionId, text, isCorrect
    );
  }

  @Language("SQL")
  private final String UPDATE_ANSWER_QUERY = """
      update answers
      set text = :text, is_correct = :isCorrect
      where id = :id
      """;

  public int updateAnswer(Long id, String text, boolean isCorrect) {
    return jdbcClient.sql(UPDATE_ANSWER_QUERY)
        .param("id", id)
        .param("text", text)
        .param("isCorrect", isCorrect)
        .update();
  }

}
