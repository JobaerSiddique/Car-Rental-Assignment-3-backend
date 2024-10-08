"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../../config"));
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    isDelete: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['active', 'block'],
        default: 'active'
    },
    passwordChangedAt: {
        type: Date,
    },
    passwordChangeCount: { type: Number,
        default: 0 }
}, {
    timestamps: true
});
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        // Only hash the password if it has been modified (or is new)
        if (user.isModified('password')) {
            user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.salt_Rounds));
        }
        // No need to hash confirmPassword or store it in the database
        user.confirmPassword = undefined;
        next();
    });
});
userSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.password;
        delete ret.confirmPassword;
        return ret;
    },
});
userSchema.statics.isUserExistByEmail = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield exports.User.findOne({ email: email });
    });
};
userSchema.statics.isPasswordMatched = function (plainTextPassword, hashPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(plainTextPassword, hashPassword);
    });
};
exports.User = (0, mongoose_1.model)("User", userSchema);
