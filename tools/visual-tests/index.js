import {makeScreenshots} from './screenshot.js';
import {generateDiffs} from './image-diff.js';

// makeScreenshots('./screenshots-diff');

generateDiffs('./screenshots-diff', './screenshots-orig', 'diffs');
