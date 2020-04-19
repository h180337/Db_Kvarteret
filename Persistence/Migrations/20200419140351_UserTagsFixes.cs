using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class UserTagsFixes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserCards_AspNetUsers_AppUserId",
                table: "UserCards");

            migrationBuilder.DropForeignKey(
                name: "FK_UserCards_Cards_CardId",
                table: "UserCards");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserCards",
                table: "UserCards");

            migrationBuilder.DropIndex(
                name: "IX_UserCards_CardId",
                table: "UserCards");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Cards");

            migrationBuilder.AlterColumn<Guid>(
                name: "CardId",
                table: "UserCards",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "AppUserId",
                table: "UserCards",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AppUserId",
                table: "Cards",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserCards",
                table: "UserCards",
                columns: new[] { "CardId", "AppUserId" });

            migrationBuilder.CreateTable(
                name: "UserTags",
                columns: table => new
                {
                    AppUserId = table.Column<string>(nullable: false),
                    TagId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserTags", x => new { x.TagId, x.AppUserId });
                    table.ForeignKey(
                        name: "FK_UserTags_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserTags_Tags_TagId",
                        column: x => x.TagId,
                        principalTable: "Tags",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserCards_CardId",
                table: "UserCards",
                column: "CardId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserTags_AppUserId",
                table: "UserTags",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserCards_AspNetUsers_AppUserId",
                table: "UserCards",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserCards_Cards_CardId",
                table: "UserCards",
                column: "CardId",
                principalTable: "Cards",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserCards_AspNetUsers_AppUserId",
                table: "UserCards");

            migrationBuilder.DropForeignKey(
                name: "FK_UserCards_Cards_CardId",
                table: "UserCards");

            migrationBuilder.DropTable(
                name: "UserTags");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserCards",
                table: "UserCards");

            migrationBuilder.DropIndex(
                name: "IX_UserCards_CardId",
                table: "UserCards");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "Cards");

            migrationBuilder.AlterColumn<string>(
                name: "AppUserId",
                table: "UserCards",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<Guid>(
                name: "CardId",
                table: "UserCards",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(Guid));

            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "Cards",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserCards",
                table: "UserCards",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_UserCards_CardId",
                table: "UserCards",
                column: "CardId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserCards_AspNetUsers_AppUserId",
                table: "UserCards",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UserCards_Cards_CardId",
                table: "UserCards",
                column: "CardId",
                principalTable: "Cards",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
