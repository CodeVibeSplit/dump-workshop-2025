package com.codevibe.quiz.repository;

import com.codevibe.quiz.extractor.QuestionResultSetExtractor;
import com.codevibe.quiz.model.Question;
import lombok.AllArgsConstructor;
import org.intellij.lang.annotations.Language;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Repository
public class QuestionRepository {

  private final JdbcClient jdbcClient;
  private final QuestionResultSetExtractor questionResultSetExtractor;

  @Language("SQL")
  private final String FETCH_QUESTION_QUERY = """
      select q.id, q.text, q.difficulty_level, q.category, q.created_at,
             a.id as answer_id, a.text as answer_text, a.is_correct
      from questions q
      left join answers a on q.id = a.question_id
      order by q.id, a.id
      """;

  public List<Question> getQuestions() {
    return jdbcClient.sql(FETCH_QUESTION_QUERY).query(questionResultSetExtractor);
  }

  @Language("SQL")
  private final String INSERT_QUESTION_QUERY = """
      insert into questions (text, difficulty_level, category)
      values (:text, :difficultyLevel, :category)
      returning id
      """;

  public Question createQuestion(Question question) {
    Long questionId = jdbcClient.sql(INSERT_QUESTION_QUERY)
        .param("text", question.text())
        .param("difficultyLevel", question.difficultyLevel())
        .param("category", question.category())
        .query((rs, rowNum) -> rs.getLong("id"))
        .single();

    return new Question(
        questionId, question.text(), question.difficultyLevel(), question.category(), question.createdAt(), new ArrayList<>()
    );
  }

  @Language("SQL")
  private final String UPDATE_QUESTION_QUERY = """
      update questions
      set text = :text, difficulty_level = :difficultyLevel, category = :category
      where id = :id
      """;

  public int updateQuestion(Long id, Question question) {
    return jdbcClient.sql(UPDATE_QUESTION_QUERY)
        .param("id", id)
        .param("text", question.text())
        .param("difficultyLevel", question.difficultyLevel())
        .param("category", question.category())
        .update();
  }

  @Language("SQL")
  private final String DELETE_QUESTION_QUERY = """
      delete from questions
      where id = :id
      """;

  public boolean deleteQuestion(Long id) {
    int deletedRows = jdbcClient.sql(DELETE_QUESTION_QUERY)
        .param("id", id)
        .update();

    return deletedRows > 0;
  }
}
