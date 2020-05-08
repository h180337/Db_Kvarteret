using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class photoGroup : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "GroupPhotoId",
                table: "Groups",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Groups_GroupPhotoId",
                table: "Groups",
                column: "GroupPhotoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Groups_ProfilePhoto_GroupPhotoId",
                table: "Groups",
                column: "GroupPhotoId",
                principalTable: "ProfilePhoto",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Groups_ProfilePhoto_GroupPhotoId",
                table: "Groups");

            migrationBuilder.DropIndex(
                name: "IX_Groups_GroupPhotoId",
                table: "Groups");

            migrationBuilder.DropColumn(
                name: "GroupPhotoId",
                table: "Groups");
        }
    }
}
