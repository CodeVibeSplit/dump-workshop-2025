CREATE TABLE questions
(
    id               BIGSERIAL PRIMARY KEY,
    text             VARCHAR(1000) NOT NULL,
    difficulty_level VARCHAR(20),
    category         VARCHAR(100),
    created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE answers
(
    id          BIGSERIAL PRIMARY KEY,
    question_id BIGINT       NOT NULL,
    text        VARCHAR(500) NOT NULL,
    is_correct  BOOLEAN      NOT NULL DEFAULT FALSE,
    FOREIGN KEY (question_id) REFERENCES questions (id) ON DELETE CASCADE
);

CREATE INDEX idx_answers_question_id ON answers (question_id);