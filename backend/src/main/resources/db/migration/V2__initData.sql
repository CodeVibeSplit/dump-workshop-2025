DO
$$
BEGIN
  -- Check if the table is empty
  IF NOT EXISTS (SELECT 1 FROM questions) THEN

    -- Truncate both tables (to ensure FK integrity and clean start)
    TRUNCATE questions, answers RESTART IDENTITY CASCADE;

    -- Insert Questions
    INSERT INTO questions (text, difficulty_level, category)
    VALUES 
      ('What is the primary purpose of the Spring Framework?', 'MEDIUM', 'Java'),
      ('Which of the following is NOT a JavaScript data type?', 'EASY', 'JavaScript');

    -- Answers for Question 1
    INSERT INTO answers (question_id, text, is_correct)
    VALUES 
      (1, 'To provide a comprehensive programming and configuration model for Java applications', TRUE),
      (1, 'To replace Java entirely with a new language', FALSE),
      (1, 'To focus exclusively on database operations', FALSE),
      (1, 'To optimize front-end rendering in web applications', FALSE);

    -- Answers for Question 2
    INSERT INTO answers (question_id, text, is_correct)
    VALUES 
      (2, 'Array', FALSE),
      (2, 'String', FALSE),
      (2, 'Integer', TRUE),
      (2, 'Boolean', FALSE);

  END IF;
END
$$;
