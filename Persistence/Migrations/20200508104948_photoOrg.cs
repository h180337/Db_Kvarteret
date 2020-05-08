using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class photoOrg : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUserRoles_AspNetRoles_RoleId1",
                table: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "GroupsInOrganisations");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "AspNetUserRoles");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "AspNetRoles");

            migrationBuilder.AddColumn<string>(
                name: "organisationPhotoId",
                table: "Organisations",
                nullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "opprettet",
                table: "Courses",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.CreateTable(
                name: "Dependents",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Telephone = table.Column<string>(nullable: true),
                    Created = table.Column<DateTime>(nullable: false),
                    AppUserId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dependents", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Dependents_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Organisations_organisationPhotoId",
                table: "Organisations",
                column: "organisationPhotoId");

            migrationBuilder.CreateIndex(
                name: "IX_Dependents_AppUserId",
                table: "Dependents",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Organisations_ProfilePhoto_organisationPhotoId",
                table: "Organisations",
                column: "organisationPhotoId",
                principalTable: "ProfilePhoto",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Organisations_ProfilePhoto_organisationPhotoId",
                table: "Organisations");

            migrationBuilder.DropTable(
                name: "Dependents");

            migrationBuilder.DropIndex(
                name: "IX_Organisations_organisationPhotoId",
                table: "Organisations");

            migrationBuilder.DropColumn(
                name: "organisationPhotoId",
                table: "Organisations");

            migrationBuilder.AlterColumn<int>(
                name: "opprettet",
                table: "Courses",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(DateTime));

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "AspNetUserRoles",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "AspNetRoles",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "GroupsInOrganisations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    GroupId = table.Column<Guid>(type: "TEXT", nullable: false),
                    OrganisationId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GroupsInOrganisations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GroupsInOrganisations_Groups_GroupId",
                        column: x => x.GroupId,
                        principalTable: "Groups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GroupsInOrganisations_Organisations_OrganisationId",
                        column: x => x.OrganisationId,
                        principalTable: "Organisations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GroupsInOrganisations_GroupId",
                table: "GroupsInOrganisations",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_GroupsInOrganisations_OrganisationId",
                table: "GroupsInOrganisations",
                column: "OrganisationId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUserRoles_AspNetRoles_RoleId1",
                table: "AspNetUserRoles",
                column: "RoleId",
                principalTable: "AspNetRoles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
