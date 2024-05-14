"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseNotation = void 0;
function parseNotation(notation) {
    let row = 8 - parseInt(notation.charAt(1));
    let col = notation.charCodeAt(0) - 97;
    return [row, col];
}
exports.parseNotation = parseNotation;
