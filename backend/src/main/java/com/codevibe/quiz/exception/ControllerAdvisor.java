package com.codevibe.quiz.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;

@ControllerAdvice
public class ControllerAdvisor {

  @ExceptionHandler(EntityNotFoundException.class)
  public ResponseEntity<ApiErrorResponse> handleEntityNotFoundException(EntityNotFoundException ex, WebRequest request) {
    ApiErrorResponse apiErrorResponse = new ApiErrorResponse(
        LocalDateTime.now(),
        HttpStatus.NOT_FOUND.value(),
        HttpStatus.NOT_FOUND.getReasonPhrase(),
        ex.getMessage(),
        request.getDescription(false).replace("uri=", "")
    );
    return new ResponseEntity<>(apiErrorResponse, HttpStatus.NOT_FOUND);
  }

  @ExceptionHandler(InvalidQuestionFormatException.class)
  public ResponseEntity<ApiErrorResponse> handleInvalidQuestionFormatException(InvalidQuestionFormatException ex, WebRequest request) {
    ApiErrorResponse apiErrorResponse = new ApiErrorResponse(
        LocalDateTime.now(),
        HttpStatus.BAD_REQUEST.value(),
        HttpStatus.BAD_REQUEST.getReasonPhrase(),
        ex.getMessage(),
        request.getDescription(false).replace("uri=", "")
    );
    return new ResponseEntity<>(apiErrorResponse, HttpStatus.BAD_REQUEST);
  }

}
