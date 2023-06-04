"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.School = void 0;
var sequelize_typescript_1 = require("sequelize-typescript");
;
/*
reg_nr: DataTypes.INT,
  nosaukums: DataTypes.STRING,
  adrese: DataTypes.STRING,
  gps_lat: DataTypes.DECIMAL,
  gps_lon: DataTypes.DECIMAL,
  skolotaji: DataTypes.INT,
  skolotaju_videja_alga: DataTypes.DECIMAL,
  class_start_time: DataTypes.INT,
  class_end_time: DataTypes.INT,
  phone_number: DataTypes.STRING,
  email: DataTypes.STRING,
  website: DataTypes.STRING
*/
var School = /** @class */ (function (_super) {
    __extends(School, _super);
    function School() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        sequelize_typescript_1.PrimaryKey,
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER)
    ], School.prototype, "reg_nr");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)
    ], School.prototype, "nosaukums");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)
    ], School.prototype, "adrese");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DECIMAL)
    ], School.prototype, "gps_lat");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DECIMAL)
    ], School.prototype, "gps_lon");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER)
    ], School.prototype, "skolotaji");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DECIMAL)
    ], School.prototype, "skolotaju_videja_alga");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER)
    ], School.prototype, "class_start_time");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER)
    ], School.prototype, "class_end_time");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)
    ], School.prototype, "phone_number");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)
    ], School.prototype, "email");
    __decorate([
        (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING)
    ], School.prototype, "website");
    School = __decorate([
        (0, sequelize_typescript_1.Table)({
            tableName: 'schools'
        })
    ], School);
    return School;
}(sequelize_typescript_1.Model));
exports.School = School;
;
