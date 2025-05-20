package com.codevibe.quiz.extractor;

import com.codevibe.quiz.model.Answer;
import com.codevibe.quiz.model.Question;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class QuestionResultSetExtractor implements ResultSetExtractor<List<Question>> {

  @Override
  public List<Question> extractData(ResultSet rs) throws SQLException {
    Map<Long, Question> questionMap = new HashMap<>();
    List<Question> questions = new ArrayList<>();

    while (rs.next()) {
      Long questionId = rs.getLong("id");

      if (!questionMap.containsKey(questionId)) {
        Question question = new Question(
            questionId,
            rs.getString("text"),
            rs.getString("difficulty_level"),
            rs.getString("category"),
            rs.getTimestamp("created_at").toLocalDateTime().atOffset(ZoneOffset.UTC),
            new ArrayList<>()
        );
        questionMap.put(questionId, question);
        questions.add(question);
      }

      Long answerId = rs.getLong("answer_id");
      if (!rs.wasNull()) {
        Answer answer = new Answer(
            answerId,
            questionId,
            rs.getString("answer_text"),
            rs.getBoolean("is_correct")
        );
        questionMap.get(questionId).answers().add(answer);
      }
    }

    return questions;
  }
}