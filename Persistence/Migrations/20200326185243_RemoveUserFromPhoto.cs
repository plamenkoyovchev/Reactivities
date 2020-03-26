using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class RemoveUserFromPhoto : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Photo_AspNetUsers_UserId",
                table: "Photo");

            migrationBuilder.DropIndex(
                name: "IX_Photo_UserId",
                table: "Photo");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Photo");

            migrationBuilder.AddColumn<string>(
                name: "ReactivityUserId",
                table: "Photo",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Photo_ReactivityUserId",
                table: "Photo",
                column: "ReactivityUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Photo_AspNetUsers_ReactivityUserId",
                table: "Photo",
                column: "ReactivityUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Photo_AspNetUsers_ReactivityUserId",
                table: "Photo");

            migrationBuilder.DropIndex(
                name: "IX_Photo_ReactivityUserId",
                table: "Photo");

            migrationBuilder.DropColumn(
                name: "ReactivityUserId",
                table: "Photo");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Photo",
                type: "varchar(255) CHARACTER SET utf8mb4",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Photo_UserId",
                table: "Photo",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Photo_AspNetUsers_UserId",
                table: "Photo",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
