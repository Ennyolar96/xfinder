"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = exports.Role = exports.Gender = void 0;
var Gender;
(function (Gender) {
    Gender["Male"] = "male";
    Gender["Female"] = "female";
    Gender["Other"] = "other";
})(Gender || (exports.Gender = Gender = {}));
var Role;
(function (Role) {
    Role["student"] = "student";
    Role["teacher"] = "teacher";
    Role["admin"] = "admin";
    Role["super"] = "superAdmin";
})(Role || (exports.Role = Role = {}));
var Status;
(function (Status) {
    Status["active"] = "active";
    Status["blocked"] = "blocked";
    Status["suspend"] = "suspended";
})(Status || (exports.Status = Status = {}));
//# sourceMappingURL=user.interface.js.map