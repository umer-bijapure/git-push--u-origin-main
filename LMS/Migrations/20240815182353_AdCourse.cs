using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LMS.Migrations
{
    /// <inheritdoc />
    public partial class AdCourse : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Courses_CourseCategories_CourseCategoryId",
                table: "Courses");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Courses",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<int>(
                name: "CourseCategoryId",
                table: "Courses",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<DateTime>(
                name: "EndDate",
                table: "Courses",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProfilePicture",
                table: "Courses",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "StartDate",
                table: "Courses",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Courses_CourseCategories_CourseCategoryId",
                table: "Courses",
                column: "CourseCategoryId",
                principalTable: "CourseCategories",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Courses_CourseCategories_CourseCategoryId",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "EndDate",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "ProfilePicture",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "StartDate",
                table: "Courses");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Courses",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "CourseCategoryId",
                table: "Courses",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Courses_CourseCategories_CourseCategoryId",
                table: "Courses",
                column: "CourseCategoryId",
                principalTable: "CourseCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
