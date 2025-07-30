import { Answer, GameConfig, Question } from '@/interfaces/game';

// Validation error class
export class ValidationError extends Error {
  constructor(message: string, public field?: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

// Type guards
export function isAnswer(obj: unknown): obj is Answer {
  return (
    typeof obj === 'object'
    && obj !== null
    && typeof (obj as Answer).id === 'string'
    && typeof (obj as Answer).text === 'string'
    && typeof (obj as Answer).isCorrect === 'boolean'
  );
}

export function isQuestion(obj: unknown): obj is Question {
  return (
    typeof obj === 'object'
    && obj !== null
    && typeof (obj as Question).id === 'number'
    && typeof (obj as Question).amount === 'number'
    && typeof (obj as Question).question === 'string'
    && Array.isArray((obj as Question).answers)
    && (obj as Question).answers.every(isAnswer)
  );
}

export function isGameConfig(obj: unknown): obj is GameConfig {
  return (
    typeof obj === 'object'
    && obj !== null
    && Array.isArray((obj as GameConfig).questions)
    && (obj as GameConfig).questions.every(isQuestion)
  );
}

// Validation functions
export function validateAnswer(answer: unknown): Answer {
  if (!isAnswer(answer)) {
    throw new ValidationError('Invalid answer format', 'answer');
  }

  if (!answer.id || answer.id.trim() === '') {
    throw new ValidationError('Answer ID is required', 'answer.id');
  }

  if (!answer.text || answer.text.trim() === '') {
    throw new ValidationError('Answer text is required', 'answer.text');
  }

  return answer;
}

export function validateQuestion(question: unknown): Question {
  if (!isQuestion(question)) {
    throw new ValidationError('Invalid question format', 'question');
  }

  if (question.id <= 0) {
    throw new ValidationError('Question ID must be positive', 'question.id');
  }

  if (question.amount <= 0) {
    throw new ValidationError('Question amount must be positive', 'question.amount');
  }

  if (!question.question || question.question.trim() === '') {
    throw new ValidationError('Question text is required', 'question.question');
  }

  if (question.answers.length < 2) {
    throw new ValidationError('Question must have at least 2 answers', 'question.answers');
  }

  if (question.answers.length > 4) {
    throw new ValidationError('Question cannot have more than 4 answers', 'question.answers');
  }

  const correctAnswers = question.answers.filter((answer) => answer.isCorrect);
  if (correctAnswers.length !== 1) {
    throw new ValidationError('Question must have exactly one correct answer', 'question.answers');
  }

  // Validate each answer
  question.answers.forEach((answer, index) => {
    try {
      validateAnswer(answer);
    } catch (error) {
      if (error instanceof ValidationError) {
        throw new ValidationError(
          `Answer ${index + 1}: ${error.message}`,
          `question.answers[${index}].${error.field}`,
        );
      }
      throw error;
    }
  });

  return question;
}

export function validateGameConfig(config: unknown): GameConfig {
  if (!isGameConfig(config)) {
    throw new ValidationError('Invalid game configuration format', 'config');
  }

  if (!config.questions || config.questions.length === 0) {
    throw new ValidationError('Game must have at least one question', 'questions');
  }

  // Validate each question
  config.questions.forEach((question, index) => {
    try {
      validateQuestion(question);
    } catch (error) {
      if (error instanceof ValidationError) {
        throw new ValidationError(
          `Question ${index + 1}: ${error.message}`,
          `questions[${index}].${error.field}`,
        );
      }
      throw error;
    }
  });

  // Check for duplicate question IDs
  const questionIds = config.questions.map((q) => q.id);
  const uniqueIds = new Set(questionIds);
  if (uniqueIds.size !== questionIds.length) {
    throw new ValidationError('Duplicate question IDs found', 'questions');
  }

  // Check for duplicate answer IDs within each question
  config.questions.forEach((question, questionIndex) => {
    const answerIds = question.answers.map((a) => a.id);
    const uniqueAnswerIds = new Set(answerIds);
    if (uniqueAnswerIds.size !== answerIds.length) {
      throw new ValidationError(
        `Duplicate answer IDs found in question ${questionIndex + 1}`,
        `questions[${questionIndex}].answers`,
      );
    }
  });

  return config;
}

// Safe data access utilities
export function safeGetQuestion(questions: Question[], index: number): Question | null {
  if (!Array.isArray(questions)) {
    return null;
  }

  if (index < 0 || index >= questions.length) {
    return null;
  }

  const question = questions[index];
  try {
    return validateQuestion(question);
  } catch {
    return null;
  }
}

export function safeGetAnswer(answers: readonly Answer[], answerId: string): Answer | null {
  if (!Array.isArray(answers)) {
    return null;
  }

  const answer = answers.find((a) => a.id === answerId);
  if (!answer) {
    return null;
  }

  try {
    return validateAnswer(answer);
  } catch {
    return null;
  }
}
