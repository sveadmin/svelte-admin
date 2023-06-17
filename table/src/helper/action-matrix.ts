import {
  ActionMatrixMap,
  ACTION_QUARTER_BOTTOM,
  ACTION_QUARTER_LEFT,
  ACTION_QUARTER_RIGHT,
  ACTION_QUARTER_TOP,
} from '../types.js'

export const matrixMap: ActionMatrixMap = [
  {section: ACTION_QUARTER_TOP, x: 0, y: -1},
  {section: ACTION_QUARTER_BOTTOM, x: 0, y: 1},
  {section: ACTION_QUARTER_LEFT, x: -1, y: 0},
  {section: ACTION_QUARTER_RIGHT, x: 1, y: 0},
  {section: ACTION_QUARTER_LEFT, x: -1, y: -1},
  {section: ACTION_QUARTER_RIGHT, x: 1, y: -1},
  {section: ACTION_QUARTER_LEFT, x: -1, y: 1},
  {section: ACTION_QUARTER_RIGHT, x: 1, y: 1},
  {section: ACTION_QUARTER_TOP, x: 0, y: -2},
  {section: ACTION_QUARTER_BOTTOM, x: 0, y: 2}, //10
  {section: ACTION_QUARTER_LEFT, x: -2, y: 0},
  {section: ACTION_QUARTER_RIGHT, x: 2, y: 0},
  {section: ACTION_QUARTER_LEFT, x: -1, y: -2},
  {section: ACTION_QUARTER_RIGHT, x: 1, y: -2},
  {section: ACTION_QUARTER_LEFT, x: -1, y: 2},
  {section: ACTION_QUARTER_RIGHT, x: 1, y: 2},
  {section: ACTION_QUARTER_LEFT, x: -2, y: -1},
  {section: ACTION_QUARTER_RIGHT, x: 2, y: -1},
  {section: ACTION_QUARTER_LEFT, x: -2, y: 1},
  {section: ACTION_QUARTER_RIGHT, x: 2, y: 1}, //20
  {section: ACTION_QUARTER_LEFT, x: -2, y: -2},
  {section: ACTION_QUARTER_RIGHT, x: 2, y: -2},
  {section: ACTION_QUARTER_LEFT, x: -2, y: 2},
  {section: ACTION_QUARTER_RIGHT, x: 2, y: 2},
  {section: ACTION_QUARTER_TOP, x: 0, y: -3},
  {section: ACTION_QUARTER_BOTTOM, x: 0, y: 3},
  {section: ACTION_QUARTER_LEFT, x: -3, y: 0},
  {section: ACTION_QUARTER_RIGHT, x: 3, y: 0},
  {section: ACTION_QUARTER_LEFT, x: -1, y: -3},
  {section: ACTION_QUARTER_RIGHT, x: 1, y: -3}, //30
  {section: ACTION_QUARTER_LEFT, x: -1, y: 3},
  {section: ACTION_QUARTER_RIGHT, x: 1, y: 3},
  {section: ACTION_QUARTER_LEFT, x: -3, y: -1},
  {section: ACTION_QUARTER_RIGHT, x: 3, y: -1},
  {section: ACTION_QUARTER_LEFT, x: -3, y: 1},
  {section: ACTION_QUARTER_RIGHT, x: 3, y: 1},
]

export const matrixMapBottom: ActionMatrixMap = (() => matrixMap.filter(currentValue => currentValue.section === ACTION_QUARTER_BOTTOM))()

export const matrixMapLeft: ActionMatrixMap = (() => matrixMap.filter(currentValue => currentValue.section === ACTION_QUARTER_LEFT))()

export const matrixMapRight: ActionMatrixMap = (() => matrixMap.filter(currentValue => currentValue.section === ACTION_QUARTER_RIGHT))()

export const matrixMapTop: ActionMatrixMap = (() => matrixMap.filter(currentValue => currentValue.section === ACTION_QUARTER_TOP))()

/**
 * Placement order on the grid. 
 * 
 * It is not advised to use more than 8 buttons,
 * but due to possible locations on the screen,
 * each section of the grid needs to be able to accomodate all possible buttons
 * 
 * When out of bounds the engine will fill the available space son the visible sections
 * based on the order defined here. If there is quarter preference it will be taken into account
 * 
 *    |    |    | 29 | 25 | 30 |    |    |
 *    |    | 21 | 13 |  9 | 14 | 22 |    |
 *    | 33 | 17 |  5 |  1 |  5 | 18 | 34 |
 *    | 27 | 11 |  3 |XXXX|  4 | 12 | 28 |
 *    | 35 | 19 |  7 |  2 |  8 | 20 | 36 |
 *    |    | 23 | 15 | 10 | 16 | 24 |    |
 *    |    |    | 31 | 26 | 32 |    |    |
 * 
 */