using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class OrgAdmin : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_AspNetRoles_AccessGroupId",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_GroupsInOrganisations_Groups_GroupId",
                table: "GroupsInOrganisations");

            migrationBuilder.DropForeignKey(
                name: "FK_GroupsInOrganisations_Organisations_OrganisationId",
                table: "GroupsInOrganisations");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_AccessGroupId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "AccessGroupId",
                table: "AspNetUsers");

            migrationBuilder.AlterColumn<Guid>(
                name: "OrganisationId",
                table: "GroupsInOrganisations",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "GroupId",
                table: "GroupsInOrganisations",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "OrganisationId",
                table: "Groups",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "AspNetUserRoles",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "UserOrganisationAdmins",
                columns: table => new
                {
                    AppUserId = table.Column<string>(nullable: false),
                    OrganisationId = table.Column<Guid>(nullable: false),
                    orgAdmin = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserOrganisationAdmins", x => new { x.OrganisationId, x.AppUserId });
                    table.ForeignKey(
                        name: "FK_UserOrganisationAdmins_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserOrganisationAdmins_Organisations_OrganisationId",
                        column: x => x.OrganisationId,
                        principalTable: "Organisations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Groups_OrganisationId",
                table: "Groups",
                column: "OrganisationId");

            migrationBuilder.CreateIndex(
                name: "IX_UserOrganisationAdmins_AppUserId",
                table: "UserOrganisationAdmins",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUserRoles_AspNetRoles_RoleId1",
                table: "AspNetUserRoles",
                column: "RoleId",
                principalTable: "AspNetRoles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Groups_Organisations_OrganisationId",
                table: "Groups",
                column: "OrganisationId",
                principalTable: "Organisations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_GroupsInOrganisations_Groups_GroupId",
                table: "GroupsInOrganisations",
                column: "GroupId",
                principalTable: "Groups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_GroupsInOrganisations_Organisations_OrganisationId",
                table: "GroupsInOrganisations",
                column: "OrganisationId",
                principalTable: "Organisations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUserRoles_AspNetRoles_RoleId1",
                table: "AspNetUserRoles");

            migrationBuilder.DropForeignKey(
                name: "FK_Groups_Organisations_OrganisationId",
                table: "Groups");

            migrationBuilder.DropForeignKey(
                name: "FK_GroupsInOrganisations_Groups_GroupId",
                table: "GroupsInOrganisations");

            migrationBuilder.DropForeignKey(
                name: "FK_GroupsInOrganisations_Organisations_OrganisationId",
                table: "GroupsInOrganisations");

            migrationBuilder.DropTable(
                name: "UserOrganisationAdmins");

            migrationBuilder.DropIndex(
                name: "IX_Groups_OrganisationId",
                table: "Groups");

            migrationBuilder.DropColumn(
                name: "OrganisationId",
                table: "Groups");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "AspNetUserRoles");

            migrationBuilder.AlterColumn<Guid>(
                name: "OrganisationId",
                table: "GroupsInOrganisations",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(Guid));

            migrationBuilder.AlterColumn<Guid>(
                name: "GroupId",
                table: "GroupsInOrganisations",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(Guid));

            migrationBuilder.AddColumn<string>(
                name: "AccessGroupId",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_AccessGroupId",
                table: "AspNetUsers",
                column: "AccessGroupId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_AspNetRoles_AccessGroupId",
                table: "AspNetUsers",
                column: "AccessGroupId",
                principalTable: "AspNetRoles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_GroupsInOrganisations_Groups_GroupId",
                table: "GroupsInOrganisations",
                column: "GroupId",
                principalTable: "Groups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_GroupsInOrganisations_Organisations_OrganisationId",
                table: "GroupsInOrganisations",
                column: "OrganisationId",
                principalTable: "Organisations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
