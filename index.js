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
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
import { existsSync, mkdirSync, readdirSync, unlinkSync, writeFileSync } from 'fs';
import { compileFile } from 'pug';
import { isArray } from 'util';
function preComplile(input, output) {
    return __awaiter(this, void 0, void 0, function () {
        var _i, _a, file;
        return __generator(this, function (_b) {
            if (existsSync(input)) {
                if (existsSync(output)) {
                    for (_i = 0, _a = readdirSync(output); _i < _a.length; _i++) {
                        file = _a[_i];
                        unlinkSync(output + "/" + file);
                    }
                }
                else {
                    mkdirSync(output);
                }
            }
            return [2 /*return*/];
        });
    });
}
function preComplileAdvanced(input, output) {
    return __awaiter(this, void 0, void 0, function () {
        var _i, input_1, ins;
        return __generator(this, function (_a) {
            if (isArray(input)) {
                for (_i = 0, input_1 = input; _i < input_1.length; _i++) {
                    ins = input_1[_i];
                    preComplile(ins, output);
                }
            }
            else {
                preComplile(input, output);
            }
            return [2 /*return*/];
        });
    });
}
function createBundle(_a) {
    var input = _a.input, output = _a.output, pugOptions = _a.pugOptions, locals = _a.locals;
    return __awaiter(this, void 0, void 0, function () {
        var _i, _b, file;
        return __generator(this, function (_c) {
            for (_i = 0, _b = readdirSync(input); _i < _b.length; _i++) {
                file = _b[_i];
                writeFileSync(output + "/" + file.replace('pug', 'html'), compileFile(input + "/" + file, pugOptions)(locals));
            }
            return [2 /*return*/];
        });
    });
}
function createBundleAdvanced(_a) {
    var input = _a.input, output = _a.output, pugOptions = _a.pugOptions, locals = _a.locals;
    return __awaiter(this, void 0, void 0, function () {
        var _i, input_2, ins;
        return __generator(this, function (_b) {
            if (isArray(input)) {
                for (_i = 0, input_2 = input; _i < input_2.length; _i++) {
                    ins = input_2[_i];
                    createBundle({ input: ins, output: output, pugOptions: pugOptions, locals: locals });
                }
            }
            else {
                createBundle({ input: input, output: output, pugOptions: pugOptions, locals: locals });
            }
            return [2 /*return*/];
        });
    });
}
function createMultipleBundles(_a) {
    var multipleBundles = _a.multipleBundles, pugOptions = _a.pugOptions;
    return __awaiter(this, void 0, void 0, function () {
        var _i, _b, bundle;
        return __generator(this, function (_c) {
            for (_i = 0, _b = multipleBundles; _i < _b.length; _i++) {
                bundle = _b[_i];
                createBundleAdvanced(__assign({}, bundle, { pugOptions: pugOptions }));
            }
            return [2 /*return*/];
        });
    });
}
export default function puggy(options) {
    var multipleBundles = options.multipleBundles;
    if (multipleBundles) {
        for (var _i = 0, multipleBundles_1 = multipleBundles; _i < multipleBundles_1.length; _i++) {
            var bundle = multipleBundles_1[_i];
            preComplileAdvanced(bundle.input, bundle.output);
        }
        createMultipleBundles(options);
    }
    else {
        preComplileAdvanced(options.input, options.output);
        createBundleAdvanced(options);
    }
    return {
        name: 'rollup-plugin-puggy'
    };
}
//# sourceMappingURL=index.js.map