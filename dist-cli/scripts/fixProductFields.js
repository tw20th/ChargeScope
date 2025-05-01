"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// scripts/fixProductFields.ts
var app_1 = require("firebase-admin/app");
var firestore_1 = require("firebase-admin/firestore");
(0, app_1.initializeApp)({
    credential: (0, app_1.cert)(require('../serviceAccountKey.json')),
});
var db = (0, firestore_1.getFirestore)();
var run = function () { return __awaiter(void 0, void 0, void 0, function () {
    var snapshot, _i, _a, doc, data, now, updatedData;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, db.collection('products').get()];
            case 1:
                snapshot = _c.sent();
                console.log("\uD83D\uDEE0 \u5546\u54C1\u6570: ".concat(snapshot.size, " \u4EF6\u3092\u88DC\u5B8C\u30FB\u66F4\u65B0\u3057\u307E\u3059..."));
                _i = 0, _a = snapshot.docs;
                _c.label = 2;
            case 2:
                if (!(_i < _a.length)) return [3 /*break*/, 5];
                doc = _a[_i];
                data = doc.data();
                now = new Date();
                updatedData = __assign(__assign({}, data), { amazonLink: data.amazonLink ||
                        "https://www.amazon.co.jp/s?k=".concat(encodeURIComponent(data.title || '')), yahooLink: (_b = data.yahooLink) !== null && _b !== void 0 ? _b : '', rakutenLink: data.rakutenLink
                        ? data.rakutenLink.includes('scid=')
                            ? data.rakutenLink
                            : "".concat(data.rakutenLink).concat(data.rakutenLink.includes('?') ? '&' : '?', "scid=444dd366.3063ed7d.444dd367.61b93d9b")
                        : '', clickCount: typeof data.clickCount === 'number' ? data.clickCount : 0, viewCount: typeof data.viewCount === 'number' ? data.viewCount : 0, updatedAt: now });
                return [4 /*yield*/, db.collection('products').doc(doc.id).update(updatedData)];
            case 3:
                _c.sent();
                console.log("\u2705 \u88DC\u5B8C\u30FB\u66F4\u65B0\u5B8C\u4E86: ".concat(data.title || doc.id));
                _c.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5:
                console.log('🎉 全商品補完完了！');
                return [2 /*return*/];
        }
    });
}); };
run().catch(function (err) {
    console.error('❌ エラー発生:', err);
});
