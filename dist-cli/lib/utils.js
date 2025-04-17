"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cn = cn;
// lib/utils.ts
function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}
