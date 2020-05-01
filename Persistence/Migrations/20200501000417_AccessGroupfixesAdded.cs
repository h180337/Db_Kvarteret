using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class AccessGroupfixesAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AccessGroupLevels_AccessGroups_AccessGroupId",
                table: "AccessGroupLevels");

            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_AccessGroups_AccessGroupId",
                table: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "AccessGroups");

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "AspNetRoles",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddForeignKey(
                name: "FK_AccessGroupLevels_AspNetRoles_AccessGroupId",
                table: "AccessGroupLevels",
                column: "AccessGroupId",
                principalTable: "AspNetRoles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_AspNetRoles_AccessGroupId",
                table: "AspNetUsers",
                column: "AccessGroupId",
                principalTable: "AspNetRoles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AccessGroupLevels_AspNetRoles_AccessGroupId",
                table: "AccessGroupLevels");

            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_AspNetRoles_AccessGroupId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "AspNetRoles");

            migrationBuilder.CreateTable(
                name: "AccessGroups",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AccessGroups", x => x.Id);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_AccessGroupLevels_AccessGroups_AccessGroupId",
                table: "AccessGroupLevels",
                column: "AccessGroupId",
                principalTable: "AccessGroups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_AccessGroups_AccessGroupId",
                table: "AspNetUsers",
                column: "AccessGroupId",
                principalTable: "AccessGroups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
