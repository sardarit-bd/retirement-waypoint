/**
 * @typedef {Object} QuestionOption
 * @property {string} id - Unique identifier
 * @property {string} label - Option label text
 * @property {number} value - Option value/score
 */

/**
 * @typedef {Object} Question
 * @property {string} id - Unique identifier
 * @property {string} text - Question text
 * @property {string} type - Question type: 'single_choice' | 'multiple_choice' | 'scale_1_to_5' | 'yes_no' | 'text' | 'textarea'
 * @property {QuestionOption[]} options - List of options for choice questions
 * @property {boolean} [isRequired] - Whether question is required
 * @property {number} [displayOrder] - Display order within domain
 */

/**
 * @typedef {Object} Domain
 * @property {string} id - Unique identifier
 * @property {string} key - URL-friendly key
 * @property {string} label - Display label
 * @property {string} description - Domain description
 * @property {string} color - Hex color code
 * @property {string} openQuestion - Reflection question
 * @property {Question[]} questions - List of questions
 * @property {number} [displayOrder] - Display order
 * @property {boolean} [isActive] - Whether domain is active
 */

/**
 * @typedef {Object} ResultRange
 * @property {string} id - Unique identifier
 * @property {string} title - Result title
 * @property {number} minScore - Minimum score (0-100)
 * @property {number} maxScore - Maximum score (0-100)
 * @property {string} description - Result description
 * @property {string} color - Hex color code
 * @property {Recommendation[]} recommendations - List of recommendations
 */

/**
 * @typedef {Object} Recommendation
 * @property {string} id - Unique identifier
 * @property {string} title - Recommendation title
 * @property {string} description - Recommendation description
 * @property {number} priority - Priority (1-5)
 * @property {string[]} bookIds - Recommended book IDs
 * @property {string[]} resourceLinks - Resource URLs
 * @property {string} ctaText - Call to action text
 * @property {string} ctaLink - Call to action URL
 */

/**
 * @typedef {Object} Assessment
 * @property {string} id - Unique identifier
 * @property {string} slug - URL-friendly slug
 * @property {string} title - Assessment title
 * @property {string} subtitle - Assessment subtitle
 * @property {string} description - Assessment description
 * @property {string} heroTitle - Hero section title
 * @property {string} heroDescription - Hero section description
 * @property {string} buttonText - CTA button text
 * @property {string} accentColor - Accent color hex
 * @property {Domain[]} domains - List of domains
 * @property {ResultRange[]} resultRanges - List of result ranges
 * @property {boolean} isPublished - Whether assessment is published
 * @property {number} displayOrder - Display order
 */

export const QuestionTypes = {
    SINGLE_CHOICE: 'single_choice',
    MULTIPLE_CHOICE: 'multiple_choice',
    SCALE_1_TO_5: 'scale_1_to_5',
    YES_NO: 'yes_no',
    TEXT: 'text',
    TEXTAREA: 'textarea',
  };
  
  export const QuestionTypeLabels = {
    [QuestionTypes.SINGLE_CHOICE]: 'Single Choice',
    [QuestionTypes.MULTIPLE_CHOICE]: 'Multiple Choice',
    [QuestionTypes.SCALE_1_TO_5]: 'Scale 1-5',
    [QuestionTypes.YES_NO]: 'Yes / No',
    [QuestionTypes.TEXT]: 'Text (Short)',
    [QuestionTypes.TEXTAREA]: 'Text (Long)',
  };
  
  export const PriorityLevels = {
    1: 'Priority 1 (Highest)',
    2: 'Priority 2',
    3: 'Priority 3',
    4: 'Priority 4',
    5: 'Priority 5 (Lowest)',
  };