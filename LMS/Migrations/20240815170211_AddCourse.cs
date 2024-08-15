using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LMS.Migrations
{
    /// <inheritdoc />
    public partial class AddCourse : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Attendance_Course_CourseId",
                table: "Attendance");

            migrationBuilder.DropForeignKey(
                name: "FK_Attendance_Course_CourseId1",
                table: "Attendance");

            migrationBuilder.DropForeignKey(
                name: "FK_Course_CourseCategories_CourseCategoryId",
                table: "Course");

            migrationBuilder.DropForeignKey(
                name: "FK_Course_Institution_InstitutionId",
                table: "Course");

            migrationBuilder.DropForeignKey(
                name: "FK_Group_Course_CourseId",
                table: "Group");

            migrationBuilder.DropForeignKey(
                name: "FK_Module_Course_CourseId",
                table: "Module");

            migrationBuilder.DropForeignKey(
                name: "FK_Quiz_Course_CourseId",
                table: "Quiz");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Course",
                table: "Course");

            migrationBuilder.RenameTable(
                name: "Course",
                newName: "Courses");

            migrationBuilder.RenameIndex(
                name: "IX_Course_InstitutionId",
                table: "Courses",
                newName: "IX_Courses_InstitutionId");

            migrationBuilder.RenameIndex(
                name: "IX_Course_CourseCategoryId",
                table: "Courses",
                newName: "IX_Courses_CourseCategoryId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Courses",
                table: "Courses",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Attendance_Courses_CourseId",
                table: "Attendance",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Attendance_Courses_CourseId1",
                table: "Attendance",
                column: "CourseId1",
                principalTable: "Courses",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Courses_CourseCategories_CourseCategoryId",
                table: "Courses",
                column: "CourseCategoryId",
                principalTable: "CourseCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Courses_Institution_InstitutionId",
                table: "Courses",
                column: "InstitutionId",
                principalTable: "Institution",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Group_Courses_CourseId",
                table: "Group",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Module_Courses_CourseId",
                table: "Module",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Quiz_Courses_CourseId",
                table: "Quiz",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Attendance_Courses_CourseId",
                table: "Attendance");

            migrationBuilder.DropForeignKey(
                name: "FK_Attendance_Courses_CourseId1",
                table: "Attendance");

            migrationBuilder.DropForeignKey(
                name: "FK_Courses_CourseCategories_CourseCategoryId",
                table: "Courses");

            migrationBuilder.DropForeignKey(
                name: "FK_Courses_Institution_InstitutionId",
                table: "Courses");

            migrationBuilder.DropForeignKey(
                name: "FK_Group_Courses_CourseId",
                table: "Group");

            migrationBuilder.DropForeignKey(
                name: "FK_Module_Courses_CourseId",
                table: "Module");

            migrationBuilder.DropForeignKey(
                name: "FK_Quiz_Courses_CourseId",
                table: "Quiz");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Courses",
                table: "Courses");

            migrationBuilder.RenameTable(
                name: "Courses",
                newName: "Course");

            migrationBuilder.RenameIndex(
                name: "IX_Courses_InstitutionId",
                table: "Course",
                newName: "IX_Course_InstitutionId");

            migrationBuilder.RenameIndex(
                name: "IX_Courses_CourseCategoryId",
                table: "Course",
                newName: "IX_Course_CourseCategoryId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Course",
                table: "Course",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Attendance_Course_CourseId",
                table: "Attendance",
                column: "CourseId",
                principalTable: "Course",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Attendance_Course_CourseId1",
                table: "Attendance",
                column: "CourseId1",
                principalTable: "Course",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Course_CourseCategories_CourseCategoryId",
                table: "Course",
                column: "CourseCategoryId",
                principalTable: "CourseCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Course_Institution_InstitutionId",
                table: "Course",
                column: "InstitutionId",
                principalTable: "Institution",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Group_Course_CourseId",
                table: "Group",
                column: "CourseId",
                principalTable: "Course",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Module_Course_CourseId",
                table: "Module",
                column: "CourseId",
                principalTable: "Course",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Quiz_Course_CourseId",
                table: "Quiz",
                column: "CourseId",
                principalTable: "Course",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
